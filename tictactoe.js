let board = [];
let activePlayers = ["player1", "player2"];
let playerTurn = activePlayers[0];

const gameboardDiv = document.getElementById("gameboard");

const makeBoard = () => {
    for(let i = 0; i < 9; i++){
        let newCell = document.createElement("div");
        newCell.setAttribute("class", "cell");
        newCell.setAttribute("id", `${i}`);
        gameboardDiv.appendChild(newCell);
        board.push(makeCell(i));
        newCell.addEventListener("click", makeMove)
    };
};

const makeCell = (cellNumber) => {
    let value = "empty";
    return {value, cellNumber}
};

const makeMove = (e) => {
    const cellId = e.target.id;
    const arrId = board[cellId];

    //check if the cell is empty or the same player's cell
    if(arrId.value === "empty" || arrId.value === playerTurn){
        //fill array value with the player value
        arrId.value = playerTurn;

        //display player value on board
        e.target.innerText = `${playerTurn}`;

        //check for winner before changing turns
        checkForWin();

        //change player turn
        if(playerTurn === activePlayers[0]){
            playerTurn = activePlayers[1]
        } else {playerTurn = activePlayers[0]};

    } else {alert("Invalid move!")};
};

const checkForWin = () => {
    if((board[0].value === board[1].value && board[0].value === board[2].value && board[0].value !== "empty") || 
    (board[3].value === board[4].value && board[3].value === board[5].value && board[3].value !== "empty") || 
    (board[6].value === board[7].value && board[6].value === board[8].value && board[6].value !== "empty") || 
    (board[0].value === board[3].value && board[0].value === board[6].value && board[0].value !== "empty") || 
    (board[1].value === board[4].value && board[1].value === board[7].value && board[1].value !== "empty") || 
    (board[2].value === board[5].value && board[2].value === board[8].value && board[2].value !== "empty") || 
    (board[0].value === board[4].value && board[0].value === board[8].value && board[0].value !== "empty") || 
    (board[2].value === board[4].value && board[2].value === board[6].value && board[2].value !== "empty")
    ){alert(`${playerTurn} wins!`);
    clearBoard();
    }
};

//clear the board
const clearBoard = () => {
    board.forEach(cell => {
        cell.value = "empty"
    });

    const divList = document.getElementsByClassName("cell");
    for(let i = 0; i < divList.length; i++){
        divList[i].innerText = "";
    }
};

window.addEventListener("load", makeBoard());