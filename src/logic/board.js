import { winCombinations } from "../constants";

export const checkWinner = (boardToCheck) => {
	for (const combination of winCombinations) {
		const [a, b, c] = combination;
		if (
			boardToCheck[a] &&
			boardToCheck[a] == boardToCheck[b] &&
			boardToCheck[a] == boardToCheck[c]
		) {
			return boardToCheck[a];
		}
	}
	return null;
};

export const checkEndGame = (newBoard) => {
	return newBoard.every((square) => square != null);
};
