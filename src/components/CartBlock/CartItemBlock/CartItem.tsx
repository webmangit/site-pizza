import React from 'react'
import { useDispatch } from 'react-redux'
import { addItem, minusItem, removeItem } from '../../../redux/cart/slice'
import { CartItemType } from '../../../redux/cart/types'
import styles from './CartItem.module.scss'

type CartItemProps = {
  id: string
  title: string
  price: number
  count: number
  imageUrl: string
  type: string
  size: number
}

export const CartItem: React.FC<CartItemProps> = ({ id, title, price, count, imageUrl, type, size }) => {
  const dispatch = useDispatch()

  const onClickPlus = () => {
    dispatch(addItem({
      id,
    } as CartItemType))
  }

  const onClickMinus = () => {
    dispatch(minusItem(id))
  }

  const onClickRemove = () => {
    if (window.confirm('Вы уверены, что хотите удалить пиццу из корзины?')) {
      dispatch(removeItem(id))
    }
  }

  return (
    <div className={styles.item}>
      <div className={styles.pizza}>
        <div className={styles.image}>
          <img src={imageUrl} alt="Pizza" />
        </div>
        <div>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{type}, {size} см.</p>
        </div>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.counter}>
          <button disabled={count === 1} onClick={onClickMinus}
            className={count === 1 ? styles.counterMinus : styles.counterPlus}
          >
            <svg width="12" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.04016 0.0400085H8.84016C9.37032 0.0400085 9.80016 0.469849 9.80016 1.00001C9.80016 1.53017 9.37032 1.96001 8.84016 1.96001H4.04016H1.16016C0.630005 1.96001 0.200165 1.53017 0.200165 1.00001C0.200165 0.469849 0.630005 0.0400085 1.16016 0.0400085H4.04016Z" fill="#D7D7D7" />
            </svg>
          </button>
          <span>{count}</span>
          <button onClick={onClickPlus} className={styles.counterPlus}>
            <svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z" fill="#EB5A1E" />
              <path d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z" fill="#EB5A1E" />
            </svg>
          </button>
        </div>
        <div className={styles.price}>{price * count} ₽ </div>
        <div onClick={onClickRemove} className={styles.delete}>
          <svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z" fill="#EB5A1E" />
            <path d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z" fill="#EB5A1E" />
          </svg>
        </div>
      </div>
    </div>
  )
}
