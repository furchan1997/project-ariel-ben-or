const board = document.querySelector("#board");
const width = 4;
const height = 4;
let firstUser;
let firstUserCounter = 0;
let secondUserCounter = 0;
let hasPlayMusic = false;
const firstUserScore = document.getElementById("F-User-Score");
const secondUserScore = document.getElementById("S-User-Score");
const player1 = document.getElementById("inputFirstPlayer");
const player2 = document.getElementById("inputSecondPlayer");
const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");
const message = document.getElementById("msg");
gameMode(firstUserCounter, secondUserCounter, "Welcome to 4 in a row game!");

function creatBorad() {
    // יצירת לוח המשחק + עיגול
    board.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    for (let i = 0; i < width * height; i++) {
        const div = document.createElement('div');
        div.classList.add('circle');
        board.appendChild(div);

        // יצירת איוונט לכל אירוע לחיצה, פעם לשחקן ראשון ופעם לשחקן השני
        div.addEventListener('click', () => {



            // אם הדיב מכיל את אחד מהמחלקות אז הפונקציה נעצרת
            if (div.classList.contains('first-user') || div.classList.contains('second-user')) {
                return;
            }
            // אם אין את שני השמות של השחקנים המשחק לא יכול להתחיל
            if (name1.innerHTML == "" || name2.innerHTML == "") {
                gameMode(firstUserCounter, secondUserCounter, "Please give players names in the input boxes to start the game")
                return;
            }
            if (!hasPlayMusic) {
                sound("../sound/tension tune.mp3");
                hasPlayMusic = true;
            }
            // אם המשתנה מקבל False אז הוא יקבל את הפקודות הבאות ואם הוא TRUE אז הוא יקבל את הפקודות שלו
            if (firstUser) {
                div.classList.add('first-user');
                document.querySelector(".red").classList.add("current-user");
                document.querySelector(".green").classList.remove("current-user");
                if (window.innerWidth > 640) {
                    gameMode(firstUserCounter, secondUserCounter, `It's the turn of ${name1.innerHTML} right now`);
                }
                sound("../sound/click.mp3");
                firstUser = false;
                checkWinner();


            } else {
                div.classList.add('second-user');
                document.querySelector(".red").classList.remove("current-user");
                document.querySelector(".green").classList.add("current-user");
                if (window.innerWidth > 640) {
                    gameMode(firstUserCounter, secondUserCounter, `It's the turn of ${name1.innerHTML} right now`);
                }
                sound("../sound/click.mp3");
                firstUser = true;
                checkWinner();
            }
        });
    }
    loadGameMode();
}

// פונקציה שבודקת את מצבי הניצחון
function checkWinner() {

    const divs = document.querySelectorAll("#board>div");
    // הכנסתי את כל האופציות לניצחון אל תוך מערך שמכיל מערכים של אופציות מגוונות, בעצם האופציות הן האינדקסים של הילדים של ה-BOARD 
    const options = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [0, 5, 10, 15],
        [3, 6, 9, 12],
    ];


    // לולאה שרצה על כל הDIV של ה-BOARD + לולאה שרצה על כל אופציות הניצחון
    for (const div of divs) {
        for (const op of options) {
            // הגדרת משתנים של השחקנים שניצחו יחד עם לולאה שרצה על כל הדיבים שקיבלו את המחלקות המצויינות
            let firstUserWin = op.every(index => divs[index].classList.contains("first-user"));
            let secondUserWin = op.every(index => divs[index].classList.contains("second-user"));
            // הצבת תנאי שאם אחד מהמשתנים קיים ויש בתוכו את האופציות לניצחון אז יוצג הודעת ניצחון + ניקוד

            if (firstUserWin) {
                gameMode(firstUserCounter, secondUserCounter++, `${name2.innerHTML} is the winner`);
                sound("../sound/won.mp3");
                setTimeout(() => { reGame() }, 500);
                saveGameMode();
                return;
            }
            if (secondUserWin) {
                gameMode(firstUserCounter++, secondUserCounter, `${name1.innerHTML} is the winner`);
                sound("../sound/won.mp3");
                setTimeout(() => { reGame() }, 500);
                saveGameMode();
                return;
            }
        }
    }
    let isDraw = true; // משתנה לבדיקת תיקו
    for (const div of divs) {
        if (!div.classList.contains("first-user") && !div.classList.contains("second-user")) {
            isDraw = false;
        }
    }
    if (isDraw) {
        gameMode(firstUserCounter, secondUserCounter, "It's a draw");
        setTimeout(() => { reGame() }, 1000);
        saveGameMode();
        return;
    }
}
function reGame() {
    firstUser = true;
    board.innerHTML = "";
    gameMode(firstUserCounter, secondUserCounter, "Continue the game !")
    creatBorad();
}

