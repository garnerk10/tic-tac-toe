const board = [];
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

        //change player turn
        if(playerTurn === activePlayers[0]){
            playerTurn = activePlayers[1]
        } else {playerTurn = activePlayers[0]}
    } else {alert("Invalid move!")}
}

window.addEventListener("load", makeBoard());