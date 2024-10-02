"use client"
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "@/states/blogs/blogsSlice";
import { getBlogs } from "@/states/blogs/handleRequests";

const Pagination = () => {

  const dispatch = useDispatch()
  const { totalCount, currentPage } = useSelector(state => state.blogs)
  const totalPages = Math.ceil(totalCount / 5)

  const handleChangePage = (currentPage) => {
    dispatch(setCurrentPage(currentPage))
    dispatch(getBlogs({ currentPage }))
  }

  const renderPaginationItems = () => {
    const items = [];
    const maxPagesToShow = 5; // Maximum number of pages to show at a time
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);
    let startPage, endPage;
  
    if (totalPages <= maxPagesToShow) {
      // If total pages are less than or equal to maxPagesToShow, show all pages
      startPage = 1;
      endPage = totalPages;
    } else {
      // Calculate start and end pages based on current page
      startPage = Math.max(currentPage - halfPagesToShow, 1);
      endPage = startPage + maxPagesToShow - 1;
  
      // Adjust if endPage exceeds totalPages
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - maxPagesToShow + 1;
      }
    }
  
    for (let page = startPage; page <= endPage; page++) {
      const isCurrentPage = page === currentPage;
      const className = isCurrentPage ? "current-page" : "";
  
      items.push(
        <li key={page}>
          <span className={className} onClick={() => handleChangePage(page)}>
            {page}
          </span>
        </li>
      );
    }
  
    return items;
  };

  return (
    <nav className="ls-pagination">
      <ul>
        <li className="prev">
          <button onClick={() => handleChangePage(currentPage - 1)} disabled={currentPage <= 1}>
            <i className="fa fa-arrow-left"></i>
          </button>
        </li>
        {renderPaginationItems()}
        <li className="next">
          <button onClick={() => handleChangePage(currentPage + 1)} disabled={currentPage >= totalPages}>
            <i className="fa fa-arrow-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
