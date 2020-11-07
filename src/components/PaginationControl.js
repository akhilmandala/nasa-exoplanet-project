import Pagination from "react-bootstrap/Pagination";

function PaginationControl({ currentPage, onPageSelect, maxPages }) {
  let paginationElements;
  if (currentPage === 0) {
    paginationElements = (
      <>
        <Pagination.Item onClick={() => onPageSelect(currentPage)} active>
          {currentPage}
        </Pagination.Item>
        <Pagination.Item onClick={() => onPageSelect(currentPage + 1)}>
          {currentPage + 1}
        </Pagination.Item>
        <Pagination.Item onClick={() => onPageSelect(currentPage + 2)}>
          {currentPage + 2}
        </Pagination.Item>
      </>
    );
  } else if (currentPage === maxPages) {
    paginationElements = (
      <>
        <Pagination.Item onClick={() => onPageSelect(currentPage - 2)}>
          {currentPage - 2}
        </Pagination.Item>
        <Pagination.Item onClick={() => onPageSelect(currentPage - 1)}>
          {currentPage - 1}
        </Pagination.Item>
        <Pagination.Item onClick={() => onPageSelect(currentPage)} active>
          {currentPage}
        </Pagination.Item>
      </>
    );
  } else {
    paginationElements = (
      <>
        <Pagination.Item onClick={() => onPageSelect(currentPage - 1)}>
          {currentPage - 1}
        </Pagination.Item>
        <Pagination.Item onClick={() => onPageSelect(currentPage)} active>
          {currentPage}
        </Pagination.Item>
        <Pagination.Item onClick={() => onPageSelect(currentPage + 1)}>
          {currentPage + 1}
        </Pagination.Item>
      </>
    );
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => onPageSelect(0)}></Pagination.First>
      <Pagination.Prev
        onClick={() => onPageSelect(currentPage - 1)}
      ></Pagination.Prev>
      {paginationElements}
      <Pagination.Next
        onClick={() => onPageSelect(currentPage + 1)}
      ></Pagination.Next>
      <Pagination.Last onClick={() => onPageSelect(maxPages)}></Pagination.Last>
    </Pagination>
  );
}

export { PaginationControl };
