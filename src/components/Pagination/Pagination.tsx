import * as React from "react";
import PaginateComp from "react-paginate";
import "./Pagination.scss";

type Props = {
  totalPages: number;
  onPageChange: (selectedItem: any) => void;
  currentPage: number;
};
const Pagination: React.FC<Props> = ({ totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <div className="pagination__container">
        <PaginateComp
          pageCount={totalPages}
          pageRangeDisplayed={4}
          marginPagesDisplayed={1}
          onPageChange={onPageChange}
          containerClassName="pagination__item"
          activeClassName="pagination__item--active"
        />
      </div>
    </div>
  );
};

export default Pagination;
