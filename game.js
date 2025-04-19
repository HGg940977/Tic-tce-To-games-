document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('[data-cell]');
    const statusMessage = document.getElementById('statusMessage');
    const restartButton = document.getElementById('restartButton');
    let isRobotTurn = true;
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    const handleCellClick = (e) => {
        const cell = e.target;
        const currentClass = isRobotTurn ? 'x' : 'o';

        if (!gameActive || cell.classList.contains('x') || cell.classList.contains('o')) {
            return;
        }

        placeMark(cell, currentClass);

        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
        }
    };

    const placeMark = (cell, currentClass) => {
        cell.classList.add(currentClass);
    };

    const swapTurns = () => {
        isRobotTurn = !isRobotTurn;
        statusMessage.textContent = isRobotTurn ? "Robot's Turn 🤖" : "Alien's Turn 👽";
    };

    const checkWin = (currentClass) => {
        return winningCombinations.some(combination => {
            const winner = combination.every(index => {
                return cells[index].classList.contains(currentClass);
            });
            if (winner) {
                combination.forEach(index => {
                    cells[index].classList.add('winning');
                });
            }
            return winner;
        });
    };

    const isDraw = () => {
        return [...cells].every(cell => {
            return cell.classList.contains('x') || cell.classList.contains('o');
        });
    };

    const endGame = (draw) => {
        gameActive = false;
        if (draw) {
            statusMessage.textContent = "It's a Draw! 🤖👽";
        } else {
            statusMessage.textContent = isRobotTurn ? 
                "Robot Wins! 🤖✨" : 
                "Alien Wins! 👽✨";
        }
    };

    const startGame = () => {
        gameActive = true;
        isRobotTurn = true;
        cells.forEach(cell => {
            cell.classList.remove('x', 'o', 'winning');
        });
        statusMessage.textContent = "Robot's Turn 🤖";
    };

    // Event Listeners
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    restartButton.addEventListener('click', startGame);

    // Initialize the game
    startGame();
});