/*** CONSTANT ***/
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLOR_MAPPING = [
    'red',
    'orange',
    'green',
    'purple',
    'blue',
    'cyan',
    'yellow',
    'white',
];

const BRICK_LAYOUT = [
    [
        [
          [1, 7, 7],
          [1, 1, 1],
          [7, 7, 7],
        ],
        [
          [7, 1, 1],
          [7, 1, 7],
          [7, 1, 7],
        ],
        [
          [7, 7, 7],
          [1, 1, 1],
          [7, 7, 1],
        ],
        [
          [7, 1, 7],
          [7, 1, 7],
          [1, 1, 7],
        ],
      ],
      [
        [
          [7, 1, 7],
          [7, 1, 7],
          [7, 1, 1],
        ],
        [
          [7, 7, 7],
          [1, 1, 1],
          [1, 7, 7],
        ],
        [
          [1, 1, 7],
          [7, 1, 7],
          [7, 1, 7],
        ],
        [
          [7, 7, 1],
          [1, 1, 1],
          [7, 7, 7],
        ],
      ],
      [
        [
          [1, 7, 7],
          [1, 1, 7],
          [7, 1, 7],
        ],
        [
          [7, 1, 1],
          [1, 1, 7],
          [7, 7, 7],
        ],
        [
          [7, 1, 7],
          [7, 1, 1],
          [7, 7, 1],
        ],
        [
          [7, 7, 7],
          [7, 1, 1],
          [1, 1, 7],
        ],
      ],
      [
        [
          [7, 1, 7],
          [1, 1, 7],
          [1, 7, 7],
        ],
        [
          [1, 1, 7],
          [7, 1, 1],
          [7, 7, 7],
        ],
        [
          [7, 7, 1],
          [7, 1, 1],
          [7, 1, 7],
        ],
        [
          [7, 7, 7],
          [1, 1, 7],
          [7, 1, 1],
        ],
      ],
      [
        [
          [7, 7, 7, 7],
          [1, 1, 1, 1],
          [7, 7, 7, 7],
          [7, 7, 7, 7],
        ],
        [
          [7, 7, 1, 7],
          [7, 7, 1, 7],
          [7, 7, 1, 7],
          [7, 7, 1, 7],
        ],
        [
          [7, 7, 7, 7],
          [7, 7, 7, 7],
          [1, 1, 1, 1],
          [7, 7, 7, 7],
        ],
        [
          [7, 1, 7, 7],
          [7, 1, 7, 7],
          [7, 1, 7, 7],
          [7, 1, 7, 7],
        ],
      ],
      [
        [
          [7, 7, 7, 7],
          [7, 1, 1, 7],
          [7, 1, 1, 7],
          [7, 7, 7, 7],
        ],
        [
          [7, 7, 7, 7],
          [7, 1, 1, 7],
          [7, 1, 1, 7],
          [7, 7, 7, 7],
        ],
        [
          [7, 7, 7, 7],
          [7, 1, 1, 7],
          [7, 1, 1, 7],
          [7, 7, 7, 7],
        ],
        [
          [7, 7, 7, 7],
          [7, 1, 1, 7],
          [7, 1, 1, 7],
          [7, 7, 7, 7],
        ],
      ],
      [
        [
          [7, 1, 7],
          [1, 1, 1],
          [7, 7, 7],
        ],
        [
          [7, 1, 7],
          [7, 1, 1],
          [7, 1, 7],
        ],
        [
          [7, 7, 7],
          [1, 1, 1],
          [7, 1, 7],
        ],
        [
          [7, 1, 7],
          [1, 1, 7],
          [7, 1, 7],
        ],
      ],
];


const WHITE_COLOR_ID = 7;

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

ctx.canvas.width = COLS*BLOCK_SIZE;
ctx.canvas.height = ROWS*BLOCK_SIZE;

class Board {
    constructor(ctx){
        this.ctx = ctx;
        this.grid = this.generateWhiteBoard();
    }

    generateWhiteBoard(){
        return Array.from({length: ROWS}, ()=>Array(COLS).fill(WHITE_COLOR_ID));
    }

    drawCell(xAxis, yAxis, colorId) {
        this.ctx.fillStyle = COLOR_MAPPING[colorId] || COLOR_MAPPING[WHITE_COLOR_ID];
        this.ctx.fillRect(xAxis*BLOCK_SIZE, yAxis*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillStyle = "black";
        this.ctx.strokeRect(xAxis*BLOCK_SIZE, yAxis*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }

    drawBoard() {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[row].length; col++) {
                this.drawCell(col, row, WHITE_COLOR_ID);
            }
        }
    }
}


class Brick {
    constructor(id, now_colPos, now_rowPos) {
        this.id = id;
        this.layout = BRICK_LAYOUT[id];
        this.activeIndex = 0;
        this.colPos = now_colPos;
        this.rowPos = now_rowPos;
    }

    draw() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][row].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    board.drawCell(col + this.colPos, row + this.rowPos, this.id);
                }
            }
        }
    }

    clear() {
      for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
          for (let col = 0; col < this.layout[this.activeIndex][row].length; col++) {
              if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                  board.drawCell(col + this.colPos, row + this.rowPos, WHITE_COLOR_ID);
              }
          }
      }
    }

    moveLeft () {
      this.clear();
      this.colPos--;
      this.draw();
    }

    moveRight () {
      this.clear();
      this.colPos++;
      this.draw();
    }

    moveDown () { 
      this.clear();
      this.rowPos++;
      this.draw();
    }

    rotate () {
      this.clear();
      this.activeIndex = (this.activeIndex + 1) % 4;
      this.draw();
    }
}


board = new Board(ctx);
// board.drawCell(1,1,1);
board.drawBoard();
brick = new Brick(0, 3, 3);
brick.draw();
brick.moveLeft();
brick.moveRight();
brick.moveDown();
brick.rotate();

// brick = new Brick(3, 6, 3);
// brick.draw();


console.table(board.grid);