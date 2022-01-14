import "../App.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import BootstrapTable from "react-bootstrap-table-next";

export const MainContent = ({ movies }) => {
  const columns = [
    {
      dataField: "id",
      text: "Product ID",
    },
    {
      dataField: "name",
      text: "Product Name",
    },
    {
      dataField: "price",
      text: "Product Price",
    },
  ];

  return (
    <div className="mainContent">
      <BootstrapTable striped bordered hover options={{ pageSize: 10 }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Remove from wishlist</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => {
            console.log(movie);
            return (
              <tr>
                <td>{movie.title}</td>
                <td>{movie.year}</td>
                <td>{movie.genre}</td>
                <td>
                  <Button variant="outline-danger">
                    <FontAwesomeIcon icon={faHeart} />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </BootstrapTable>
    </div>
  );
};
