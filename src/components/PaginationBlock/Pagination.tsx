import React from 'react'
import styles from './Pagination.module.scss'
import ReactPaginate from 'react-paginate'

type PaginationProps = {
  currenPage: number
  onChangePage: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({ currenPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={e => onChangePage(e.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
      forcePage={currenPage - 1}
    />
  )
}
