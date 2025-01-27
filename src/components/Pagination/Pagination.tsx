import React from "react";
import ReactPaginate from "react-paginate";
import s from "./Pagination.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export type PaginationProps = {
  onChangePage: (e: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ onChangePage }) => {
  const currentPage = useSelector(
    (state: RootState) => state.filter.currentPage
  );

  return (
    <ReactPaginate
      className={s.paginate}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={3}
      forcePage={currentPage - 1}
      // forcePage={currentPage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
