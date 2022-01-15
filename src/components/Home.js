import React from "react";

import { MyNavbar } from "./Navbar";
import { MainContent } from "./MainContent";
import { Wishlist } from "./Wishlist";

import "../App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { db, dbFirestore } from "../services/firebase";
import { ref, onValue } from "firebase/database";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

import { useEffect, useState } from "react";

const Home = ({ user }) => {
  const [movies, setMovies] = useState([]);
  const [moviesWishlist, setMoviesWishlist] = useState([]);

  useEffect(() => {
    onValue(ref(db, "/movies-list/"), (snapshot) => {
      console.log(snapshot);
      let allMovies = [];
      snapshot.forEach((snap) => {
        allMovies.push(snap.val());
      });

      setMovies(allMovies);
      console.log(allMovies);
    });

    getDocs(collection(dbFirestore, "movies-wishlist")).then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.data());
        let allMoviesWishlist = [];
        snapshot.forEach((snap) => {
          allMoviesWishlist.push(snap.val());
        });

        setMoviesWishlist(allMoviesWishlist);
        console.log(allMoviesWishlist);
      });
    });
  }, []);

  const addToWishlist = (row) => {
    setMoviesWishlist([...moviesWishlist, row]);
  };

  const removeFromWishlist = (row) => {
    setMoviesWishlist(moviesWishlist.filter((movie) => movie.id != row.id));
  };

  return (
    <Router>
      <div className="home">
        <MyNavbar user={user} />ù
        <Routes>
          <Route
            path="/"
            exact
            element={
              <MainContent
                movies={movies}
                moviesWishlist={moviesWishlist}
                addToWishlist={addToWishlist}
              />
            }
          />
          <Route
            path="/wishlist"
            exact
            element={
              <Wishlist
                moviesWishlist={moviesWishlist}
                removeFromWishlist={removeFromWishlist}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default Home;
