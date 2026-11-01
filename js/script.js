function createGame() {
    function createGameBoard() {
        let data = [".", ".", ".", ".", ".", ".", ".", ".", "."];
        
        return { data };
    }

    gameBoard = createGameBoard();

    let turnCount = 0;

    function display() {
        console.log("+---+---+---+");
        for(let i = 0; i < gameBoard.data.length - 2; i += 3) {
            console.log("| " + gameBoard.data[i] + " | " + gameBoard.data[i + 1] + " | " +  gameBoard.data[i + 2] + " |");
            console.log("+---+---+---+");
        }
    }

    function play() {
        let position = Math.floor(Math.random() * gameBoard.data.length);

        while(gameBoard.data[position] !== ".")
        {
            position = Math.floor(Math.random() * gameBoard.data.length);
        }
        
        if(turnCount % 2 === 0)
        {
            gameBoard.data[position] = "x";
            console.log(`Player 1 moves on turn ${turnCount + 1}.`);
        }
        else
        {
            gameBoard.data[position] = "o";
            console.log(`Player 2 moves on turn ${turnCount + 1}.`);
        }

        turnCount++;
    }

    function checkWin() {
        // Rows
        for(let i = 0; i < gameBoard.data.length - 2; i += 3) {
            if(gameBoard.data[i] !== "." &&
                gameBoard.data[i + 1] !== "." &&
                gameBoard.data[i + 2] !== "." &&
                gameBoard.data[i] === gameBoard.data[i + 1] &&
                gameBoard.data[i + 1] === gameBoard.data[i + 2]
                && gameBoard.data[i] === gameBoard.data[i + 2]) {
                    return true;
            }
        }

        // Columns
        for(let i = 0; i < 3; i++) {
            if(gameBoard.data[i] !== "." &&
                gameBoard.data[i + 3] !== "." &&
                gameBoard.data[i + 6] !== "." &&
                gameBoard.data[i] === gameBoard.data[i + 3] &&
                gameBoard.data[i + 3] === gameBoard.data[i + 6] &&
                gameBoard.data[i] === gameBoard.data[i + 6]) {
                    return true;
            }
        }

        // Diagonal top left to bottom right
        if(gameBoard.data[0] !== "." &&
            gameBoard.data[4] !== "." &&
            gameBoard.data[8] !== "." &&
            gameBoard.data[0] === gameBoard.data[4] &&
            gameBoard.data[4] === gameBoard.data[8] &&
            gameBoard.data[0] === gameBoard.data[8]) {
                return true;
        }

        // Diagonal top right to bottom left
        if(gameBoard.data[2] !== "." &&
            gameBoard.data[4] !== "." &&
            gameBoard.data[6] !== "." &&
            gameBoard.data[2] === gameBoard.data[4] &&
            gameBoard.data[4] === gameBoard.data[6] &&
            gameBoard.data[2] === gameBoard.data[6]) {
                return true;
        }

        return false;
    }
    
    return { display, play, checkWin };
}

let game = createGame();



function playGame() {
    for(let i = 0; i < 9; i++) {
        game.play();
        
        if(game.checkWin()) {
            console.log("Winner achieved");
            game.display();
            return;
        }
    }

    console.log("No winner");
    game.display();
}

playGame();

