import { lazy, Suspense } from "react";

const BestSeller = lazy(() => import("../components/ui/BestSeller"));
const Hero = lazy(() => import("../components/ui/Hero"));
const LatestCollection = lazy(() => import("../components/ui/LatestCollection"));
const Newsletter = lazy(() => import("../components/common/Newsletter"));
const OurPolicy = lazy(() => import("../components/common/OurPolicy"));


import Preloader from "../components/ui/Preloader"


const Home = () => {
  return (
    <Suspense fallback={<Preloader/>}>
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <Newsletter/>
    </Suspense>
  )
}

export default Home
