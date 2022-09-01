import React from 'react'
import styles from './Categories.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setCategory } from '../../../redux/filter/slice'

export const Categories = () => {
  const category = useSelector((state: any) => state.filterSlice.category)
  const dispatch = useDispatch()

  const categories = [
    'Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Иные'
  ]

  return (
    <ul className={styles.categories}>
      {
        categories.map((item, i) => (
          <li
            onClick={() => dispatch(setCategory(i))}
            className={category === i ? styles.active : ''}
            key={i}>{item}
          </li>
        ))
      }
    </ul>
  )
}


