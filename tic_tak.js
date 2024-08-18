const board=document.getElementById('board');
const cells=Array.from(board.getElementsByClassName('cell'));
const resetButton=document.getElementById('reset');

let currentPlayer='X';
let gameActive=true;
const boardState=Array(9).fill(null);

const winningCombinations=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function checkWinner(){
    for (const combo of winningCombinations) {
        const [a,b,c]=combo;
        if (boardState[a] && boardState[a]==boardState[b] && boardState[a]==boardState[c]) {
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            alert(`${currentPlayer} wins!`);
            gameActive=false;
            return;
        }
    }
    if (!boardState.includes(null)){
        alert("It's a draw!");
        gameActive=false;
    }
}

function handleClick(event){
    const cell=event.target;
    const index=Number(cell.getAttribute('data-index'));

    if(!gameActive||boardState[index])return;

    boardState[index]=currentPlayer;
    cell.textContent=currentPlayer;
    cell.classList.add(currentPlayer);

    checkWinner();

    if(gameActive){
        currentPlayer=currentPlayer=='X'?'O':'X';
    }
}

function resetGame(){
    boardState.fill(null);
    cells.forEach(cell=>{
        cell.textContent='';
        cell.classList.remove('X','O','winner');
    });
    currentPlayer='X';
    gameActive=true;
}

cells.forEach(cell=>cell.addEventListener('click',handleClick));
resetButton.addEventListener('click',resetGame);
