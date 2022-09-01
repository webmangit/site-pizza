import React from 'react'
import styles from './Search.module.scss'
import { useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'
import { useCallback, useRef, useState } from 'react'
import { setSearchValue } from '../../../redux/filter/slice'


export const Search = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)
  const onClickClear = () => {
    dispatch(setSearchValue(''))
    setValue('')
    inputRef.current?.focus()
  }

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str))
    }, 250),
    []
  )
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    updateSearchValue(e.target.value)
  }

  return (
    <div className={styles.search}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        placeholder='Поиск пиццы...'
      />

      <svg className={styles.svgSearch}
        enableBackground="new 0 0 32 32" id="Editable-line" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="14" cy="14" fill="none" id="XMLID_42_" r="9" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"
        />
        <line
          fill="none" id="XMLID_44_" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" x1="27" x2="20.366" y1="27" y2="20.366"
        />
      </svg>

      {value &&
        <svg onClick={onClickClear} className={styles.svgClose} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      }
    </div>
  )
}


