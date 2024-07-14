import { useParams } from 'react-router-dom'
import Header from '../../Components/Header'
import Apresentacao from '../../Components/Apresentacao'
import FoodList from '../../Components/FoodList'
import Footer from '../../Components/Footer'
import { useGetRestaurantSelectedQuery } from '../../services/api'
import Cart from '../../Components/Cart'
import Loader from '../../Components/Loader'

type RestaurantParams = {
  id: string
}

const Perfil = () => {
  const { id } = useParams() as RestaurantParams
  const { data: restaurantFood } = useGetRestaurantSelectedQuery(id)

  if (restaurantFood) {
    return (
      <>
        <Header />
        <Apresentacao restaurant={restaurantFood} />
        <FoodList
          restaurant={restaurantFood}
          pedido={{
            id: 0,
            nome: '',
            foto: '',
            preco: 0
          }}
        />
        <Footer />
        <Cart />
      </>
    )
  }
  return <Loader />
}

export default Perfil
