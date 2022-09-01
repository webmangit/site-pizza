export enum SortPropertyEnum {
  RATING_DESK = 'rating',
  RATING_ASK = '-rating',
  TITLE_DESK = 'title',
  TITLE_ASK = '-title',
  PRICE_DESK = 'price',
  PRICE_ASK = '-price'
}

export type SortPopup = {
  name: string
  type: SortPropertyEnum
}

export interface FilterSliceState {
  searchValue: string
  category: number
  currenPage: number
  sort: SortPopup
}
