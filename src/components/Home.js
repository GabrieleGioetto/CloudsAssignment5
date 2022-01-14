import React from "react";

import { MyNavbar } from "./Navbar";
import { MainContent } from "./MainContent";

import "../App.css";

import { db } from "../services/firebase";
import { ref, onValue } from "firebase/database";

import { useEffect, useState } from "react";

const Home = ({ user }) => {
  const [movies, setMovies] = useState([]);

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
  }, []);

  return (
    <div className="home">
      <MyNavbar user={user} />
      <MainContent movies={movies} />
    </div>
  );
};

export default Home;
