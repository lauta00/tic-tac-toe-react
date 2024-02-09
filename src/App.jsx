import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { turns } from "./constants.js";
import { checkWinner, checkEndGame } from "./logic/board.js";
import { Winner } from "./components/Winner.jsx";

function App() {
	const [board, setBoard] = useState(Array(9).fill(null));
	const [turn, setTurn] = useState(turns.X);
	const [winner, setWinner] = useState(null);

	const resetGame = () => {
		setBoard(Array(9).fill(null));
		setTurn(turns.X);
		setWinner(null);
	};

	const updateBoard = (index) => {
		if (board[index] || winner) return;

		const newBoard = [...board];
		newBoard[index] = turn;
		setBoard(newBoard);

		const newTurn = turn == turns.X ? turns.O : turns.X;
		setTurn(newTurn);

		const newWinner = checkWinner(newBoard);
		if (newWinner) {
			confetti();
			setWinner(newWinner);
		} else if (checkEndGame(newBoard)) {
			setWinner(false);
		}
	};

	return (
		<main className="board">
			<h1> Tic Tac Toe </h1>
			<button onClick={resetGame}>Reset Game</button>
			<section className="game">
				{board.map((square, index) => {
					return (
						<Square key={index} index={index} updateBoard={updateBoard}>
							{square}
						</Square>
					);
				})}
			</section>

			<section className="turn">
				<Square isSelected={turn == turns.X}>{turns.X}</Square>
				<Square isSelected={turn == turns.O}>{turns.O}</Square>
			</section>

			<Winner resetGame={resetGame} winner={winner}></Winner>
		</main>
	);
}

export default App;
