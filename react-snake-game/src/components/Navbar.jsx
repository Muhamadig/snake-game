import React, { Component } from "react";
class Navbar extends Component {
  state = {};
  render() {
    return (
      <div class="navbar navbar-dark bg-dark shadow-sm">
        <div class="container d-flex justify-content-between">
          <a href="#" class="navbar-brand d-flex align-items-center">
            <strong>Snake Game</strong>
          </a>
        </div>
      </div>
    );
  }
}

export default Navbar;
