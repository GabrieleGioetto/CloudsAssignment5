import "../App.css";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { filterMovies } from "./Util";
import { TableFilter } from "./TableFilter";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

export const Wishlist = ({ moviesWishlist, removeFromWishlist }) => {
  const [filterCategory, setFilterCategory] = useState("title");
  const [filterText, setFilterText] = useState("");

  const actionsFormatter = (cell, row) => (
    <Button onClick={() => removeFromWishlist(row)} variant="outline-danger">
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
      text: "Actions",
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
    sizePerPage: 10,
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
    </div>
  );
};