function playersDetails() {
    if (player1.value == "" || player2.value == "") {
        alert("יש להכניס שם לכל שחקן");
        return;
    }
    name1.innerHTML = player1.value;
    document.getElementById("btnFirstPlayer").style.display = "none";
    player1.style.display = "none";

    name2.innerHTML = player2.value;
    document.getElementById("btnSecondPlayer").style.display = "none";
    player2.style.display = "none";

    gameMode(firstUserCounter, secondUserCounter, "lets start the game !");
    saveGameMode();
}

document.getElementById("btnFirstPlayer").addEventListener("click", playersDetails);
document.getElementById("btnSecondPlayer").addEventListener("click", playersDetails);

function newGame() {
    localStorage.removeItem("firstUserCounter");
    localStorage.removeItem("secondUserCounter");
    localStorage.removeItem("name1");
    localStorage.removeItem("name2");
    player1.style.display = "block";
    player2.style.display = "block";
    firstUserCounter = 0;
    secondUserCounter = 0;
    firstUser = true;
    board.innerHTML = "";
    creatBorad();
    player1.value = "";
    player2.value = "";
    name1.innerText = "";
    name2.innerText = "";
    document.getElementById("btnFirstPlayer").style.display = "block";
    document.getElementById("btnSecondPlayer").style.display = "block";
    document.querySelector(".green").classList.remove("current-user");
    document.querySelector(".red").classList.remove("current-user");
    gameMode(firstUserCounter, secondUserCounter, "Welcome to 4 in a row game!");
}

function gameMode(firstUserCounter, secondUserCounter, message) {
    firstUserScore.innerHTML = firstUserCounter;
    secondUserScore.innerHTML = secondUserCounter;
    if (window.innerWidth < 640) {
        setTimeout(() => {
            alert(message);
        }, 500);
    } else {
        document.getElementById("content-msg").innerHTML = message;
    }
}


function sound(fileName) {
    const audio = document.createElement("audio");
    audio.src = fileName;
    audio.play();
}

function saveGameMode() {
    localStorage.setItem("firstUserCounter", firstUserCounter);
    localStorage.setItem("secondUserCounter", secondUserCounter);
    localStorage.setItem("name1", name1.innerHTML);
    localStorage.setItem("name2", name2.innerHTML);
}

function loadGameMode() {
    const firstPlayer = localStorage.getItem("firstUserCounter");
    const secondPlayer = localStorage.getItem("secondUserCounter");
    const storedName1 = localStorage.getItem("name1");
    const storedName2 = localStorage.getItem("name2");

    if (firstPlayer) {
        firstUserCounter = parseInt(firstPlayer);
        firstUserScore.innerHTML = firstPlayer;
    }
    if (secondPlayer) {
        secondUserCounter = parseInt(secondPlayer);
        secondUserScore.innerHTML = secondPlayer;
    }
    if (secondPlayer && firstPlayer) {
        gameMode(firstUserCounter, secondUserCounter, "Continue the game !");
    }
    if (storedName1) {
        name1.innerHTML = storedName1;
        if (storedName1.length > 0) {
            document.getElementById("btnFirstPlayer").style.display = "none";
            player1.style.display = 'none';
        }
    }
    if (storedName2) {
        name2.innerHTML = storedName2;
        if (storedName2.length > 0) {
            document.getElementById("btnSecondPlayer").style.display = "none";
            player2.style.display = 'none';
        }
    }
}

function roolsGame() {
    alert("כל משתתף משחיל בתורו דסקית אחת לתוך הלוח. על השחקן לנסות ליצור רצף של ארבע דסקיות בשורה, בטור או באלכסון, ובמקביל לנסות לתחום את היריב ולמנוע ממנו ליצור רצף עם הדסקיות שלו. המנצח: השחקן הראשון שהצליח ליצור רצף של 4 דסקיות בצבע זהה.");
}
