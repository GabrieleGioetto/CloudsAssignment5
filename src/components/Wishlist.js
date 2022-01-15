import "../App.css";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";

import { filterMovies } from "./Util";
import { TableFilter } from "./TableFilter";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import { useNavigate } from "react-router-dom";

export const Wishlist = ({ moviesWishlist, removeFromWishlist }) => {
  const [filterCategory, setFilterCategory] = useState("title");
  const [filterText, setFilterText] = useState("");

  const navigate = useNavigate();

  const actionsFormatter = (cell, row) => (
    <Button onClick={() => removeFromWishlist(row)} variant="outline-danger">
      <FontAwesomeIcon icon={faHeartBroken} />
    </Button>
  );

  const columns = [
    {
      dataField: "title",
      text: "Title",
      sort: true,
    },
    {
      dataField: "year",
      text: "Year",
      sort: true,
    },
    {
      dataField: "genre",
      text: "Genre",
      sort: true,
    },
    {
      dataField: "actions",
      text: "Remove from wishlist",
      isDummyField: true,
      csvExport: false,
      formatter: actionsFormatter,
    },
  ];

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 8,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });

  const filteredMovies = filterMovies(
    moviesWishlist,
    filterCategory,
    filterText
  );

  return (
    <div className="mainContent">
      {moviesWishlist.length > 0 ? (
        <>
          <TableFilter
            setFilterText={setFilterText}
            setFilterCategory={setFilterCategory}
          />

          <BootstrapTable
            keyField="id"
            data={filteredMovies}
            columns={columns}
            defaultSorted={defaultSorted}
            pagination={pagination}
          ></BootstrapTable>
        </>
      ) : (
        <>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>No movies in the wishlist</Card.Title>
              <Button
                variant="primary"
                onClick={() => {
                  navigate("/");
                }}
              >
                Return to the home
              </Button>
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
};
