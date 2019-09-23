import React, { Component } from "react";

class Cell extends Component {
  state = {};

  render() {
    return (
      <div
        className="d-inline-block  "
        style={{
          backgroundColor: this.getBGColor(),
          height: this.props.cell.height,
          width: this.props.cell.width
        }}
      ></div>
    );
  }

  getBGColor = () => {
    switch (this.props.cell.type) {
      case "empty":
        return "#dee2e6";
      case "snake":
        return "black";
      case "food":
        return "green";
    }
  };
}

export default Cell;
