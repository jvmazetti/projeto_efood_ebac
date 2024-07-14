import { PacmanLoader } from 'react-spinners'
import { Container } from './styles'
import { cores } from '../../styles'

const Loader = () => {
  return (
    <>
      <Container>
        <PacmanLoader color={cores.vermelho} />
      </Container>
    </>
  )
}

export default Loader
