import React, { Component } from "react";
import Cell from "./cell";
class Grid extends Component {
  state = {
    cells: [],
    rows: [],
    rowsNumber: 30,
    columnsNumber: 30
  };

  constructor() {
    super();
    for (let i = 0; i < this.state.rowsNumber; i++) {
      this.state.rows.push(i);
      for (let j = 0; j < this.state.columnsNumber; j++) {
        this.state.cells.push({
          x: j,
          y: i,
          type: "empty",
          height: 20,
          width: 20
        });
      }
    }
    console.log(this.state.cells);
  }

  getCell = (x, y) => {
    return this.state.cells.find(cell => cell.x === x && cell.y === y);
  };

  getRow = rowNumber => {
    return this.state.cells.filter(cell => cell.y === rowNumber);
  };

  render() {
    return (
      <div className="border border-primary" className="m-0 p-0">
        {this.state.rows.map(row => {
          return (
            <div key={`row-${row}`} className="m-0 p-0">
              {this.getRow(row).map(cell => {
                return <Cell key={`${cell.x},${cell.y}`} cell={cell}></Cell>;
              })}
            </div>
          );
        })}
        {/* <div>
          <Cell x={1} y={1} type={"empty"} height={16} width={16}></Cell>
          <Cell x={1} y={1} type={"snake"} height={16} width={16}></Cell>
          <Cell x={1} y={1} type={"empty"} height={16} width={16}></Cell>
          <Cell x={1} y={1} type={"food"} height={16} width={16}></Cell>
          <Cell x={1} y={1} type={"empty"} height={16} width={16}></Cell>
          <Cell x={1} y={1} type={"empty"} height={16} width={16}></Cell>
          <Cell x={1} y={1} type={"empty"} height={16} width={16}></Cell>
          <Cell x={1} y={1} type={"empty"} height={16} width={16}></Cell>
        </div>
        <div>
          <Cell x={1} y={1} type={"empty"} height={16} width={16}></Cell>
          <Cell x={1} y={1} type={"snake"} height={16} width={16}></Cell>
          <Cell x={1} y={1} type={"snake"} height={16} width={16}></Cell>
          <Cell x={1} y={1} type={"empty"} height={16} width={16}></Cell>
          <Cell x={1} y={1} type={"empty"} height={16} width={16}></Cell>
          <Cell x={1} y={1} type={"empty"} height={16} width={16}></Cell>
          <Cell x={1} y={1} type={"empty"} height={16} width={16}></Cell>
          <Cell x={1} y={1} type={"empty"} height={16} width={16}></Cell>
        </div> */}
      </div>
    );
  }
}

export default Grid;
