import * as React from "react";
import PaginateComp from "react-paginate";
import "./Pagination.scss";

type Props = {
  totalPages: number;
  onPageChange: (selectedItem: any) => void;
  currentPage: number;
};
const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="pagination">
      <PaginateComp
        pageCount={totalPages}
        pageRangeDisplayed={10}
        marginPagesDisplayed={1}
        onPageChange={onPageChange}
        containerClassName="pagination__item"
        activeClassName="pagination__item--active"
        previousClassName="pagination__item--active__previous"
        nextClassName="pagination__item--active__next"
        pageClassName="pagination__item--active__page"
        pageLinkClassName="pagination__item--active__pageLink"
        disabledClassName="pagination__item--active__disabled"
        breakClassName="pagination__item--active__break"
      />
    </div>
  );
};

export default Pagination;
