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
            console.log(`Player 1 moves on turn ${turnCount}.`);
        }
        else
        {
            gameBoard.data[position] = "o";
            console.log(`Player 2 moves on turn ${turnCount}.`);
        }

        turnCount++;
    }
    
    return { display, play };
}

let game = createGame();

game.play();
game.play();
game.play();

game.display();

