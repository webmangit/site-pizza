import React from 'react'
import styles from './CartEmpty.module.scss'
import { Link } from "react-router-dom";


import imgEmptyCart from '../../../assets/img/empty-cart.png'


export const CartEmpty = () => {
  return (
    <div className={styles.cartEmpty}>
      <h1>
        <span>😕</span><br />
        Корзина пустая
      </h1>
      <p className={styles.description}>Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы заказать пиццу, перейди на главную страницу.</p>
      <div className={styles.cartEmptyImg}>
        <img src={imgEmptyCart} alt="Empty cart img" />

      </div>

      <Link to="/" className={styles.button}>
        <span>Вернуться назад</span>
      </Link>
    </div >
  )
}
