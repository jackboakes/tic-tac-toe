function createGame() {
    let gameBoard = [".", ".", ".", ".", ".", ".", ".", ".", "."];
    let turnCount = 0;

    function display() {
        gridCells = [...document.querySelectorAll(".gameboard > *")];

        gridCells.forEach(element => {
            const position = element.dataset.position;
            if(gameBoard[position] !== ".")
            {
                element.innerText = gameBoard[position];
            }
        });
    }

    function play() {
        let position = Math.floor(Math.random() * gameBoard.length);

        while(gameBoard[position] !== ".")
        {
            position = Math.floor(Math.random() * gameBoard.length);
        }
        
        if(turnCount % 2 === 0)
        {
            gameBoard[position] = "x";
            console.log(`Player 1 moves on turn ${turnCount + 1}.`);
        }
        else
        {
            gameBoard[position] = "o";
            console.log(`Player 2 moves on turn ${turnCount + 1}.`);
        }

        turnCount++;
    }

    function checkWin() {
        // Rows
        for(let i = 0; i < gameBoard.length - 2; i += 3) {
            if(gameBoard[i] !== "." &&
                gameBoard[i + 1] !== "." &&
                gameBoard[i + 2] !== "." &&
                gameBoard[i] === gameBoard[i + 1] &&
                gameBoard[i + 1] === gameBoard[i + 2]
                && gameBoard[i] === gameBoard[i + 2]) {
                    return true;
            }
        }

        // Columns
        for(let i = 0; i < 3; i++) {
            if(gameBoard[i] !== "." &&
                gameBoard[i + 3] !== "." &&
                gameBoard[i + 6] !== "." &&
                gameBoard[i] === gameBoard[i + 3] &&
                gameBoard[i + 3] === gameBoard[i + 6] &&
                gameBoard[i] === gameBoard[i + 6]) {
                    return true;
            }
        }

        // Diagonal top left to bottom right
        if(gameBoard[0] !== "." &&
            gameBoard[4] !== "." &&
            gameBoard[8] !== "." &&
            gameBoard[0] === gameBoard[4] &&
            gameBoard[4] === gameBoard[8] &&
            gameBoard[0] === gameBoard[8]) {
                return true;
        }

        // Diagonal top right to bottom left
        if(gameBoard[2] !== "." &&
            gameBoard[4] !== "." &&
            gameBoard[6] !== "." &&
            gameBoard[2] === gameBoard[4] &&
            gameBoard[4] === gameBoard[6] &&
            gameBoard[2] === gameBoard[6]) {
                return true;
        }

        return false;
    }

    function run() {
        for(let i = 0; i < 9; i++) {
            play();
        
            if(checkWin()) {
                console.log("Winner achieved");
                display();
                return;
            }
        }

        console.log("No winner");
        display();
    }

    return { run };
}

let game = createGame();
game.run();

