const gameboardDiv = document.getElementById("gameboard");
const roundCounter = document.getElementById("round");
const turnDisplay = document.getElementById("playerTurn");
const p1Name = document.getElementById("p1name");
const p2Name = document.getElementById("p2name");
const p1Wins = document.getElementById("OneWins");
const p2Wins = document.getElementById("TwoWins");

//gameboard module
const gameboard = (() => {

    let board = [];

    const makeBoard = () => {
        for(let i = 0; i < 9; i++){
            let newCell = document.createElement("div");
            newCell.setAttribute("class", "cell");
            newCell.setAttribute("id", `${i}`);
            gameboardDiv.appendChild(newCell);
            board.push(makeCell(i));
            newCell.addEventListener("click", gameFlow.makeMove)
        };
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

    return{makeBoard, board, clearBoard};
})();


const makeCell = (cellNumber) => {
    let value = "empty";
    return {value, cellNumber}
};


//gameflow module
const gameFlow = (() =>{

    let turnCounter = 0;
    let round = 1;
    let board = gameboard.board;
    let activePlayers = [];
    let playerTurn = 0;

    const makeMove = (e) => {
        const cellId = e.target.id;
        const arrId = gameboard.board[cellId];

        //check if the cell is empty or the same player's cell
        if(arrId.value === "empty" || arrId.value === activePlayers[playerTurn].symbol){

            turnCounter++

            //fill array value with the player value
            arrId.value = activePlayers[playerTurn].symbol;

            //display player value on board
            //e.target.innerText = `${activePlayers[playerTurn].symbol}`;
            const newCellP = document.createElement("p");
            newCellP.setAttribute("class", "cellText");
            newCellP.innerText = `${activePlayers[playerTurn].symbol}`;
            e.target.appendChild(newCellP);

            //check for winner before changing turns
            checkForWin();

            //change player turn
            if(playerTurn === 0){
                playerTurn = 1;
                turnDisplay.innerText = `Turn: ${activePlayers[1].name}`
            } else {
                playerTurn = 0;
                turnDisplay.innerText = `Turn: ${activePlayers[0].name}`
            };

        } else {alert("Invalid move!")};
    };

    //win conditions
    const checkForWin = () => {
        if((board[0].value === board[1].value && board[0].value === board[2].value && board[0].value !== "empty") || 
        (board[3].value === board[4].value && board[3].value === board[5].value && board[3].value !== "empty") || 
        (board[6].value === board[7].value && board[6].value === board[8].value && board[6].value !== "empty") || 
        (board[0].value === board[3].value && board[0].value === board[6].value && board[0].value !== "empty") || 
        (board[1].value === board[4].value && board[1].value === board[7].value && board[1].value !== "empty") || 
        (board[2].value === board[5].value && board[2].value === board[8].value && board[2].value !== "empty") || 
        (board[0].value === board[4].value && board[0].value === board[8].value && board[0].value !== "empty") || 
        (board[2].value === board[4].value && board[2].value === board[6].value && board[2].value !== "empty")
        ){
            alert(`${activePlayers[playerTurn].name} wins!`);
            gameboard.clearBoard();

            activePlayers[playerTurn].wins++;

            //display wins
            p1Wins.innerText = `${activePlayers[0].wins}`;
            p2Wins.innerText = `${activePlayers[1].wins}`;

            //change then round display
            round++;
            roundCounter.innerText = `Round ${round}`;
            turnCounter = 0;

        }
        else if(turnCounter === 9){
            alert("It's a draw!");
            gameboard.clearBoard();
            round++;
            roundCounter.innerText = `Round ${round}`;
            turnCounter = 0;
        }
    };

    const setupGame = () => {
        const playerOneName = document.getElementById("player1").value;
        const playerTwoName = document.getElementById("player2").value;
    
        activePlayers.push(makePlayer(playerOneName, "X"), makePlayer(playerTwoName, "O"));
    
        p1Name.innerText = `${playerOneName}`;
        p2Name.innerText = `${playerTwoName}`;
    
        //hide player input and show gameboard
        gameboardDiv.style.display = "grid";
        document.getElementById("playerForm").style.display = "none";
        playerTurn = 0;
        turnDisplay.innerText = `Turn: ${activePlayers[playerTurn].name}`
    };

    return{activePlayers, playerTurn, makeMove, setupGame, checkForWin}
})();

const makePlayer = (name, symbol) => {
    let wins = 0;
    return {name, symbol, wins}
};

window.addEventListener("load", gameboard.makeBoard);