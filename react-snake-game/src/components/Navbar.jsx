import React, { Component } from "react";
class Navbar extends Component {
  state = {};
  render() {
    return (
      <div className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container d-flex justify-content-between">
          <a href="" className="navbar-brand d-flex align-items-center">
            <strong>Snake Game</strong>
          </a>
        </div>
      </div>
    );
  }
}

export default Navbar;
