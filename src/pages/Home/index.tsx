import Footer from '../../Components/Footer'
import Hero from '../../Components/Hero'
import Loader from '../../Components/Loader'
import RestaurantList from '../../Components/RestaurantList'
import { useGetRestaurantsQuery } from '../../services/api'

const Home = () => {
  const { data: restaurants } = useGetRestaurantsQuery()

  if (restaurants) {
    return (
      <>
        <Hero />
        <RestaurantList restaurants={restaurants} />
        <Footer />
      </>
    )
  }
  return <Loader />
}
export default Home
