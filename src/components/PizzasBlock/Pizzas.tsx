import styles from './Pizzas.module.scss'
import React, { useEffect, useRef } from 'react'
import { Pagination } from '../PaginationBlock/Pagination'
import { PizzaItem } from './PizzaItemBlock/PizzaItem'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'
import { sortList } from '../SettingsBlock/SortBlock/Sort'
import { useAppDispatch } from '../../redux/store'
import { setCurrentPage, setFilters } from '../../redux/filter/slice'
import { selectFilter } from '../../redux/filter/selectors'
import { selectPizzaData } from '../../redux/pizza/selectors'
import { fetchPizzas } from '../../redux/pizza/asyncActions'

export const Pizzas = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const { pizzas, status } = useSelector(selectPizzaData)
  const { category, sort, currenPage, searchValue } = useSelector(selectFilter)

  const categories = [
    'Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Иные'
  ]

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const getPizzas = async () => {
    const categoryId = category > 0 ? `category=${category}` : ''
    const sortBy = sort.type.replace('-', '')
    const order = sort.type.includes('-') ? 'asc' : 'desc'
    const search = searchValue ? `&search=${searchValue}` : ''

    dispatch(
      fetchPizzas({
        categoryId,
        sortBy,
        order,
        search,
        currenPage: String(currenPage)
      }))
  }

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        type: sort.type,
        category,
        currenPage
      })

      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [category, sort, currenPage])

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = sortList.find(obg => obg.type === params.type)
      dispatch(
        setFilters({
          ...params, sort
        })
      )
      isSearch.current = true
    }
  }, [])

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    // window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas()
    }
    isSearch.current = false
  }, [category, sort, searchValue, currenPage])

  const pizzasList = pizzas.map((pizza: any) => <PizzaItem {...pizza} key={pizza.id} />)

  return (
    <div className={styles.pizzas}>
      <h1 className={styles.pizzasTitle}>{categories[category]} пиццы</h1>
      {
        status === 'error'
          ?
          <div>
            <h1>
              <span>😕</span><br />
              Упс, ошибка!
            </h1>
            <p className={styles.description}>К сожалению произошла ошибка</p>
          </div>
          :
          <>
            <div className={styles.pizzasItems}>
              {status === 'loading' ? "Закрузка данных..." : pizzasList}
            </div>
            <Pagination currenPage={currenPage} onChangePage={onChangePage} />
          </>
      }

    </div>
  )
}
