let turn = "X";
let win = false;
let moves = 0; 

const jsConfetti = new JSConfetti();

let cells = document.getElementsByClassName('cell');

Array.from(cells).forEach(element => {
    let celltext = element.querySelector('.celltext');
    element.addEventListener('click', () => {
        console.log("Clicked!");
        if (!win && celltext.innerText === '') {
            celltext.innerText = turn;
            turn = update();
            winnerWinnerChickenDinner();
            moves++; 
            if (!win) {
                document.getElementsByClassName("chance")[0].innerText = "Turn for " + turn;
                if (moves === 9) {
                    
                    document.querySelector('.chance').innerText = "It's a Tie!";
                    document.querySelector('.chance').style.color = 'yellow';
                    win = true;
                }
            }
        }
    });
});

const resetBtn = document.getElementById('reset');

resetBtn.addEventListener('click', () => {
    let cellTexts = document.querySelectorAll('.celltext');
    cellTexts.forEach(e => {
        e.innerText = '';
    });

    turn = "X";
    document.getElementsByClassName("chance")[0].innerText = "It's turn for X!";
    document.querySelector('.chance').style.color = 'white';
    win = false;
    moves = 0; 
});

function update() {
    return turn === "X" ? "O" : "X";
}

function winnerWinnerChickenDinner() {
    let celltext = document.getElementsByClassName("celltext");
    let winners = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    winners.forEach(combination => {
        const [a, b, c] = combination;
        if (
            celltext[a].innerText !== '' &&
            celltext[a].innerText === celltext[b].innerText &&
            celltext[a].innerText === celltext[c].innerText
        ) {
            document.querySelector('.chance').innerText = celltext[a].innerText + " is the Winner! 🥳";
            document.querySelector('.chance').style.color = 'red';
            win = true;
            jsConfetti.addConfetti();
        }
    });
}