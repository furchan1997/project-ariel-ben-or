const board = document.querySelector('#board');
const width = window.screen.width < 640 ? 20 : 40;
const height = 40;
const snake = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const divs = [];
let direction = 'left';
let isGameOver = false;
let random;
let score = 0;
let maxScore = 0;
let record;
let myInterval;
const msg = document.querySelector("#msg");
const recordRes = document.getElementById("record");
const difficulty = document.getElementById("difficulty");

function createBoard() {
    board.style.gridTemplateColumns = `repeat(${width}, 1fr)`;

    for (let i = 0; i < width * height; i++) {
        const div = document.createElement('div');
        board.appendChild(div);
        divs.push(div);
    }

    recordRes.innerHTML = `השיא שלך הינו: ${record} נקודות`

    color();
    setApple();
    loadRecord();
}

function color() {
    divs.forEach(div => {
        div.classList.remove('snake');
        div.classList.remove('head');
    });
    snake.forEach((x, i) => {
        divs[x].classList.add('snake');
        if (i === 0) {
            divs[x].classList.add('head');
        }
    });
}

function move(dir) {
    if (isGameOver) {
        return;
    }

    let head = snake[0];

    if (dir === 'up') {
        if (direction === 'down') {
            return;
        }
        head -= width;
        if (head < 0) {
            gameOver();
            return;
        }
    } else if (dir === 'down') {
        if (direction === 'up') {
            return;
        }
        head += width;
        if (head >= width * height) {
            gameOver();
            return;
        }
    } else if (dir === 'left') {
        if (direction === 'right') {
            return;
        }
        head++;
        if (head % width === 0) {
            gameOver();
            return;
        }
    } else if (dir === 'right') {
        if (direction === 'left') {
            return;
        }
        if (head % width === 0) {
            gameOver();
            return;
        }
        head--;
    }

    if (snake.includes(head)) {
        gameOver();
        return;
    }
    direction = dir;
    snake.unshift(head);

    if (head === random) {
        setApple();
        if (difficulty.value === "easy") {
            score += 10
        }
        if (difficulty.value === "medium") {
            score += 20
        }
        if (difficulty.value === "hard") {
            score += 30
        }
        // score += 10;
        document.querySelector("#score").innerText = score;
        saveRecord()
        sound("../sound/click.mp3");

    } else {
        snake.pop();
    }

    color();
    autoMove();
}

function getSpeed() {
    if (difficulty.value === "easy") return 300;
    if (difficulty.value === "medium") return 200;
    if (difficulty.value === "hard") return 100;
}

function autoMove() {
    clearInterval(myInterval);
    let speed = getSpeed() - score;
    difficulty.style.display = "none";
    myInterval = setInterval(() => move(direction), speed > 50 ? speed : 50);

    if (score === 400) {
        document.querySelector("#newGame").style.display = "initial";
        isGameOver = true;
        snake.splice(0, snake.length);
        snake.push(9, 8, 7, 6, 5, 4, 3, 2, 1, 0);
        clearInterval(myInterval);
        msg.style.display = "block";
        msg.innerText = "well done";
    }
}

document.getElementById('difficulty').addEventListener('change', () => {
    if (!isGameOver) {
        autoMove();
    }
});

function gameOver() {
    isGameOver = true;
    clearInterval(myInterval);
    sound("../sound/lose.mp3");
    console.log(sound);
    document.querySelector("#newGame").style.display = "initial";
    setTimeout(() => alert('game over'), 500);
    recordRes.innerHTML = `השיא שלך הינו: ${record} נקודות`
    difficulty.style.display = "block";


}

function setApple() {
    do {
        random = Math.floor(Math.random() * width * height);
    } while (snake.includes(random));
    divs.forEach(d => d.classList.remove('apple'));
    divs[random].classList.add('apple');
}

function sound(fileName) {
    const audio = document.createElement('audio');
    audio.src = fileName;
    audio.play();
}

function newGame() {
    snake.splice(0, snake.length);
    snake.push(9, 8, 7, 6, 5, 4, 3, 2, 1, 0);
    isGameOver = false;
    score = 0;
    color();
    setApple();
    loadRecord();
    msg.style.display = "none";
    document.querySelector("#newGame").style.display = "none";
    document.querySelector("#score").innerText = score;
}

function saveRecord() {
    if (score > maxScore) {
        maxScore = score;
    }
    localStorage.setItem('maxScoreOfGame', maxScore);
}

function loadRecord() {
    record = localStorage.getItem('maxScoreOfGame');
    if (record) {
        maxScore = Number(record);
    }
    if (record === null || record === undefined) {
        record = 0;
    }
    recordRes.innerHTML = `השיא שלך הינו: ${record} נקודות`
}

function clearRecord() {
    localStorage.removeItem('maxScoreOfGame');
    record = 0;
    recordRes.innerHTML = `השיא שלך הינו: ${record} נקודות`
}

window.addEventListener('keydown', ev => {
    ev.preventDefault();

    switch (ev.key) {
        case "ArrowUp": move('up'); break;
        case "ArrowDown": move('down'); break;
        case "ArrowRight": move('right'); break;
        case "ArrowLeft": move('left'); break;
        case "Escape": clearInterval(myInterval); break;
        case "Enter": newGame(); break;
    }
});

document.getElementById('right').addEventListener("click", () => {
    move('right');
});

document.getElementById('left').addEventListener("click", () => {
    move('left');
});

document.getElementById('up').addEventListener("click", () => {
    move('up');
});

document.getElementById('down').addEventListener("click", () => {
    move('down');
});

document.getElementById('stop').addEventListener("click", () => {
    clearInterval(myInterval);
});