const gameBoard = (() => {
    //board layout
    let rows = 3;
    let columns = 3;
    let board = [];

    //fill board array with cells
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            board.push(cell())
        }
    };

    //generate board on DOM
    const generateBoard = () => {
        for(let i = 0; i < board.length; i++){
        const boardDiv = document.getElementById("gameboard");
        const newCell = document.createElement("div")
        newCell.setAttribute("class", "cell");
        boardDiv.appendChild(newCell)
        }
    };

    const getBoard = () => board;

    return{board, getBoard, generateBoard}
})();


//create cells
const cell = () => {
    let value = 0;

    //only mark the cell with player value if cell is empty
    const  markCell = player => {
        if(value === 0){
            value = playerTurn.number;
        }
    };

    const getValue = () => value;

    return {markCell, getValue};
};


const gameFlow = (() => {
    
    const firstPlayer = makePlayer("Player 1", 1);
    const secondPlayer = makePlayer("Player 2", 2);

    let activePlayers = [firstPlayer, secondPlayer]

    let playerTurn = activePlayers[0];

    const changeTurn = playerTurn === activePlayers[0] ? activePlayers[1] : activePlayers[0];
    return{firstPlayer, secondPlayer, activePlayers, playerTurn}
})();

const makePlayer = (name, number) => {
    return {name, number}
};
gameBoard.generateBoard();