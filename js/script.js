function createGame() {
    let gameBoard = [".", ".", ".", ".", ".", ".", ".", ".", "."];
    let turnCount = 0;
    let player1Score = 0;
    let player2Score = 0;

    function display() {
        const gbElement = document.querySelector(".gameboard");
        const turnElement = document.querySelector(".turn");
        const player1Element = document.querySelector("#player1");
        const player2Element = document.querySelector("#player2");
        let gridCells = [];

        const resetButton = document.querySelector(".reset");
        resetButton.addEventListener("click", e => {
            reset();
            clear();
        });

        function refresh() {
            gridCells.forEach(element => {
                const position = element.dataset.position;
                if(gameBoard[position] !== ".")
                {
                    element.innerText = gameBoard[position];
                }
            });
        }

        function clear() {
            gbElement.innerText = "";
            turnElement.innerText = "x Turn"
            player1Element.innerText = "Player 1: " + player1Score;
            player2Element.innerText = "Player 2: " + player2Score;
            init();
        }

        function init() {
            for(let i = 0; i < 9; i++) {
                const tile = document.createElement("div");
                tile.classList.add("tile");
                tile.dataset.position = i;
                tile.addEventListener("click", e => {
                    if(!checkWin()) {
                        if(gameBoard[tile.dataset.position] === ".") {
                            play(tile.dataset.position);
                            if(turnCount % 2) {
                                turnElement.innerText = "o Turn"
                            }
                            else {
                                turnElement.innerText = "x Turn"
                            }
                            refresh();
                        }

                        if(checkWin()) {
                            if(turnCount % 2) {
                                player1Score++;
                                player1Element.innerText = "Player 1: " + player1Score;
                            }
                            else {
                                player2Score++;
                                player2Element.innerText = "Player 2: " + player2Score;
                            }
                        }
                    }
                });

                gbElement.appendChild(tile);
                gridCells.push(tile);
            }
        }

        init();
    }

    function play(position) {
        if(turnCount % 2 === 0) {
            gameBoard[position] = "x";
            console.log(`Player 1 moves on turn ${turnCount + 1}.`);
        }
        else {
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
                gameBoard[i + 1] === gameBoard[i + 2]) {
                    return true;
            }
        }

        // Columns
        for(let i = 0; i < 3; i++) {
            if(gameBoard[i] !== "." &&
                gameBoard[i + 3] !== "." &&
                gameBoard[i + 6] !== "." &&
                gameBoard[i] === gameBoard[i + 3] &&
                gameBoard[i + 3] === gameBoard[i + 6]) {
                    return true;
            }
        }

        // Diagonal top left to bottom right
        if(gameBoard[0] !== "." &&
            gameBoard[4] !== "." &&
            gameBoard[8] !== "." &&
            gameBoard[0] === gameBoard[4] &&
            gameBoard[4] === gameBoard[8]) {
                return true;
        }

        // Diagonal top right to bottom left
        if(gameBoard[2] !== "." &&
            gameBoard[4] !== "." &&
            gameBoard[6] !== "." &&
            gameBoard[2] === gameBoard[4] &&
            gameBoard[4] === gameBoard[6]) {
                return true;
        }

        return false;
    }

    function reset() {
        gameBoard = [".", ".", ".", ".", ".", ".", ".", ".", "."];
        turnCount = 0;
        player1Score = 0;
        player2Score = 0;
    }

    function run() {
        display();
    }

    return { run };
}

const game = createGame();
game.run();

