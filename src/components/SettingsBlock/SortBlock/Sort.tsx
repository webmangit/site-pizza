import React from 'react'
import { useEffect, useRef, useState } from 'react'
import sortSvg from '../../../assets/img/arrow-top.svg'
import styles from './Sort.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { SortPropertyEnum } from '../../../redux/filter/types'
import { selectSort } from '../../../redux/filter/selectors'
import { setSort } from '../../../redux/filter/slice'

type SortItem = {
  name: string
  type: SortPropertyEnum
}

type PopupClick = MouseEvent & {
  path: Node[]
}

export const sortList: SortItem[] = [
  { name: "популярности ↓", type: SortPropertyEnum.RATING_DESK },
  { name: "популярности ↑", type: SortPropertyEnum.RATING_ASK },
  { name: "цене ↓", type: SortPropertyEnum.PRICE_DESK },
  { name: "цене ↑", type: SortPropertyEnum.PRICE_ASK },
  { name: "алфавиту ↓", type: SortPropertyEnum.TITLE_ASK },
  { name: "алфавиту ↑", type: SortPropertyEnum.TITLE_DESK }
]

export const Sort = () => {
  const sort = useSelector(selectSort)
  const dispatch = useDispatch()
  const sortRef = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useState(false)
  const onSortState = (item: SortItem) => {
    dispatch(setSort(item))
    setOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setOpen(false)
      }
    }
    document.body.addEventListener('click', handleClickOutside)
    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div ref={sortRef} className={styles.sort}>
      <div className={styles.sortLabel}>
        <img className={open ? '' : styles.active} src={sortSvg} alt="Arrow icon" />
        <span className={styles.sortSpanOne}>Сортировка по:</span>
        <span className={styles.sortSpanTwo} onClick={() => setOpen(!open)} >{sort.name}</span>
      </div>

      {open &&
        <div className={styles.sortPopup}>
          <ul>
            {sortList.map((item, i) => (
              <li
                onClick={() => onSortState(item)}
                className={sort.type === item.type ? styles.active : ""}
                key={item.name}
              >{item.name}</li>
            ))}
          </ul>
        </div>
      }
    </div>

  )
}
