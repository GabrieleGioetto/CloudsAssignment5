import { useState, useEffect } from "react";

import Login from "./components/Login";
import Home from "./components/Home";
// import firebase from "./services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  console.log(user);

  return <div className="app">{user ? <Home user={user} /> : <Login />}</div>;
}

export default App;
