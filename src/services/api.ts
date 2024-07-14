import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Resposta = {
  orderId: string
}
type PurchasePayload = {
  products: [
    {
      id: number
      price: number
    }
  ]
  delivery: {
    receiver: string
    address: {
      description: string
      city: string
      zipCode: string
      number: number
      complement?: string
    }
  }
  payment: {
    card: {
      name: string
      number: string
      code: number
      expires: {
        month: number
        year: number
      }
    }
  }
}

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fake-api-tau.vercel.app/api/efood/'
  }),
  endpoints: (builder) => ({
    getRestaurantSelected: builder.query<Restaurant, string>({
      query: (id) => `restaurantes/${id}`
    }),
    getRestaurants: builder.query<Restaurant[], void>({
      query: () => 'restaurantes'
    }),
    purchase: builder.mutation<Resposta, PurchasePayload>({
      query: (body) => ({
        url: 'checkout',
        method: 'POST',
        body
      })
    })
  })
})

export default api
export const {
  useGetRestaurantsQuery,
  useGetRestaurantSelectedQuery,
  usePurchaseMutation
} = api
