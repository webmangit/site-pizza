import React from 'react';
import styles from './Cart.module.scss';
import { Link } from "react-router-dom";
import cartSvg from '../../assets/img/cart-black.svg'
import { useDispatch, useSelector } from 'react-redux'
import { CartItem } from './CartItemBlock/CartItem';
// import { clearItems, selectCart } from '../../redux/slices/cartSlice';
import { CartEmpty } from './CartEmptyBlock/CartEmpty';
import { selectCart } from '../../redux/cart/selectors';
import { clearItems } from '../../redux/cart/slice';


export const Cart = () => {
  const dispatch = useDispatch()
  const { totalPrice, items } = useSelector(selectCart)

  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0)

  const onClickClear = () => {
    if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
      dispatch(clearItems())
    }
  }

  return (
    <>
      {items.length === 0
        ?
        <CartEmpty />
        :
        <div className={styles.cartNonempty}>
          <div className={styles.header}>
            <div className={styles.title}>
              <img src={cartSvg} alt="Cart icon" />
              <h1>Корзина</h1>
            </div>
            <div onClick={onClickClear} className={styles.reset}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 5H4.16667H17.5" stroke="#B6B6B6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z" stroke="#B6B6B6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.33337 9.16667V14.1667" stroke="#B6B6B6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11.6666 9.16667V14.1667" stroke="#B6B6B6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Очистить корзину</span>
            </div>
          </div>
          <div className={styles.body}>
            {
              items.map((item: any) => <CartItem key={item.id} {...item} />)
            }
          </div>
          <div className={styles.result}>
            <div>Всего пицц: <span>{totalCount} шт.</span></div>
            <div>Сумма заказа: <strong>{totalPrice} ₽</strong></div>
          </div>
          <div className={styles.footer}>
            <Link to="/" className={`${styles.button} ${styles.buttonLeft}`}>
              <span>Вернуться назад</span>
            </Link>
            <Link to="/" className={`${styles.button} ${styles.buttonRight}`}>
              <span>Оплатить сейчас</span>
            </Link>
          </div>
        </div>
      }
    </>
  )


}
