// יצירת משתנים גלובליים לפיתוח המשחק
const board = document.querySelector('#board');
// הגדרת רוחב של הלוח + הגדרת רוחב למסכי מובייל
const width = window.screen.width < 640 ? 20 : 40;
// הגדרת גובה של הלוח
const height = 40;
// יצירת מערך אשר יגדיר לנו את מיקומי הנחש
const snake = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const divs = [];
// השמת הכיוון הדיפולטיבי למשתנה
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

// פונקציה שנועדה ליצירת הלוח
function createBoard() {
    // עימוד הלוח ב - DOM
    board.style.gridTemplateColumns = `repeat(${width}, 1fr)`;

    //יצירת לולאה שעוברת על כל התאים של הלוח + יצירת דיב חדש בכל איטרציה
    for (let i = 0; i < width * height; i++) {
        const div = document.createElement('div');
        board.appendChild(div);
        divs.push(div);
    }
    // הצגת השיא כאשר האתר טעון
    recordRes.innerHTML = `השיא שלך הינו: ${record} נקודות`

    color();
    setApple();
    loadRecord();
}

// פונקציה האחראית על עיצוב הנחש
function color() {
    // לולאה העוברת על כל הדיבים של הלוח ומסירה את המחלקות
    divs.forEach(div => {
        div.classList.remove('snake');
        div.classList.remove('head');
    });
    // לולאה הרצה על מערך הנחש ומוסיפה לו את המחלקה 
    snake.forEach((x, i) => {
        divs[x].classList.add('snake');
        // הוספת המחלקה שאחראית לטיפול עיצוב ראש הנחש
        if (i === 0) {
            divs[x].classList.add('head');
        }
    });
}

// פונקציה האחראית לטפל בכל נושא תזוזת הנחש על הלוח(שינויי מיקום האיברים שבמערך הנחש לפי הקשה על החצים של המיקלדת)
function move(dir) {
    // אם המשחק נגמר אז הפונקציה הזו נעצרת
    if (isGameOver) {
        return;
    }

    // השמת ראש הנחש למשתנה
    let head = snake[0];

    // אם כייון הלחיצה של הוא למעלה לא ניתן למטה
    if (dir === 'up') {
        if (direction === 'down') {
            // עצירת הפונקציה במידה והתנאי מתקיים
            return;
        }
        // פעולה זו מזיזה את ראש הנחש לשורה אחת למעלה במבנה הלוח 
        head -= width;
        // טיפול בגבולות מעליי הלוח (אם ראש קטן מ-0 המשחק נגמר)
        if (head < 0) {
            gameOver();
            return;
        }
        // אם כייון הלחיצה של הוא למטה לא ניתן למעלה
    } else if (dir === 'down') {
        if (direction === 'up') {
            // עצירת הפונקציה במידה והתנאי מתקיים
            return;
        }
        // פעולה זו מזיזה את ראש הנחש לשורה אחת למטה במבנה הלוח 
        head += width;
        // בדיקת גבולות תחתית הלוח
        if (head >= width * height) {
            gameOver();
            // עצירת הפונקציה במידה והתנאי מתקיים
            return;
        }
        // אם כייון הלחיצה של הוא לצד השמאלי לא ניתן יהיה לפנות ימינה
    } else if (dir === 'left') {
        if (direction === 'right') {
            // עצירת הפונקציה במידה והתנאי מתקיים
            return;
        }
        // קידום ראש הנחש ב-1
        head++;
        // אם ראש הנחש מתחלק בגובה הלוח אז הפונקציה נעצרת (בדיקת גבולות של הצד השמאלי של הלוח)
        if (head % width === 0) {
            gameOver();
            return;
        }
        // אם כייון הלחיצה הוא ימין אז לא יהיה ניתן לפנות שמאלה
    } else if (dir === 'right') {
        if (direction === 'left') {
            return;
        }
        // אם ראש הנחש מתחלק בגובה הלוח אז הפונקציה נעצרת (בדיקת גבולות של הצד הימני של הלוח)
        if (head % width === 0) {
            gameOver();
            return;
        }
        // החסרה של ראש המשתנה ב-1 (ההחסרה מתבצעת אחריי הבדיקה כייון שבמיקרה הזה צריך קודם לבדוק ואז להזיז את ראש הנחש)
        head--;
    }

    // בדיקה האם משתנה של ראש הנחש מצביע לתא שבו כבר נמצא חלק מהנחש, 
    if (snake.includes(head)) {
        // אם התנאי מתקיים אז הפונקציה נעצרת והמשחק נגמר
        gameOver();
        return;
    }
    direction = dir;
    // הוספת הראש למערך הנחש
    snake.unshift(head);

    // אם הראש שווה למשתנה אשר מייצג את מיקום התפוח על הלוח אז התנאי התקיים יהיו הפעולות הבאות
    if (head === random) {
        setApple();
        // טיפול בניקוד לפי מצביי הקושי
        if (difficulty.value === "easy") {
            score += 10
        }
        if (difficulty.value === "medium") {
            score += 20
        }
        if (difficulty.value === "hard") {
            score += 30
        }
        // ההצגה הויזואלית של הניקוד
        document.querySelector("#score").innerText = score;
        saveRecord()
        sound("../sound/click.mp3");

        // משמש לטיפול בתנועת הנחש ובסיטואציות שבהן הנחש אינו אוכל את התפוח
    } else {
        snake.pop();
    }

    color();
    autoMove();
}

