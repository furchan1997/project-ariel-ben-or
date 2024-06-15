// הצבת משתנים גלובליים
const divs = document.querySelectorAll("#board>div");
const msg = document.getElementById("msg");
let isX = true;
let isGameOver = false;
isAlert = false;

// השמת הניקוד לאחסון המקומי
const scores = {
    x: localStorage.x ? Number(localStorage.x) : 0,
    o: localStorage.o ? Number(localStorage.o) : 0,
};

document.querySelector("#x_score").innerText = scores.x;
document.querySelector("#o_score").innerText = scores.o;

// לולאה העוברת על כל המשבצות
divs.forEach(div => {
    // הוספת פונקציה המופעלת בעת לחיצה על אחת המשבצות
    div.addEventListener("click", ev => {
        if (isGameOver) {
            return;
        }

        // האלמנט שעליו לחץ השחקן
        const elem = ev.target;

        // אם המשבצת מלאה, הפונקציה נעצרת
        if (elem.innerText) {
            return;
        }

        if (isX) {
            elem.innerText = "X";
        } else {
            elem.innerText = "O";
        }

        // שינוי תור
        isX = !isX;
        // הפעלת הפונקציה של המחווה הויזואלית
        showTurn();
        checkWinner();
    });
})

/**
 * פונקציה הנותנת מחווה של איזה שחקן התור הנוכחי
 */
function showTurn() {
    // קודם כל, הסרנו את הקלאס מהשחקן האחרון
    document.querySelector('.currentTurn').classList.remove('currentTurn');

    // שם את הקלאס בהתאם לתור השחקן
    if (isX) {
        document.querySelector("#players>div:first-child").classList.add('currentTurn');
        msg.innerHTML = "is X turn";
    } else {
        document.querySelector("#players>div:last-child").classList.add('currentTurn');
        msg.innerHTML = "is O turn";
    }
}

function checkWinner() {
    // מערך של מערכים של מיקומים אפשריים לניצחון
    const options = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // רץ על המערך של כל האופציות
    for (const op of options) {
        // בודק את המיקומים של כל מערך
        if (op.every(x => divs[x].innerText === 'X')) {
            scores.x++;
            winner(op, 'X');
            document.querySelector("#x_score").innerText = scores.x;
            break;
        } else if (op.every(x => divs[x].innerText === 'O')) {
            scores.o++;
            winner(op, 'O');
            document.querySelector("#o_score").innerText = scores.o;
            break;
        }
    }

    // במצב של תיקו
    if (!isGameOver && [...divs].every(x => x.innerText)) {
        timeOut("It's a draw and there is no winner");
        isGameOver = true;
        setTimeout(() => {
            newGame();
        }, 1000);

    }
}

// פונקציה המטפלת במצב של נצחון 
function winner(op, win) {
    // מציג את הודעת הניצחון
    timeOut(`${win} is the winner`);

    // מדגיש את המשבצות המנצחות
    op.forEach(x => divs[x].classList.add('win'));

    isGameOver = true;

    // שמירת הניקוד ב-localStorage
    localStorage.x = scores.x;
    localStorage.o = scores.o;

    // כשיש ניצחון, מאפשרים לשחקן המנצח להתחיל
    isX = !isX;
    if (window.innerWidth >= 640) {
        setTimeout(() => {
            newGame();
            timeOut("continue")
        }, 1000 * 3);
    } else {
        divs.forEach(div => {
            div.innerText = '';
            if (div.innerText.length < 0) {
                return;
            }
            div.classList.remove('win');
        });
        isGameOver = false;
    }
}

// פונקציה המטפלת בעניין של משחק חדש
function newGame() {
    divs.forEach(div => {
        div.innerText = '';
        if (div.innerText.length < 0) {
            return;
        }
        div.classList.remove('win');
    });

    if (isGameOver = false) {
        showTurn();
    } else {
        timeOut();
    }
}

// ניקוי הניקוד השמור שהצטבר
function clearscore() {
    localStorage.removeItem("x");
    localStorage.removeItem("o");
    scores.x = 0;
    scores.o = 0;
    document.querySelector("#x_score").innerText = 0;
    document.querySelector("#o_score").innerText = 0;
}

// פונקציה המטפלת בעניין הודעת מצב למשתמשים
function timeOut(msgText = "Welcome to TIC Tac Toe") {
    if (window.innerWidth >= 640) {
        setTimeout(() => {
            msg.innerText = msgText;
        }, 100);

    } else {
        msg.style.display = "none";
        setTimeout(() => {
            alert(msgText);
        }, 50);
    }
}
