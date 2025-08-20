let rowNumber = 3;
let playTime = 0;
let playerRole = 1;
let computerRole = 2;
let grid = [];

function newGame(){
    const modalResult = document.getElementById("modal-result");
    modalResult.style.display = "none";
    
    const modalNewGame = document.getElementById("modal");
    modalNewGame.style.display = "flex";

    const error = document.getElementById("error");
    error.textContent = "";
}

function updateSize(newSize){
    const previousSizeButton = document.getElementById(rowNumber);
    previousSizeButton.classList.remove("selected");
    rowNumber = newSize;
    const newSizeButton = document.getElementById(rowNumber);
    newSizeButton.classList.add("selected");
}

function generateCells(role){
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    grid = Array(rowNumber).fill().map(() => Array(rowNumber).fill(0));
    const gridElement = document.getElementById("grid");
    gridElement.innerHTML = "";
    playTime = 0;
    playerRole = role;
    computerRole = role === 1 ? 2 : 1;
    for(let i = 0; i < rowNumber; i++){
        const row = document.createElement("div");
        row.classList.add("row");
        for(let j = 0; j < rowNumber; j++){
            const cell = document.createElement("div");
            cell.addEventListener("click", () => {
                updateCell(i, j, cell, 1);
            })
            cell.classList.add("cell");
            row.appendChild(cell);
        }
        gridElement.appendChild(row);
    }
}

function updateCell(row, col, cell, player){
    if(grid[row][col] === 0) {
        if(playTime % 2 === 0 || player === 2) {
            const role = player === 1 ? playerRole : computerRole;
            grid[row][col] = role;
            const cellText = document.createElement("p");
            cellText.classList.add("pion");
            cellText.textContent = role === 1 ? "X" : "O";
            cell.appendChild(cellText);
            const error = document.getElementById("error");
            error.textContent = "";
            playTime++;
            
            const isWin = checkWin();
            if(isWin) {
                const modalResult = document.getElementById("modal-result");
                modalResult.style.display = "flex";
                const messageEndgame = document.getElementById("message-endgame");
                messageEndgame.textContent = `Les ${isWin === 1 ? 'X' : 'O'} ont gagné la partie`;
            }else if(playTime === rowNumber * rowNumber) {
                const modalResult = document.getElementById("modal-result");
                modalResult.style.display = "flex";
                const messageEndgame = document.getElementById("message-endgame");
                messageEndgame.textContent = "Egalité";
            }else if(player === 1){
                randomPlayer();
            }
        }else{
            const error = document.getElementById("error");
            error.textContent = "Ce n'est pas à votre tour";
        }
    }else{
        const error = document.getElementById("error");
        error.textContent = "Cette cellule est déjà remplie";
    }
}

function randomPlayer() {
    let emptyCells = [];
    for (let i = 0; i < rowNumber; i++) {
        for (let j = 0; j < rowNumber; j++) {
            if (grid[i][j] === 0) {
                emptyCells.push({row: i, col: j});
            }
        }
    }

    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const {row, col} = emptyCells[randomIndex];
        const cell = document.querySelectorAll(".row")[row].children[col];
        updateCell(row, col, cell, 2);
    }
}

function checkWin(){
    //Check row win
    for(let i = 0; i < rowNumber; i++){
        let number = grid[i][0];
        for(let j = 1; j < rowNumber; j++){
            if(grid[i][j] !== number){
                break;
            }
            if(j === rowNumber - 1){
                return number;
            }
        }
    }
    
    //Check column win
    for(let i = 0; i < rowNumber; i++){
        let number = grid[0][i];
        for(let j = 1; j < rowNumber; j++){
            if(grid[j][i] !== number){
                break;
            }
            if(j === rowNumber - 1){
                return number;
            }
        }
    }

    //Check diagonal 1 win
    const number1 = grid[0][0];
    for(let i = 1; i < rowNumber; i++){
        if(grid[i][i] !== number1){
            break;
        }
        if(i === rowNumber - 1){
            return number1;
        }
    }
    
    //Check diagonal 2 win
    const number2 = grid[0][rowNumber - 1];
    for(let i = 0; i < rowNumber; i++){
        if (grid[i][(rowNumber - 1) - i] !== number2) {
            break;
        }
        if (i === rowNumber - 1) {
            return number2;
        }
    }
    
    return false;
}

newGame();