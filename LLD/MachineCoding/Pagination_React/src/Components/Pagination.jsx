const Pagination = ({ products, totalPage, page, setPage, maxVisible }) => {
  const renderPageNumbers = () => {
    if (totalPage <= maxVisible) {
      return [...Array(totalPage)].map((_, i) => (
        <span
          className={page === i + 1 ? "pagination_selected" : ""}
          key={i + 1}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </span>
      ));
    }

    let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPage, startPage + maxVisible - 1);

    const pages = [];

    // Left ellipsis
    if (startPage > 1) {
      pages.push(
        <span key={1} onClick={() => setPage(1)}>1</span>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis-start" className="pagination__ellipsis" style={{ cursor: "default" }}>...</span>
        );
      }
    }

    // Main page numbers section
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <span
          className={page === i ? "pagination_selected" : ""}
          key={i}
          onClick={() => setPage(i)}
        >
          {i}
        </span>
      );
    }

    // Right ellipsis
    if (endPage < totalPage) {
      if (endPage < totalPage - 1) {
        pages.push(
          <span key="ellipsis-end" className="pagination__ellipsis" style={{ cursor: "default" }}>...</span>
        );
      }
      pages.push(
        <span key={totalPage} onClick={() => setPage(totalPage)}>
          {totalPage}
        </span>
      );
    }

    return pages;
  };

  return (
    <div className="pagination">
      {products && products.length > 0 && page > 1 && (
        <span onClick={() => setPage(page - 1)}>Prev</span>
      )}

      {renderPageNumbers()}

      {products && products.length > 0 && page < totalPage && (
        <span onClick={() => setPage(page + 1)}>Next</span>
      )}
    </div>
  );
};

export default Pagination;
