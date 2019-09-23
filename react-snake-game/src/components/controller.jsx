import React, { Component } from "react";
class Controller extends Component {
  state = {};
  render() {
    return (
      <div>
        <h3 style={{ display: "inline" }}>
          Score <span className="badge badge-pill badge-success">10</span>
        </h3>
        <h3 style={{ display: "inline" }}>
          Time <span className="badge badge-pill badge-info">10</span>
        </h3>
      </div>
    );
  }
}

export default Controller;
