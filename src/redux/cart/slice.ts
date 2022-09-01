import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calcTotalPrice } from '../../utils/calcTotalPrice'
import { getCartFromLocalStorage } from '../../utils/getCartFromLocalStorage'
import { CartItemType, CartSliceState } from './types'


const initialState: CartSliceState = getCartFromLocalStorage()

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)

      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }

      state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action: PayloadAction<String>) {
      const findItem = state.items.find((obj) => obj.id === action.payload)
      if (findItem) {
        findItem.count--
      }
    },
    removeItem(state, action: PayloadAction<String>) {
      state.items = state.items.filter(obj => obj.id !== action.payload)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    }
  }
})

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions
export default cartSlice.reducer // именно это мы импортируем в store