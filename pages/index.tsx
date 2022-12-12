import Layout from '@components/Layout'
// import { useRecoilValue } from 'recoil'
// import { modalState, movieState } from '../atoms/modalAtom'
import useStore from '../core/zustand/store'
import Banner from '../components/Banner'
import Modal from '../components/Modal'
import RowClean from '../components/RowClean'
import RowFill from '../components/RowFill'
import { Movie, CategoryTypes } from '../typings'
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
  // const showModal = useRecoilValue(modalState)
  const showModal = useStore((state: any) => state.isModalState)

  console.log('Top Rated: ', topRated)

  return (
    <Layout title="Home">
      <main className={`relative ${showModal && '!h-screen overflow-hidden'}`}>
        {/* <section className="z-0 bg-gradient-to-b h-screen w-screen" > */}
          <Banner mouveeBanner={mouveeBanner} />
        {/* </section> */}
        <section className="px-6 md:space-y-24 md:px-16">
          <RowClean movies={nowPlaying} />
          <RowCategory categories={categories} categoryMovies={categoryMovies} name={name} />
          <RowFill title="Top Rated" movies={topRated} />
          <RowFill title="Popular" movies={popular} />
          <RowFill title="Upcoming" movies={upcoming} />
        </section>
        {showModal && <Modal />}
      </main>
    </Layout>
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
