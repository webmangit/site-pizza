import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from './FullPizza.module.scss'

export const FullPizza = () => {
  const { id } = useParams()
  const [pizza, setPizza] = useState<{
    imageUrl: string
    title: string
    price: number
    rating: number
  }>()

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://62f391b1a84d8c968126af62.mockapi.io/items/${id}`)
        setPizza(data)
      } catch (error) {
        alert('Ошибка при получении пиццы!')
        navigate('/')
      }
    }
    fetchPizza()
  }, [])

  return (
    <>
      {!pizza
        ?
        'Загрузка ...'
        :
        <div className={styles.pizza}>
          <div className={styles.pizzaImg}>
            <img src={pizza.imageUrl} alt="Pizza" />
          </div>
          <div className={styles.pizzaContent}>
            <h1>{pizza.title}</h1>
            <div>Цена: <span>{pizza.price}</span> руб</div>
            <div>Рейтинг: <span>{pizza.rating}</span></div>
          </div>
        </div>
      }
    </>



  )
}
