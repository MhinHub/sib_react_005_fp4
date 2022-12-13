import Layout from '@components/Layout'
// import { useRecoilValue } from 'recoil'
// import { modalState, movieState } from '../atoms/modalAtom'
import Banner from '../components/Banner'
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

  return (
    <Layout title="Home">
      <main className={`relative`}>
        <Banner mouveeBanner={mouveeBanner} />
        <section className="px-6 md:space-y-24 md:px-16">
          <RowClean movies={nowPlaying} />
          <RowCategory categories={categories} categoryMovies={categoryMovies} name={name} />
          <RowFill title="Top Rated" movies={topRated} />
          <RowFill title="Popular" movies={popular} />
          <RowFill title="Upcoming" movies={upcoming} />
        </section>
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
