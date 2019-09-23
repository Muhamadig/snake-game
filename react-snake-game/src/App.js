import React from "react";
import Navbar from "./components/navbar";
import Game from "./components/game";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Game />
    </React.Fragment>
  );
}

export default App;
