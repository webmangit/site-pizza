import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { Pizza, SearchPizzaParams } from "./types"

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  '>pizza/fetchPizzasStatus',
  async (params) => {
    const { categoryId, sortBy, order, search, currenPage } = params
    const { data } = await axios.get<Pizza[]>(`https://62f391b1a84d8c968126af62.mockapi.io/items?page=${currenPage}&limit=8&${categoryId}&sortBy=${sortBy}&order=${order}${search}`)

    return data
  }
)