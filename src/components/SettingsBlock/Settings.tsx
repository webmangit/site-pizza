import React from 'react'
import { Categories } from './CategoriesBlock/Categories'
import { Sort } from './SortBlock/Sort'
import styles from './Settings.module.scss'

export const Settings = () => {
  return (
    <div className={styles.settings}>
      <Categories />
      <Sort />
    </div>
  )
}
