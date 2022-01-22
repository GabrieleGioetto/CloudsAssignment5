import React from "react";

import { MyNavbar } from "./Navbar";
import { MainContent } from "./MainContent";
import { Wishlist } from "./Wishlist";

import "../App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { db, dbFirestore } from "../services/firebase";
import { ref, onValue } from "firebase/database";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

import { useEffect, useState } from "react";
import { dbFirestoreName, dbName } from "./Util";

const Home = ({ user }) => {
  const [movies, setMovies] = useState([]);
  const [moviesWishlist, setMoviesWishlist] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onValue(ref(db, `/${dbName}/`), (snapshot) => {
      console.log(snapshot);
      let allMovies = [];
      snapshot.forEach((snap) => {
        allMovies.push(snap.val());
      });

      setMovies(allMovies);
      setIsLoading(false);
    });

    const q = query(
      collection(dbFirestore, `${dbFirestoreName}`),
      where("userEmail", "==", user.email)
    );

    getDocs(q).then((snapshot) => {
      let allMoviesWishlist = [];

      snapshot.forEach((doc) => {
        allMoviesWishlist.push(doc.data());
      });
      setMoviesWishlist(allMoviesWishlist);
    });
  }, []);

  const addToWishlist = (row) => {
    // dbFirestore

    console.log(row);
    row["userEmail"] = user.email;

    setMoviesWishlist([...moviesWishlist, row]);

    setDoc(
      doc(
        dbFirestore,
        `${dbFirestoreName}`,
        getDocumentId({ userEmail: user.email, movieId: row.id.toString() })
      ),
      row
    )
      .then(() => {
        console.log("Successful");
      })
      .catch((error) => {
        console.log(`Unsuccessful returned error ${error}`);
      });
  };

  const removeFromWishlist = (row) => {
    setMoviesWishlist(moviesWishlist.filter((movie) => movie.id != row.id));

    deleteDoc(
      doc(
        dbFirestore,
        `${dbFirestoreName}`,
        getDocumentId({ userEmail: user.email, movieId: row.id.toString() })
      )
    )
      .then(() => {
        console.log("Successful");
      })
      .catch((error) => {
        console.log(`Unsuccessful returned error ${error}`);
      });
  };

  function getDocumentId({ userEmail, movieId }) {
    return `${userEmail}_${movieId}`;
  }

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
                isLoading={isLoading}
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
