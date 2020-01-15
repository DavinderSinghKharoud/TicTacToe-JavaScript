var origBoard;
const huPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[6, 4, 2]

]

//It will select each element in html file which has class name as "cell".
var cells = document.querySelectorAll('.cell');

startGame();

function startGame(){
	document.querySelector(".endgame").style.display = "none";

	//Creating array up to number 9
	origBoard = Array.from(Array(9).keys());

	for(var i = 0; i<cells.length; i++){

			cells[i].innerText = "";
			cells[i].style.removeProperty('background-color');
			cells[i].addEventListener('click',turnclick, false);
	}

}

function turnclick(square){
	turn(square.target.id, huPlayer);
	console.log(square.target.id)
}

function turn(squareId, player){

	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;

	let gameWon = checkWin(origBoard, player);

	if(gameWon) gameOver(gameWon);
}

function checkWin( board, player){

	let plays = board.reduce( (a,e,i) =>
		(e == player) ? a.concat(i):a,[] );

	console.log(plays)
	let gameWon = null;

	for(let [index, win] of winCombos.entries()){

		if(win.every (elem => plays.indexOf(elem) > -1)){

			gameWon = {index: index, player: player};
			break;
		}
	}
}