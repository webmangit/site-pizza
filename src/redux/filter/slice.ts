import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterSliceState, SortPopup, SortPropertyEnum } from './types'

const initialState: FilterSliceState = {
  searchValue: '',
  category: 0,
  currenPage: 1,
  sort: {
    name: 'популярности',
    type: SortPropertyEnum.RATING_DESK
  }
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<number>) {
      state.category = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setSort(state, action: PayloadAction<SortPopup>) {
      state.sort = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currenPage = action.payload
    },
    setFilters(state, action) {
      state.currenPage = Number(action.payload.currenPage)
      state.category = Number(action.payload.category)
      state.sort.type = action.payload.type
    }
  }
})

export const { setCategory, setSearchValue, setSort, setCurrentPage, setFilters } = filterSlice.actions
export default filterSlice.reducer // именно это мы импортируем в store