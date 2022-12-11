import Head from 'next/head'
// import { useRecoilValue } from 'recoil'
// import { modalState, movieState } from '../atoms/modalAtom'
import useStore from '../core/zustand/store'
import Banner from '../components/Banner'
import Modal from '../components/Modal'
import RowClean from '../components/RowClean'
import RowFill from '../components//RowFill'
import useAuth from '../hooks/useAuth'
import { Movie, CategoryTypes } from '../typings'
import useList from '../hooks/useList'
import { GetServerSideProps } from 'next'
import reqApi from '../utils/reqApi'
import RowCategory from '../components/organisms/RowCategory'

interface Props {
  mouveeBanner: Movie[]
  nowPlaying: Movie[]
  popular: Movie[]
  topRated: Movie[]
  upcoming: Movie[]
  categories: CategoryTypes[]
  categoryMovies: any
  name: string
}

const Home = ({
  mouveeBanner,
  nowPlaying,
  popular,
  topRated,
  upcoming,
  categories,
  categoryMovies,
  name
}: Props) => {
  const { loading, user } = useAuth()
  // const showModal = useRecoilValue(modalState)
  const showModal = useStore((state: any) => state.isModalState)

  const list = useList(user?.uid)

  if (loading) return null

  console.log('Top Rated: ', topRated)

  return (
    <div className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${showModal && '!h-screen overflow-hidden'}`}>
      <Head>
        <title>Home - Mouvee</title>
        <link rel="icon" href="/favicon.ico" crossOrigin="anonymous" />
      </Head>
      <main className="relative px-4 pb-24 lg:space-y-24 lg:px-16">
        <Banner mouveeBanner={mouveeBanner} />
        <section className="md:space-y-24">
          <RowClean movies={nowPlaying} />
          <RowCategory categories={categories} categoryMovies={categoryMovies} name={name} />
          <RowFill title="Top Rated" movies={topRated} />
          <RowFill title="Popular" movies={popular} />
          <RowFill title="Upcoming" movies={upcoming} />
          {list.length > 0 && <RowFill title="My List" movies={list} />}
        </section>
        {showModal && <Modal />}
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { idc, category: name }: any = query

  const [
    nowPlaying,
    categories,
    popular,
    topRated,
    upcoming,
    categoryMovies
  ] = await Promise.all([
    reqApi.getNowPlaying(),
    reqApi.getCategories().then((res) => res.genres.filter(
      (genre: CategoryTypes) =>
        genre.name !== 'Romance'
    )),
    reqApi.getPopular(),
    reqApi.getTopRated(),
    reqApi.getUpcoming(),
    reqApi.getCategoryMovies(idc),
  ])

  return {
    props: {
      mouveeBanner: nowPlaying.results || [],
      nowPlaying: nowPlaying.results || [],
      categories: categories || [],
      popular: popular.results || [],
      topRated: topRated.results || [],
      upcoming: upcoming.results || [],
      categoryMovies: categoryMovies.results || [],
      name: name || 'Action',
    },
  }
}
