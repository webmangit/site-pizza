import React, { useState } from 'react';
import styles from './PizzaItem.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCartItemById } from '../../../redux/cart/selectors';
import { CartItemType } from '../../../redux/cart/types';
import { addItem } from '../../../redux/cart/slice';


type PizzaItemProps = {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
}

const typeNames = ['тонкое', 'традиционное'];

export const PizzaItem: React.FC<PizzaItemProps> = ({ id, title, price, imageUrl, sizes, types }) => {
  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItemById(id))

  const [sizePizza, setSizePizza] = useState(0)
  const [typePizza, setTypePizza] = useState(0)

  const addedCount = cartItem ? cartItem.count : 0

  const onClickAdd = () => {
    const item: CartItemType = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[typePizza],
      size: sizes[sizePizza],
      count: 0
    }
    dispatch(addItem(item))

  }

  return (
    <div>
      <Link to={`/pizza/${id}`}>
        <div className={styles.pizzaItemImg}>
          <img src={imageUrl} alt="Pizza" />
        </div>
        <h2 className={styles.pizzaItemTitle}>{title}</h2>
      </Link>
      <div className={styles.pizzaItemFilter}>
        <ul>
          {
            types.map((type, i) => (
              <li
                onClick={() => setTypePizza(i)}
                className={typePizza === i ? styles.active : ''}
                key={type}
              >{typeNames[type]}</li>
            ))
          }
        </ul>
        <ul>
          {
            sizes.map((size, i) => (
              <li
                onClick={() => setSizePizza(i)}
                className={sizePizza === i ? styles.active : ''}
                key={i}
              >{size} см.</li>
            ))
          }
        </ul>
      </div>
      <div className={styles.pizzaItemFooter}>
        <div className={styles.pizzaItemPrice}>от {price} ₽</div>
        <button onClick={onClickAdd}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span className={styles.pizzaItemAdd}>Добавить</span>
          {addedCount > 0 &&
            <div className={styles.pizzaItemCounter}>
              <span>{addedCount}</span>
            </div>
          }

        </button>
      </div>
    </div>
  )
}
