import styled from 'styled-components'
import { breakpoints, cores } from '../../styles'

export const Container = styled.div`
  max-width: 1024px;
  margin: 80px auto;

  li {
    list-style: none;
  }

  @media (max-width: ${breakpoints.desktop}) {
    margin: 20px 10px;
  }
`
export const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 32px;
  row-gap: 32px;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
    row-gap: 20px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
    margin: 0 10px;
    row-gap: 10px;
  }
`

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  align-items: center;
  justiry-content: center;
  z-index: 2;

  &.visible {
    display: flex;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
  }
`

export const ModalContent = styled.div`
  margin: 0 auto;
  max-width: 1024px;
  background-color: ${cores.vermelho};
  display: flex;
  flex-direction: row;
  position: relative;
  z-index: 3;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 15px;
  }
`
export const FoodImage = styled.img`
  object-fit: cover;
  max-width: 280px;
  max-height: 280px;
  margin: 32px 24px 32px 32px;
  object-fit: cover;

  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`
export const ModalContainer = styled.div`
  max-width: 656px;
  width: 100%;
  margin-top: 32px;
`

export const FoodTitle = styled.h3`
  font-size: 18px;
  font-weight: 900;
  color: ${cores.branco};
  line-height: 21.09px;
  display: block;
`
export const FoodDescription = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${cores.branco};
  line-height: 22px;
  width: 100%;
  margin: 16px 0 16px 0;
  p {
    margin-top: 16px;
  }
`
export const CloseIcon = styled.img`
  max-width: 16px;
  max-height: 16px;
  width: 100%;
  margin: 8px;
  cursor: pointer;
`
export const AddCartButton = styled.button`
  background-color: ${cores.rosa};
  color: ${cores.vermelho};
  border: none;
  padding: 4px 7px;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
`
