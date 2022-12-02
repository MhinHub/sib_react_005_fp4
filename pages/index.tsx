import Head from 'next/head'
// import { useRecoilValue } from 'recoil'
// import { modalState, movieState } from '../atoms/modalAtom'
import useStore from '../core/store'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Modal from '../components/Modal'
import RowClean from '../components/RowClean'
import RowFill from '../components//RowFill'
import useAuth from '../hooks/useAuth'
import { Movie } from '../typings'
import requests from '../utils/requests'
import useList from '../hooks/useList'

interface Props {
  mouveeBanner: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
}

const Home = ({
  mouveeBanner,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}: Props) => {
  const { loading, user } = useAuth()
  // const showModal = useRecoilValue(modalState)
  const showModal = useStore((state: any) => state.modalState)

  const list = useList(user?.uid)

  if (loading) return null

  // const getDeviceType = () => {
  //   const ua = navigator.userAgent;
  //   if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
  //     return "tablet";
  //   }
  //   if (
  //     /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
  //       ua
  //     )
  //   ) {
  //     return "mobile";
  //   }
  //   return "desktop";
  // };

  // console.log('device type', getDeviceType())

  return (
    <div className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${showModal && '!h-screen overflow-hidden'}`}>
      <Head>
        <title>Home - Mouvee</title>
        <link rel="icon" href="/favicon.ico" crossOrigin="anonymous" />
      </Head>

      <Header />
      <main className="relative px-4 pb-24 lg:space-y-24 lg:px-16">
        <Banner mouveeBanner={mouveeBanner} />
        <section className="md:space-y-24">
          <RowClean movies={trendingNow} />
          <RowFill title="Top Rated" movies={topRated} />
          {/* <RowFill title="Action Thrillers" movies={actionMovies} />
          {list.length > 0 && <RowFill title="My List" movies={list} />}
          <RowFill title="Comedies" movies={comedyMovies} />
          <RowFill title="Scary Movies" movies={horrorMovies} />
          <RowFill title="Romance Movies" movies={romanceMovies} />
          <RowFill title="Documentaries" movies={documentaries} /> */}
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const [
    mouveeBanner,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchMouveeBanner).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])

  return {
    props: {
      mouveeBanner: mouveeBanner.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  }
}
