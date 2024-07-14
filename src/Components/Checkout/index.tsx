import { useDispatch, useSelector } from 'react-redux'
import { AddCartButton, SubmitCartButton } from '../Cart/styles'
import {
  DeliverContainer,
  Field,
  PaymentContainer,
  ConfirmedContainer
} from './styles'
import {
  backtoCart,
  payment,
  confirmed,
  startCheckout,
  closeAndFinish
} from '../../store/reducers/cart'
import { RootReducer } from '../../store'
import { priceFormat } from '../FoodList'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { usePurchaseMutation } from '../../services/api'
import { IMaskInput } from 'react-imask'

type Props = {
  checkoutStart?: boolean
  priceTotal: number
}

const Checkout = ({ checkoutStart = false, priceTotal = 0 }: Props) => {
  const [purchase, { isSuccess, data }] = usePurchaseMutation()

  const { isPayment, isConfirmed, pedido } = useSelector(
    (state: RootReducer) => state.cart
  )
  const dispatch = useDispatch()

  const finish = () => {
    dispatch(closeAndFinish())
  }
  const backCart = () => {
    dispatch(backtoCart())
  }
  const backAdress = () => {
    dispatch(startCheckout())
  }
  const activePayment = () => {
    if (
      form.values.remetente &&
      form.values.endereco &&
      form.values.cidade &&
      form.values.cep &&
      form.values.numero
    ) {
      dispatch(payment())
    } else {
      alert('Preencha antes os dados obrigatórios!')
    }
  }
  const activeConfirmed = () => {
    if (
      form.values.cardName &&
      form.values.cardNumber &&
      form.values.cvv &&
      form.values.anoVencimento &&
      form.values.mesVencimento
    ) {
      dispatch(confirmed())
    } else {
      alert('Preencha antes os dados obrigatórios!')
    }
    console.log(pedido)
  }

  const form = useFormik({
    initialValues: {
      remetente: '',
      endereco: '',
      cidade: '',
      cep: '',
      numero: '',
      complemento: '',
      cardName: '',
      cardNumber: '',
      cvv: '',
      mesVencimento: '',
      anoVencimento: ''
    },
    validationSchema: Yup.object({
      remetente: Yup.string().required('Campo obrigatório'),
      endereco: Yup.string().required('Campo obrigatório'),
      cidade: Yup.string().required('Campo obrigatório'),
      cep: Yup.string().required('Campo obrigatório'),
      numero: Yup.string().required('Campo obrigatório'),

      cardName: Yup.string().when((values, schema) =>
        isPayment ? schema.required('O campo é obrigatório') : schema
      ),
      cardNumber: Yup.string().when((values, schema) =>
        isPayment ? schema.required('O campo é obrigatório') : schema
      ),
      cvv: Yup.string().when((values, schema) =>
        isPayment ? schema.required('O campo é obrigatório') : schema
      ),
      mesVencimento: Yup.string().when((values, schema) =>
        isPayment ? schema.required('O campo é obrigatório') : schema
      ),
      anoVencimento: Yup.string().when((values, schema) =>
        isPayment ? schema.required('O campo é obrigatório') : schema
      )
    }),
    onSubmit: (values) => {
      purchase({
        delivery: {
          receiver: values.remetente,
          address: {
            city: values.cidade,
            description: values.endereco,
            number: Number(values.numero),
            zipCode: values.cep,
            complement: values.complemento
          }
        },
        payment: {
          card: {
            name: values.cardName,
            number: values.cardNumber,
            code: Number(values.cvv),
            expires: {
              month: Number(values.mesVencimento),
              year: Number(values.anoVencimento)
            }
          }
        },
        products: [
          {
            id: 1,
            price: 100
          }
        ]
      })
    }
  })
  const getErroMassage = (campo: string, message?: string) => {
    const estaAlterado = campo in form.touched
    const estaInvalido = campo in form.errors
    if (estaAlterado && estaInvalido) {
      return message
    }
    return ''
  }
  return (
    <form onSubmit={form.handleSubmit}>
      <DeliverContainer className={checkoutStart ? 'show' : ''}>
        <h2>Entrega</h2>
        <Field>
          <label htmlFor="remetente">Quem irá receber</label>
          <input
            type="text"
            required
            id="remetente"
            name="remetente"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.remetente}
          />
          <small>{getErroMassage('remetente', form.errors.remetente)}</small>
        </Field>
        <Field>
          <label htmlFor="endereco">Endereço</label>
          <input
            type="text"
            required
            id="endereco"
            name="endereco"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.endereco}
          />
          <small>{getErroMassage('endereco', form.errors.endereco)}</small>
        </Field>
        <Field>
          <label htmlFor="cidade">Cidade</label>
          <input
            type="text"
            required
            id="cidade"
            name="cidade"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.cidade}
          />
          <small>{getErroMassage('cidade', form.errors.cidade)}</small>
        </Field>
        <div className="CEPNumber">
          <Field>
            <label htmlFor="cep">CEP</label>
            <IMaskInput
              mask="00.000-000"
              type="text"
              required
              id="cep"
              name="cep"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.cep}
            />
            <small>{getErroMassage('cep', form.errors.cep)}</small>
          </Field>
          <Field>
            <label htmlFor="numero">Número</label>
            <input
              type="number"
              required
              id="numero"
              name="numero"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.numero}
            />
            <small>{getErroMassage('numero', form.errors.numero)}</small>
          </Field>
        </div>
        <Field>
          <label htmlFor="complemento">Complemento (opcional)</label>
          <input
            type="text"
            id="complemento"
            name="complemento"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.complemento}
          />
          {/* <small>
            {getErroMassage('complemento', form.errors.complemento)}
          </small> */}
        </Field>
        <div className="buttomContainer">
          <AddCartButton type="submit" onClick={activePayment}>
            Continuar com o pagamento
          </AddCartButton>
          <AddCartButton onClick={backCart}>Voltar ao carrinho</AddCartButton>
        </div>
      </DeliverContainer>
      <PaymentContainer className={isPayment ? 'show' : ''}>
        <p>Pagamento - Valor a pagar {priceFormat(priceTotal)}</p>

        <Field>
          <label htmlFor="cardName">Nome do cartão</label>
          <input
            type="text"
            required
            id="cardName"
            name="cardName"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.cardName}
          />
          <small>{getErroMassage('cardName', form.errors.cardName)}</small>
        </Field>
        <div className="fieldContainer">
          <Field>
            <label htmlFor="cardNumber">Número do cartão</label>
            <IMaskInput
              mask="0000.0000.0000.0000"
              type="text"
              required
              id="cardNumber"
              name="cardNumber"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.cardNumber}
            />
            <small>
              {getErroMassage('cardNumber', form.errors.cardNumber)}
            </small>
          </Field>
          <Field>
            <label htmlFor="cvv">CVV</label>
            <IMaskInput
              mask="000"
              type="text"
              required
              id="cvv"
              name="cvv"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.cvv}
            />
            <small>{getErroMassage('cvv', form.errors.cvv)}</small>
          </Field>
        </div>
        <div className="fieldContainer">
          <Field>
            <label htmlFor="mesVencimento">Mês de vencimento</label>
            <IMaskInput
              mask="00"
              type="text"
              required
              id="mesVencimento"
              name="mesVencimento"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.mesVencimento}
            />
            <small>
              {getErroMassage('mesVencimento', form.errors.mesVencimento)}
            </small>
          </Field>
          <Field>
            <label htmlFor="anoVencimento">Ano de vencimento</label>
            <IMaskInput
              mask="00"
              type="text"
              required
              id="anoVencimento"
              name="anoVencimento"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.anoVencimento}
            />
            <small>
              {getErroMassage('anoVencimento', form.errors.anoVencimento)}
            </small>
          </Field>
        </div>
        <div className="buttomContainer">
          <SubmitCartButton type="submit" onClick={activeConfirmed}>
            Finalizar pagamento
          </SubmitCartButton>
          <AddCartButton onClick={backAdress}>
            Voltar para a edição do endereço
          </AddCartButton>
        </div>
      </PaymentContainer>
      <ConfirmedContainer className={isConfirmed && isSuccess ? 'show' : ''}>
        <h2>Pedido realizado - {data?.orderId} </h2>
        <p>
          Estamos felizes em informar que seu pedido já está em processo de
          preparação e, em breve, será entregue no endereço fornecido.
        </p>
        <br />
        <p>
          Gostaríamos de ressaltar que nossos entregadores não estão autorizados
          a realizar cobranças extras.
        </p>
        <br />
        <p>
          Lembre-se da importância de higienizar as mãos após o recebimento do
          pedido, garantindo assim sua segurança e bem-estar durante a refeição.
        </p>
        <br />
        <p>
          Esperamos que desfrute de uma deliciosa e agradável experiência
          gastronômica. Bom apetite!
        </p>
        <div className="buttomContainer">
          <AddCartButton type="submit" onClick={finish}>
            Concluir
          </AddCartButton>
        </div>
      </ConfirmedContainer>
    </form>
  )
}

export default Checkout
