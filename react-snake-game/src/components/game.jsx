import React, { Component } from "react";
import Controller from "./controller";
import Grid from "./grid";
class Game extends Component {
  state = {};
  render() {
    return (
      <div className="container" id="game">
        <div className="row">
          <div className="col-1"></div>
          <div className="">
            <Controller />
            <Grid></Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
