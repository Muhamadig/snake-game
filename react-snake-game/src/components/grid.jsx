import React, { Component } from "react";
import Cell from "./cell";
class Grid extends Component {
  state = {
    allCells: [],
    emptyCells: [],
    food: {},
    snake: {
      head: {},
      tail: {},
      direction: "left"
    },
    rows: [],
    rowsNumber: 30,
    columnsNumber: 30
  };

  constructor() {
    super();
    this.createGridCells();
    this.setFoodAndSnakeCells();
    this.intervalId = setInterval(this.tick, 300);
  }

  createGridCells = () => {
    for (let i = 0; i < this.state.rowsNumber; i++) {
      this.state.rows.push(i);
      for (let j = 0; j < this.state.columnsNumber; j++) {
        this.state.allCells.push({
          x: j,
          y: i,
          type: "empty",
          height: 20,
          width: 20
        });
      }
    }
    this.state.emptyCells = [...this.state.allCells];
  };

  setFoodAndSnakeCells = () => {
    const snakeHeadCell = this.getCell(
      Math.floor(this.state.columnsNumber / 2),
      Math.floor(this.state.rowsNumber / 2)
    );
    const snakeHeadCellIndex = this.state.emptyCells.indexOf(snakeHeadCell);
    this.state.emptyCells.splice(snakeHeadCellIndex, 1);
    this.state.snake.head = snakeHeadCell;
    this.state.snake.tail = snakeHeadCell;
    this.state.snake.head.type = "snake";

    const foodCellIndex = Math.floor(
      Math.random() * this.state.emptyCells.length
    );
    this.state.emptyCells.splice(foodCellIndex, 1);
    this.state.food = this.state.allCells[foodCellIndex];
    this.state.food.type = "food";
  };

  getCell = (x, y) => {
    return this.state.allCells.find(cell => cell.x === x && cell.y === y);
  };
  getEmptyCell = (x, y) => {
    return this.state.emptyCells.find(cell => cell.x === x && cell.y === y);
  };

  getRow = rowNumber => {
    return this.state.allCells.filter(cell => cell.y === rowNumber);
  };

  render() {
    return (
      <div className="border border-primary m-2">
        {this.state.rows.map(row => {
          return (
            <div key={`row-${row}`}>
              {this.getRow(row).map(cell => {
                return <Cell key={`${cell.x},${cell.y}`} cell={cell}></Cell>;
              })}
            </div>
          );
        })}
      </div>
    );
  }

  componentDidMount() {
    document.body.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.body.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = event => {
    let { direction } = this.state.snake;
    const { head, tail } = this.state.snake;
    switch (event.keyCode) {
      case 37:
        if (direction !== "right") direction = "left";
        break;
      case 38:
        if (direction !== "down") direction = "up";
        break;
      case 39:
        if (direction !== "left") direction = "right";
        break;
      case 40:
        if (direction !== "up") direction = "down";
        break;
    }

    this.setState({ snake: { direction, head, tail } });
  };

  tick = () => {
    let { direction, head, tail } = this.state.snake;

    switch (direction) {
      case "left":
        if (head.x - 1 < 0) this.gameOver();
        else {
          const headLeft = this.getEmptyCell(head.x - 1, head.y);
          headLeft.type = "snake";
          head = headLeft;
          this.state.emptyCells.splice(
            this.state.emptyCells.indexOf(headLeft),
            1
          );

          const tailLeft = this.getCell(tail.x - 1, tail.y);
          tail.type = "empty";
          this.state.emptyCells.push(tail);
          tail = tailLeft;

          this.setState({ snake: { direction, head, tail } });
        }
        break;
      case "up":
        if (head.y - 1 < 0) this.gameOver();
        else {
          const headUp = this.getEmptyCell(head.x, head.y - 1);
          headUp.type = "snake";
          head = headUp;
          this.state.emptyCells.splice(
            this.state.emptyCells.indexOf(headUp),
            1
          );

          const tailUp = this.getCell(tail.x, tail.y - 1);
          tail.type = "empty";
          this.state.emptyCells.push(tail);
          tail = tailUp;

          this.setState({ snake: { direction, head, tail } });
        }
        break;
      case "down":
        if (head.y + 1 >= this.state.rowsNumber) this.gameOver();
        else {
          const headDown = this.getEmptyCell(head.x, head.y + 1);
          headDown.type = "snake";
          head = headDown;
          this.state.emptyCells.splice(
            this.state.emptyCells.indexOf(headDown),
            1
          );

          const tailDown = this.getCell(tail.x, tail.y + 1);
          tail.type = "empty";
          this.state.emptyCells.push(tail);
          tail = tailDown;

          this.setState({ snake: { direction, head, tail } });
        }
        break;
      case "right":
        if (head.x + 1 >= this.state.columnsNumber) this.gameOver();
        else {
          const headRight = this.getEmptyCell(head.x + 1, head.y);
          headRight.type = "snake";
          head = headRight;
          this.state.emptyCells.splice(
            this.state.emptyCells.indexOf(headRight),
            1
          );

          const tailRight = this.getCell(tail.x + 1, tail.y);
          tail.type = "empty";
          this.state.emptyCells.push(tail);
          tail = tailRight;

          this.setState({ snake: { direction, head, tail } });
        }
        break;
    }
  };

  gameOver = () => {
    clearInterval(this.intervalId);
    console.log("Game Over");
  };

  showResult = () => {};
}

export default Grid;
