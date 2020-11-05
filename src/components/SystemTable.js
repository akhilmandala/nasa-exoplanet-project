import { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";

function PaginationControl({ currentPage, onPageSelect, maxPages }) {
  let paginationElements;
  if (currentPage === 1) {
    paginationElements = (
      <>
        <Pagination.Item>{currentPage}</Pagination.Item>
        <Pagination.Item>{currentPage + 1}</Pagination.Item>
        <Pagination.Item>{currentPage + 2}</Pagination.Item>
      </>
    );
  } else if (currentPage === maxPages) {
    paginationElements = (
      <>
        <Pagination.Item>{currentPage - 2}</Pagination.Item>
        <Pagination.Item>{currentPage - 1}</Pagination.Item>
        <Pagination.Item>{currentPage}</Pagination.Item>
      </>
    );
  } else {
    paginationElements = (
      <>
        <Pagination.Item>{currentPage - 1}</Pagination.Item>
        <Pagination.Item>{currentPage}</Pagination.Item>
        <Pagination.Item>{currentPage + 1}</Pagination.Item>
      </>
    );
  }

  return (
    <Pagination>
      <Pagination.First></Pagination.First>
      <Pagination.Prev></Pagination.Prev>
      {paginationElements}
      <Pagination.Next></Pagination.Next>
      <Pagination.Last></Pagination.Last>
    </Pagination>
  );
}

function SystemsTablePage() {
  const [currentExoplanetData, setCurrentExoplanetData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/systems?pagenum=0&elems=20")
      .then((res) => {
        const exoplanetRowData = res.data.map(
          ({ _id, pl_name, pl_rade, sy_dist, st_logg }) => ({
            id: _id,
            planet_name: pl_name,
            planet_radius: pl_rade,
            planet_distance: sy_dist,
            surface_gravity: st_logg,
          })
        );

        setCurrentExoplanetData(exoplanetRowData);
      })
      .catch((err) => console.log(err));
  }, []);

  const tableEntries = currentExoplanetData.map(
    ({ id, planet_name, planet_radius, planet_distance, surface_gravity }) => (
      <tr>
        <td>{planet_name}</td>
        <td>{planet_radius}</td>
        <td>{planet_distance}</td>
        <td>{surface_gravity}</td>
      </tr>
    )
  );

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Planet Name</th>
          <th>Planet radius (Earth radius)</th>
          <th>Planet distance (parsec)</th>
          <th>Stellar Surface gravity (log10)</th>
        </tr>
      </thead>
      <tbody>{tableEntries}</tbody>
    </Table>
  );
}

export { SystemsTablePage };
