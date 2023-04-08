// declare all variables
const rowCount = 6;
const columnCount = 3;

let currentPlayer = "Player1";
let gameEnded = false;
let gameBoard = [];

const message = document.getElementById("message");
const resetButtonElement = document.getElementById("reset-button");
const gameBoardElement = document.getElementById("game-board");

//create game board with 6 rows and 3 columns
function creeateBoard() {
  for (let i = 0; i < rowCount; i++) {
    gameBoard.push([]);
    for (let j = 0; j < columnCount; j++) {
      gameBoard[i].push(null);
    }
  }
}
// create row and cell elements
function createCells() {
  for (let i = 0; i < rowCount; i++) {
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");
    for (let j = 0; j < columnCount; j++) {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      cellElement.dataset.columnIndex = j;
      cellElement.dataset.rowIndex = i;
      rowElement.appendChild(cellElement);
    }
    gameBoardElement.appendChild(rowElement);
  }
}

//check game status and updates accordingly
function gameStatus(columnIndex) {
  //check if game ended
  if (!gameEnded) {
    //start filling from the bottom row
    for (let i = rowCount - 1; i >= 0; i--) {
      if (gameBoard[i][columnIndex] === null) {
        //if the cell is empty, set cell to currentPlayer
        gameBoard[i][columnIndex] = currentPlayer;
        const cellElement = document.querySelector(
          `[data-row-index="${i}"][data-column-index="${columnIndex}"]`
        );
        //add CSS classes of 'currentPlayer' and 'fall'
        cellElement.classList.add(currentPlayer);
        cellElement.classList.add("fall");
        break;
      }
    }
    //check if game has ended
    checkGameEnd();
    //switch to the other player
    switchPlayer();
  }
  
}

function switchPlayer() {
  //if currentPlayer is Player1 switch to Player2 else switch back to Player1
  currentPlayer = currentPlayer === "Player1" ? "Player2" : "Player1";
}

function checkGameEnd() {
  //if game is won by one of the players
  if (checkHorizontalWin() || checkVerticalWin() || checkDiagonalWin()) {
    gameEnded = true;
    //stores the currentPlayer in the variable player
    let player = currentPlayer;
    //gives 0.5secs at the end of the game before showing congratulatory message
    setTimeout(function(){
      //the game board should be hidden only the message and reset button shows
      hideBoard();
      showMessage("Congratulations," + player + " wins!");
      showResetButton();
    }, 500);
    
  } else if (checkTie()) {
    //if there are no winners just a Draw
    gameEnded = true;
    setTimeout(function(){
      hideBoard();
      showMessage("It's a Draw!");
      showResetButton();
    }, 500);
  }
}
//checks for a win horizontally
function checkHorizontalWin() {
  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j <= columnCount - 3; j++) {
      if (
        gameBoard[i][j] &&
        gameBoard[i][j] === gameBoard[i][j + 1] &&
        gameBoard[i][j] === gameBoard[i][j + 2]
      ) {
        return true;
      }
    }
  }
  return false;
}
//checks for a vertical win
function checkVerticalWin() {
  for (let i = 0; i <= rowCount - 3; i++) {
    for (let j = 0; j < columnCount; j++) {
      if (
        gameBoard[i][j] &&
        gameBoard[i][j] === gameBoard[i + 1][j] &&
        gameBoard[i][j] === gameBoard[i + 2][j]
      ) {
        return true;
      }
    }
  }
  return false;
}
//checks for diagonal wins
function checkDiagonalWin() {
  for (let i = 0; i <= rowCount - 3; i++) {
    for (let j = 0; j <= columnCount - 3; j++) {
      if (
        gameBoard[i][j] &&
        gameBoard[i][j] === gameBoard[i + 1][j + 1] &&
        gameBoard[i][j] === gameBoard[i + 2][j + 2]
      ) {
        return true;
    } else if (
        gameBoard[i][j + 2] &&
        gameBoard[i][j + 2] === gameBoard[i + 1][j + 1] &&
        gameBoard[i][j + 2] === gameBoard[i + 2][j]
      ) {
        return true;
      }
    }
  }
  return false;
}
// checks for a draw
function checkTie() {
  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < columnCount; j++) {
      if (gameBoard[i][j] === null) {
        return false;
      }
    }
  }
  return true;
}
//cell clicks during gameplay
function handleCellClick(event) {
  if (!gameEnded) {
    const columnIndex = event.target.dataset.columnIndex;
    gameStatus(columnIndex);
  }
}
//reload page when reset button is clicked
function handleResetButtonClick() {
  location.reload();
}
//set message display to block
function showMessage(text){
  message.innerHTML = text;
  message.style.display = "block";
}
//set resetbutton display to block
function showResetButton() {
  resetButtonElement.style.display = "block";
}
//set board display to none
function hideBoard() {
  const board = document.getElementById("game-board");
  board.style.display = "none";
}

//create game board, rows and cells
creeateBoard();
createCells();
//listens for cell clicks
gameBoardElement.addEventListener("click", handleCellClick);
//listens for reset button click
resetButtonElement.addEventListener("click", handleResetButtonClick);