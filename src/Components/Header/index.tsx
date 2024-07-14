import logo from '../../assets/logo.png'
import { HeaderStyle } from './styles'
import { Branding, LinkRestaurantes, TextCart } from './styles'
import { open } from '../../store/reducers/cart'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'

const Header = () => {
  const dispatch = useDispatch()
  const { pedido } = useSelector((state: RootReducer) => state.cart)
  const openCart = () => {
    dispatch(open())
  }
  return (
    <HeaderStyle>
      <div className="container">
        <LinkRestaurantes href="/">Restaurantes</LinkRestaurantes>
        <Branding src={logo} alt="Logo do restaurante" />
        <TextCart onClick={openCart}>
          {pedido.length} produto(s) no carrinho
        </TextCart>
      </div>
    </HeaderStyle>
  )
}

export default Header