// טיפול בעניין המהירות של הנחש לפי לדרגת הקושי
function getSpeed() {
    if (difficulty.value === "easy") return 300;
    if (difficulty.value === "medium") return 200;
    if (difficulty.value === "hard") return 100;
}

//פונקציה המטפלת בעניין המהירות בהתאם לניקוד
function autoMove() {
    clearInterval(myInterval);
    let speed = getSpeed() - score;
    difficulty.style.display = "none";
    // תזוזת הנחש והגברת מהירותו בכל ניקוד
    myInterval = setInterval(() => move(direction), speed > 50 ? speed : 50);
}

// הוספת אירוע אשר מפעיל את דרגות הקושי
document.getElementById('difficulty').addEventListener('change', () => {
    if (!isGameOver) {
        autoMove();
    }
});

// פונקציה אשר מטפלת באירועי המצב שהמשחק נגמר + הצגה הויזואלית
function gameOver() {
    isGameOver = true;
    // עצירת האינטרבל במצב שהפונקציה מופעלה
    clearInterval(myInterval);
    sound("../sound/lose.mp3");
    console.log(sound);
    document.querySelector("#newGame").style.display = "initial";
    setTimeout(() => alert('game over'), 500);
    recordRes.innerHTML = `השיא שלך הינו: ${record} נקודות`
    difficulty.style.display = "block";
}

// פונקציה המיועדת להצגתו של התפוח
function setApple() {
    do {
        random = Math.floor(Math.random() * width * height);
    } while (snake.includes(random));
    divs.forEach(d => d.classList.remove('apple'));
    divs[random].classList.add('apple');
}

// פונקציה המטפלת בעניין הסאונד במשחק
function sound(fileName) {
    const audio = document.createElement('audio');
    audio.src = fileName;
    audio.play();
}

// פונקציה המטפלת בעניין הצגת המשחק מחדש + ההצגה הויזואלית כאשר קוראים לפונקציה
function newGame() {
    // סידור הנחש במקומו ההתחלתי
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

// פונקציה לשמירת הערך של הנתונים (שבירת שיא)
function saveRecord() {
    if (score > maxScore) {
        maxScore = score;
    }
    localStorage.setItem('maxScoreOfGame', maxScore);
}

// פונקציה להצגת הערך של הנתונים על ה-DOM
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

// פונקציה למחיקת הערך הנתונים השמורים
function clearRecord() {
    localStorage.removeItem('maxScoreOfGame');
    maxScore = 0;
    record = 0;
    recordRes.innerHTML = `השיא שלך הינו: ${record} נקודות`
}

// הוספת אירועי הפעלה להקשה על החצים של המיקלדת
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

// הוספת אירועי לחיצה במצב של מסך מגע על חצים המוצגים ויזואלית
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