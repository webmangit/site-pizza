import React from 'react';
import styles from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1>
        <span>😕</span><br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>К сожалению данная страница отсутсвует в нашем интернет-магазине</p>
    </div >
  )
}
