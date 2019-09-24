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
    rowsNumber: 20,
    columnsNumber: 20
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

    this.generateNewFood();
  };

  generateNewFood = () => {
    const foodCellIndex = Math.floor(
      Math.random() * this.state.emptyCells.length
    );
    const emptyCells = this.state.emptyCells.splice(foodCellIndex, 1);
    let food = this.state.allCells[foodCellIndex];
    food.type = "food";
    this.setState({ emptyCells, food });
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

  getTailNext = () => {
    const { tail } = this.state.snake;
    const neighbours = [];
    if (tail.x + 1 < this.state.columnsNumber)
      neighbours.push(this.getCell(tail.x + 1, tail.y));
    if (tail.x - 1 >= 0) neighbours.push(this.getCell(tail.x - 1, tail.y));
    if (tail.y + 1 < this.state.rowsNumber)
      neighbours.push(this.getCell(tail.x, tail.y + 1));
    if (tail.y - 1 >= 0) neighbours.push(this.getCell(tail.x, tail.y - 1));

    return neighbours.find(cell => cell.type === "snake");
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
          //   const headLeft = this.getEmptyCell(head.x - 1, head.y);
          const headLeft = this.getCell(head.x - 1, head.y);
          if (headLeft.type === "food") {
            headLeft.type = "snake";
            head = headLeft;
            this.generateNewFood();
          } else if (headLeft.type === "snake") this.gameOver();
          else {
            headLeft.type = "snake";
            head = headLeft;
            this.state.emptyCells.splice(
              this.state.emptyCells.indexOf(headLeft),
              1
            );
            this.setState({ snake: { direction, head, tail } });
            const tailNext = this.getTailNext();
            tail.type = "empty";
            this.state.emptyCells.push(tail);
            tail = tailNext;
          }
          this.setState({ snake: { direction, head, tail } });
        }
        break;
      case "up":
        if (head.y - 1 < 0) this.gameOver();
        else {
          const headUp = this.getCell(head.x, head.y - 1);
          if (headUp.type === "food") {
            headUp.type = "snake";
            head = headUp;
            this.generateNewFood();
          } else if (headUp.type === "snake") this.gameOver();
          else {
            headUp.type = "snake";
            head = headUp;
            this.state.emptyCells.splice(
              this.state.emptyCells.indexOf(headUp),
              1
            );
            this.setState({ snake: { direction, head, tail } });
            const tailNext = this.getTailNext();
            tail.type = "empty";
            this.state.emptyCells.push(tail);
            tail = tailNext;
          }
          this.setState({ snake: { direction, head, tail } });
        }
        break;
      case "down":
        if (head.y + 1 >= this.state.rowsNumber) this.gameOver();
        else {
          const headDown = this.getCell(head.x, head.y + 1);
          if (headDown.type === "food") {
            headDown.type = "snake";
            head = headDown;
            this.generateNewFood();
          } else if (headDown.type === "snake") this.gameOver();
          else {
            headDown.type = "snake";
            head = headDown;
            this.state.emptyCells.splice(
              this.state.emptyCells.indexOf(headDown),
              1
            );
            this.setState({ snake: { direction, head, tail } });
            const tailNext = this.getTailNext();
            tail.type = "empty";
            this.state.emptyCells.push(tail);
            tail = tailNext;
          }
          this.setState({ snake: { direction, head, tail } });
        }
        break;
      case "right":
        if (head.x + 1 >= this.state.columnsNumber) this.gameOver();
        else {
          const headRight = this.getCell(head.x + 1, head.y);
          if (headRight.type === "food") {
            headRight.type = "snake";
            head = headRight;
            this.generateNewFood();
          } else if (headRight.type === "snake") this.gameOver();
          else {
            headRight.type = "snake";
            head = headRight;
            this.state.emptyCells.splice(
              this.state.emptyCells.indexOf(headRight),
              1
            );
            this.setState({ snake: { direction, head, tail } });
            const tailNext = this.getTailNext();
            tail.type = "empty";
            this.state.emptyCells.push(tail);
            tail = tailNext;
          }

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
