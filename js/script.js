
function createGame() {
    
    function createGameBoard() {
        let gameBoard = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

        function show() {
            console.log("+---+---+---+");
            for(let i = 0; i < gameBoard.length - 2; i += 3) {
                console.log("| " + gameBoard[i] + " | " + gameBoard[i + 1] + " | " +  gameBoard[i + 2] + " |");
                console.log("+---+---+---+");
            }
        }
        
        return { gameBoard, show };
    }

    gameBoard = createGameBoard();

    return { gameBoard };
}

let game = createGame();

game.gameBoard.show();


