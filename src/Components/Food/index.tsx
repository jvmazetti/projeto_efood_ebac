import { Card, Photo, Title, Description, AddCartButton } from './styles'

export type Props = {
  FoodPhoto: string
  FoodTitle: string
  FoodDescription: string
  FoodPhotoAlt: string
}
export const reduceDescription = (description: string) => {
  if (description.length > 128) {
    return description.slice(0, 121) + '...'
  }
  return description
}
const Food = ({
  FoodPhoto,
  FoodTitle,
  FoodDescription,
  FoodPhotoAlt
}: Props) => {
  return (
    <Card>
      <Photo src={FoodPhoto} alt={FoodPhotoAlt} />
      <Title>{FoodTitle}</Title>
      <Description>{reduceDescription(FoodDescription)}</Description>
      <AddCartButton to={''}>Adicionar ao carrinho</AddCartButton>
    </Card>
  )
}

export default Food
