function createGame() {
    let gameBoard = [".", ".", ".", ".", ".", ".", ".", ".", "."];
    let turnCount = 0;
    let player1Score = 0;
    let player2Score = 0;
    let player1Name = "Player 1";
    let player2Name = "Player 2";

    function display() {
        const gbElement = document.querySelector(".gameboard");
        const turnElement = document.querySelector(".turn");
        const player1Element = document.querySelector("#player1");
        const player2Element = document.querySelector("#player2");
        let gridCells = [];

        const resetButton = document.querySelector(".reset");
        resetButton.addEventListener("click", e => {
            reset();
            refresh();
        });

        const nameForm = document.getElementById("name-form");
        nameForm.addEventListener("submit", e => {
            e.preventDefault();
            const player1NameInput = document.getElementsByName("player1Name");
            const player2NameInput = document.getElementsByName("player2Name");

            player1Name = player1NameInput[0].value;
            player1NameInput[0].value = "";
            player2Name = player2NameInput[0].value;
            player2NameInput[0].value = "";
            const nameContainer = document.querySelector(".name-container");
            nameContainer.style.display = "none";

            refresh();
        });

        function refresh() {
            if(turnCount % 2) {
                turnElement.innerText = `${player2Name}'s turn`;
            }
            else {
                turnElement.innerText = `${player1Name}'s turn`;
            }

            player1Element.innerText = `${player1Name}: ${player1Score}`;
            player2Element.innerText = `${player2Name}: ${player2Score}`;

            gridCells.forEach(element => {
                const position = element.dataset.position;
                element.style.display = "block";
                if(gameBoard[position] !== ".") {
                    element.innerText = gameBoard[position];
                }
                else {
                    element.innerText = "";
                }
            });
            
            const playAgain = document.querySelector(".play-again");
            if(checkWin() || checkDraw()) {
                playAgain.style.display = "flex";
                gridCells.forEach(element => {
                    element.style.display = "none";
                });
            }
            else {
                playAgain.style.display = "none";
            }
        }

        function init() {
            const playAgainButton = document.querySelector(".play-again button");
            playAgainButton.addEventListener("click", e => {
                gameBoard = [".", ".", ".", ".", ".", ".", ".", ".", "."];
                turnCount = 0;
                const playAgain = document.querySelector(".play-again");
                playAgain.style.display = "none";
                refresh();
            });

            for(let i = 0; i < 9; i++) {
                const tile = document.createElement("div");
                tile.classList.add("tile");
                tile.dataset.position = i;
                tile.addEventListener("click", e => {
                    play(tile.dataset.position);
                    refresh();
                });
                
                gbElement.appendChild(tile);
                gridCells.push(tile);
            }
        }

        init();
    }

    function play(position) {
        if(!checkWin() && gameBoard[position] === ".") {
            gameBoard[position] = turnCount % 2 === 0 ? "x" : "o";
            turnCount++;

            if(checkWin()) {
                if(turnCount % 2) {
                    player1Score++;
                }
                else {
                    player2Score++;
                }
            }
        }

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

    function checkDraw() {
        return turnCount >= 9 && !checkWin();
    }

    function reset() {
        gameBoard = [".", ".", ".", ".", ".", ".", ".", ".", "."];
        turnCount = 0;
        player1Score = 0;
        player2Score = 0;
        player1Name = "Player 1";
        player2Name = "Player 2";
        const nameContainer = document.querySelector(".name-container");
        nameContainer.style.display = "block";
    }

    function run() {
        display();
    }

    return { run };
}

const game = createGame();
game.run();

