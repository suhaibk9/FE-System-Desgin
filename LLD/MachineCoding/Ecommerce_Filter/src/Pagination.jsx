const Pagination = ({ products, totalPage, page, setPage, maxVisible }) => {
  const renderPageNumbers = () => {
    if (totalPage <= maxVisible) {
      return [...Array(totalPage)].map((_, i) => (
        <button
          type="button"
          className={`pagination__item ${
            page === i + 1 ? "pagination_selected" : ""
          }`}
          key={i + 1}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ));
    }

    let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPage, startPage + maxVisible - 1);

    const pages = [];

    // Left ellipsis
    if (startPage > 1) {
      pages.push(
        <button
          type="button"
          className="pagination__item"
          key={1}
          onClick={() => setPage(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis-start" className="pagination__ellipsis">
            ...
          </span>
        );
      }
    }

    // Main page numbers section
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          type="button"
          className={`pagination__item ${
            page === i ? "pagination_selected" : ""
          }`}
          key={i}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      );
    }

    // Right ellipsis
    if (endPage < totalPage) {
      if (endPage < totalPage - 1) {
        pages.push(
          <span key="ellipsis-end" className="pagination__ellipsis">
            ...
          </span>
        );
      }
      pages.push(
        <button
          type="button"
          className="pagination__item"
          key={totalPage}
          onClick={() => setPage(totalPage)}
        >
          {totalPage}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="pagination">
      {products && products.length > 0 && page > 1 && (
        <button
          type="button"
          className="pagination__item pagination__nav"
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
      )}

      {renderPageNumbers()}

      {products && products.length > 0 && page < totalPage && (
        <button
          type="button"
          className="pagination__item pagination__nav"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
