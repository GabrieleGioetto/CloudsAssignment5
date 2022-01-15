import "../App.css";
import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { TableFilter } from "./TableFilter";

import { filterMovies } from "./Util";

export const MainContent = ({
  movies,
  moviesWishlist,
  addToWishlist,
  isLoading,
}) => {
  const [filterCategory, setFilterCategory] = useState("title");
  const [filterText, setFilterText] = useState("");

  const actionsFormatter = (cell, row) => (
    <Button onClick={() => addToWishlist(row)} variant="outline-danger">
      <FontAwesomeIcon icon={faHeart} />
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
      text: "Add to wishlist",
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
    onPageChange: function (page, sizePerPage) {},
    onSizePerPageChange: function (page, sizePerPage) {},
  });

  const getMoviesNotInWishlist = (movies, moviesWishlist) => {
    const moviesWishlistIds = moviesWishlist.map((movie) => movie.id);
    const moviesNotInWishlist = movies.filter(
      (movie) => !moviesWishlistIds.includes(movie.id)
    );

    return moviesNotInWishlist;
  };

  const moviesNotInWishlist = getMoviesNotInWishlist(movies, moviesWishlist);
  const filteredMovies = filterMovies(
    moviesNotInWishlist,
    filterCategory,
    filterText
  );

  return (
    <div className="mainContent">
      {isLoading ? (
        <div className="spinner">
          <h1>Loading movies...</h1>
          <Spinner
            style={{ marginLeft: "2em" }}
            animation="border"
            role="status"
          >
            <span className="visually-hidden">Loading... </span>
          </Spinner>
        </div>
      ) : (
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
      )}
    </div>
  );
};
