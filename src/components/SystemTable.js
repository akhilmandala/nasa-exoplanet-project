import { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { PaginationControl } from "./PaginationControl";

function SystemsTablePage() {
  const [currentExoplanetData, setCurrentExoplanetData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [
    currentNumberViewedElements,
    setCurrentNumberViewedElements,
  ] = useState(20);

  const loadPage = (nextPage, numViewedElements) => {
    axios
      .get(
        `http://localhost:4000/systems?pagenum=${nextPage}&elems=${numViewedElements}`
      )
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
        setCurrentPage(nextPage);
      })
      .catch((err) => console.log(err));
  };
  const paginationControl = (nextPage) => {
    loadPage(nextPage, currentNumberViewedElements);
  };

  useEffect(() => {
    loadPage(currentPage, currentNumberViewedElements);
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
    <>
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
      <PaginationControl
        currentPage={currentPage}
        maxPages={50}
        onPageSelect={paginationControl}
      />
    </>
  );
}

export { SystemsTablePage };
