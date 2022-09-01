import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { fetchPizzas } from './asyncActions'
import { Pizza, PizzaSliceState, SearchPizzaParams, Status } from './types'


const initialState: PizzaSliceState = {
  pizzas: [],
  status: Status.LOADING, // loading, success, error
}



export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.pizzas = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING
      state.pizzas = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.pizzas = action.payload
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
      state.pizzas = []
    })
  }
})

export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer 