function createGame() {
    let gameBoard = [".", ".", ".", ".", ".", ".", ".", ".", "."];
    let turnCount = 0;
    let player1Score = 0;
    let player2Score = 0;
    let player1Name = "Player 1";
    let player2Name = "Player 2";
    let gridCells = [];

    function showSetup() {
        document.querySelector(".name-container").style.display = "block";
        document.querySelector(".play-again").style.display = "none";
        gridCells.forEach(cell => cell.style.display = "none");
    }

    function showBoard() {
        document.querySelector(".name-container").style.display = "none";
        document.querySelector(".play-again").style.display = "none";
        gridCells.forEach(cell => cell.style.display = "block");
    }

    function showGameOver() {
        document.querySelector(".name-container").style.display = "none";
        document.querySelector(".play-again").style.display = "flex";
        gridCells.forEach(cell => cell.style.display = "none");
    }

    function display() {
        const gbElement = document.querySelector(".gameboard");
        const turnElement = document.querySelector(".turn");
        const player1Element = document.querySelector("#player1");
        const player2Element = document.querySelector("#player2");

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

            gridCells.forEach(element => {
                element.style.display = "block";
            });

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

            gridCells.forEach(cell => {
                const value = gameBoard[cell.dataset.position];
                cell.innerText = value === "." ? "" : value;
            });

            if (checkWin() || checkDraw()) {
                showGameOver();
            }
        }

        function init() {
            document.querySelector(".reset").addEventListener("click", () => {
                reset();
                showSetup();
                refresh();
            });

            document.getElementById("name-form").addEventListener("submit", e => {
                e.preventDefault();
                const p1 = document.getElementsByName("player1Name")[0];
                const p2 = document.getElementsByName("player2Name")[0];

                player1Name = p1.value || "Player 1";
                player2Name = p2.value || "Player 2";
                p1.value = "";
                p2.value = "";

                showBoard();
                refresh();
            });

            document.querySelector(".play-again button").addEventListener("click", () => {
                gameBoard = [".", ".", ".", ".", ".", ".", ".", ".", "."];
                turnCount = 0;
                showBoard();
                refresh();
            });

            for (let i = 0; i < 9; i++) {
                const tile = document.createElement("div");
                tile.classList.add("tile");
                tile.dataset.position = i;
                tile.addEventListener("click", () => {
                    play(tile.dataset.position);
                    refresh();
                });
                gbElement.appendChild(tile);
                gridCells.push(tile);
            }

            showSetup();
            refresh();
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
    }

    function run() {
        display();
    }

    return { run };
}

const game = createGame();
game.run();

