import React, { Component } from "react";

class Cell extends Component {
  state = {};
  //   constructor(props) {
  //     super(props);
  //     this.state.x = this.props.x;
  //     this.state.y = this.props.y;
  //     this.state.type = this.props.type;
  //     this.state.height = this.props.height;
  //     this.state.width = this.props.width;
  //   }
  //   constructor(x, y, type, height, width) {
  //     super();
  //     this.state.x = x;
  //     this.state.y = y;
  //     this.state.type = type;
  //     this.state.height = height;
  //     this.state.width = width;
  //   }
  render() {
    return (
      <div
        className="d-inline-block m-0 p-0"
        style={{
          padding: 0,
          margin: 0,
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
        return "#e9ecef";
      case "snake":
        return "green";
      case "food":
        return "red";
    }
  };
}

export default Cell;
