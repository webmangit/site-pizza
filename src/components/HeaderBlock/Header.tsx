import React, { useEffect, useRef } from 'react'
import styles from './Header.module.scss'
import logoSvg from '../../assets/img/pizza-logo.svg'
import cartSvg from '../../assets/img/cart.svg'
import { Link, useLocation } from "react-router-dom";
import { Search } from './SearchBlock/Search';
import { useSelector } from 'react-redux'
import { selectCart } from '../../redux/cart/selectors';


export const Header = () => {
  const { items, totalPrice } = useSelector(selectCart)
  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0)

  const location = useLocation()

  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items)
      localStorage.setItem('cart', json)
    }
    isMounted.current = true
  }, [items])

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link className={styles.headerBlock} to="/">
          <div className={styles.headerLogo}>
            <img src={logoSvg} alt="Pizza logo"></img>
            <div>
              <span>Pizza</span>
              <p>Самая вкусная пицца во вселенной</p>
            </div>
          </div>
          {location.pathname === '/' && <Search />}
        </Link>

        <Link to="/cart">
          <div className={styles.headerCart}>
            <span className={styles.headerCartPrice}>{totalPrice} ₽</span>
            <div></div>
            <img src={cartSvg} alt="Cart icon" />
            <span>{totalCount}</span>
          </div>
        </Link>
      </div>
    </header>
  )
}
