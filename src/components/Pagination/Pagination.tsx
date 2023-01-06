import * as React from "react";
import "./pagination.scss";

import { Props } from "./types";

import PaginateComp from "react-paginate";

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="pagination" aria-label="Pagination Navigation">
      <PaginateComp
        forcePage={currentPage === 0 ? currentPage : currentPage - 1}
        pageCount={totalPages}
        pageRangeDisplayed={10}
        marginPagesDisplayed={1}
        onPageChange={onPageChange}
        containerClassName="pagination__container"
        activeClassName="pagination__page--active"
        nextClassName="pagination__next"
        previousClassName="pagination__previous"
        pageClassName="pagination__page"
        pageLinkClassName="pagination__pageLink"
        previousLabel={<span aria-label="Previous page">{"<"}</span>}
        nextLabel={<span aria-label="Next page">{">"}</span>}
      />
    </div>
  );
};

export default Pagination;
