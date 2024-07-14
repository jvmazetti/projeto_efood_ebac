import styled from 'styled-components'
import fundo from '../../assets/fundoHero.png'
import { breakpoints, cores } from '../../styles'

export const HeaderStyle = styled.header`
  background-image: url(${fundo});

  align-items: center;
  text-align: center;
  .container {
    padding: 39px 0;
    max-width: 1024px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;

    @media (max-width: ${breakpoints.iphone11}) {
      display: inline-block;
    }

    @media (max-width: ${breakpoints.mobile}) {
      display: inline-block;
    }
    @media (max-width: ${breakpoints.desktop}) {
      padding: 39px 10px;
    }
  }
`
export const Branding = styled.img`
  max-width: 125px;
  width: 100%;
  height: 57.5px;
  @media (max-width: ${breakpoints.iphone11}) {
    margin: 15px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    margin: 15px;
  }
`
export const LinkRestaurantes = styled.a`
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  color: ${cores.vermelho};
  margin-top: 39px;
  @media (max-width: ${breakpoints.iphone11}) {
    margin-top: 0;
  }
  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 0;
  }
`

export const TextCart = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-top: 39px;
  cursor: pointer;
  @media (max-width: ${breakpoints.iphone11}) {
    margin-top: 0;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 0;
  }
`
