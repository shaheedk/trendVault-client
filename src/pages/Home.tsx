import BestSeller from "../components/elements/BestSeller"
import Hero from "../components/Home/Hero"
import LatestCollection from "../components/Home/LatestCollection"
import OurPolicy from "../components/policy/OurPolicy"


const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
    </div>
  )
}

export default Home
