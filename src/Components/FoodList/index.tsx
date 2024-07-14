import { useState } from 'react'
import Food from '../Food'
import { AddCartButton } from './styles'
import {
  Container,
  List,
  Modal,
  ModalContent,
  FoodImage,
  ModalContainer,
  FoodTitle,
  FoodDescription,
  CloseIcon
} from './styles'
import close from '../../assets/close 1.png'
import { useDispatch } from 'react-redux'
import { addItem, open } from '../../store/reducers/cart'

export type Props = {
  restaurant: Restaurant
  pedido: Pedido
}

export const priceFormat = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

const FoodList = ({ restaurant, pedido }: Props) => {
  const [showModal, setShowModal] = useState(false)
  const [foodTitle, setfoodTitle] = useState('')
  const [foodDescription, setfoodDescription] = useState('')
  const [foodPhoto, setfoodPhoto] = useState('')
  const [foodPhotoAlt, setfoodPhotoAlt] = useState('')
  const [foodServe, setfoodServe] = useState('')
  const [foodPrice, setfoodPrice] = useState(0)
  const [foodId, setFoodId] = useState(0)

  const dispatch = useDispatch()
  const addToCart = () => {
    pedido.id = foodId
    pedido.nome = foodTitle
    pedido.foto = foodPhoto
    pedido.preco = foodPrice
    dispatch(addItem(pedido))
    setShowModal(false)
    dispatch(open())
  }

  return (
    <>
      <Container>
        <List>
          {restaurant.cardapio.map((food) => (
            <li
              key={food.id}
              onClick={() => {
                setShowModal(true)
                setfoodTitle(food.nome)
                setfoodDescription(food.descricao)
                setfoodServe(food.porcao)
                setfoodPrice(food.preco)
                setfoodPhotoAlt(food.nome)
                setfoodPhoto(food.foto)
                setFoodId(food.id)
              }}
            >
              <Food
                key={food.id}
                FoodPhoto={food.foto}
                FoodTitle={food.nome}
                FoodDescription={food.descricao}
                FoodPhotoAlt={food.nome}
              />
            </li>
          ))}
        </List>
      </Container>
      <Modal className={showModal ? 'visible' : ''}>
        <ModalContent>
          <FoodImage src={foodPhoto} alt={foodPhotoAlt} />
          <ModalContainer>
            <FoodTitle>{foodTitle}</FoodTitle>
            <FoodDescription>
              {foodDescription}
              <p>Serve: {foodServe}</p>
            </FoodDescription>
            <AddCartButton onClick={addToCart}>
              Adicionar ao carrinho - {priceFormat(foodPrice)}
            </AddCartButton>
          </ModalContainer>
          <CloseIcon
            onClick={() => setShowModal(false)}
            src={close}
            alt="Icone de fechar"
          />
        </ModalContent>
        <div onClick={() => setShowModal(false)} className="overlay"></div>
      </Modal>
    </>
  )
}

export default FoodList
