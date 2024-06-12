// יצירת משתנים גלובלים אשר יעזרו לי לעשות פעולות אשר יטפלו באפליקציה בצורה חכמה ומודולרית
const ex = document.getElementById("ex");
const tbody = document.querySelector("tbody");
const answer = document.querySelector("#answer");
const checkResButton = document.getElementById('checkRes');
// const optionsDif = ["easy", "medium", "hard"];
const difficulty = document.querySelector("#difficulty");
const operators = document.querySelector("#operators");
const res = document.getElementById("res");
let num1, num2, correctAnswer;
let cumulativeScore = parseInt(localStorage.getItem('cumulativeScore')) || 0;
let score = 0;
let gameRulesVisible = false;


// פונקצייה שנועדה להפעיל את האפשרוית לבחירת האופרטורים ודרגות הקושי
function updateProblem() {

    // השמת ערכי האפשריות של דרגות הקושי לתוך משתנה
    const selected = difficulty.value;
    // סינון והפעלת דרגת הקושי למשתמש לפי בחירתו לדוגמא: אם זה קל אז המספרים יהיו מ- 1 עד 10
    const maxNum = selected === "easy" ? 10 : selected === "medium" ? 100 : 1000;

    // השמת כמות הניקוד לתוך משתנה לפי הערך של דרגת הקושי שנבחר
    if (selected === "easy") {
        score = 10;
    } else if (selected === "medium") {
        score = 20;
    } else if (selected === "hard") {
        score = 30;
    }

    // השמת משתנים למתודה אשר מפעילה מספר רנדומלי בכל פעם בהתחשב למשתנה MAXNUM אשר מגדיר טווח מספרים לפי דרגת הקושי 
    // MATH.FLOOR() מטפלת בכך שכל התרגילים יהיו כמספרים שלמים
    num1 = Math.floor(Math.random() * maxNum);
    num2 = Math.floor(Math.random() * maxNum) + 1

    // השמת משתנה אל תוך ערכי האופרטורים שיש בסלקט
    const operSelected = operators.value;

    // טיפול במצב שבו יש מצב של חילוק וכשיש מצב של חילוק את שני המספרים המוגרלים היו תמיד כזוגיים 
    if (operSelected === "/") {
        num1 = Math.floor(Math.random() * (maxNum / 2)) * 2 + 2;
        num2 = Math.floor(Math.random() * (maxNum / 2)) * 2 + 2;
        // הבטחה שתמיד NUM1 יהיה גדול יותר
        if (num2 > num1) {
            [num1, num2] = [num2, num1];
        }
    }

    // אם יש אופרטור מהסוג שנבחר אז תיהיה בדיקה לתוצאה של כל תרגיל עם כל אופרטור מוגדר + הצגת התרגיל באתר
    switch (operSelected) {
        case "+":
            correctAnswer = num1 + num2;
            ex.innerHTML = ` ${num1} + ${num2} =`;
            break;
        case "-":
            correctAnswer = num1 - num2;
            ex.innerHTML = ` ${num1} - ${num2} =`;
            break;
        case "*":
            correctAnswer = num1 * num2;
            ex.innerHTML = ` ${num1} * ${num2} =`;
            break;
        case "/":
            correctAnswer = num1 / num2;
            ex.innerHTML = ` ${num1} / ${num2} =`;
            break;
        default:
            correctAnswer = num1 + num2;
            ex.innerHTML = ` ${num1} + ${num2} =`;
            break;
    }
}

// מאזין אירועים לשינוי רמת הקושי
difficulty.addEventListener("change", updateProblem);

// מאזין אירועים לשינוי האפשרויות של האופרטור
operators.addEventListener("change", updateProblem);

// פונקציה שמטפלת בעניין התשובה הנכונה
function isCorrectAnswer() {
    // השמת המשתנה לתשובה המספרית שמתקבלת
    const number = Number(answer.value);

    // תנאי שמחייב שהתוצאה תיהיה מסוג נאס ולא כסטרינג ושלא יהיה ערך ריק כתשובה
    if (isNaN(number) || answer.value.trim() === "") {
        return false;
    }
    if (operators.value !== '/') {
        return correctAnswer === number;
    }
    // אם יש מצב של מספר עשרוני אז התוצאה לא בהכרח חייבת להיות כל המספר העשרוני עצמו
    const expectedString = correctAnswer.toString();
    return expectedString.startsWith(answer.value);
}

// מאזין אירועים לבדיקה של התוצאה
checkResButton.addEventListener('click', () => {
    if (isCorrectAnswer()) {
        // השמת משתנה לניקוד שמתקבל ומטרתו לצבור את הניקוד בכל זמן נתון
        cumulativeScore += score;

        // טיפול בהצגה הויזאולית כאשר התשובה נכונה + שמירת הניקוד באחסון המקומי + מעבר לתרגיל הבא אוטומטית + הוספה לטבלה
        localStorage.setItem('cumulativeScore', cumulativeScore);
        res.style.display = "block";
        res.innerText = `כל הכבוד תשובה נכונה מצב הנקודות שלך הוא: ${cumulativeScore}`;
        res.style.color = "#ff6347";
        createTable();
        setTimeout(() => {
            answer.value = "";
            updateProblem();
            res.style.display = "none";
        }, 1000); // מחכה שנייה אחת לפני המעבר לתרגיל הבא

        // הצגה ויזאולית כאשר יש טעות בתשובה
    } else {
        res.style.display = "block";
        res.innerText = "תשובה לא נכונה נסה שוב או תעבור לתרגיל הבא";
        res.style.color = "#ff6347";
        createTable();
    }
});

// יצירת טבלה שמציגה את הפעולות שהמשתמש עשה בכל תרגיל בין אם זו הייתה תשובה נכונה ובין אם לא
function createTable() {
    const tr = document.createElement("tr");
    tbody.appendChild(tr);

    // במיקרה של תשובה נכונה
    if (isCorrectAnswer()) {
        tr.innerHTML = `
        <td>${num1} ${operators.value} ${num2}</td>
        <td>${correctAnswer}</td>
        <td></td>
        <td>${score}</td>
        `;

        // במיקרה של תשובה לא נכונה
    } else {
        tr.innerHTML = `
        <td>${num1} ${operators.value} ${num2}</td>
        <td></td>
        <td>${Number(answer.value)}</td>
        <td>0</td>
        `;
    }
    // שמירת הטבלה באחסון המקומי
    saveTableData();
}

// פונקציה לשמירת הערך של הנתונים 
function saveTableData() {
    const tableData = tbody.innerHTML;
    localStorage.setItem('tableData', tableData);
}

// טוען את הנתונים השמורים כאשר הדף נטען
function loadTableData() {
    const savedTableData = localStorage.getItem('tableData');
    if (savedTableData) {
        tbody.innerHTML = savedTableData;
    }
}

// פונקציה שמטפלת בעניין התרגיל החדש והצגתו הויזאולית בדפדפן
document.getElementById("nextEx").addEventListener("click", () => {
    answer.value = "";
    updateProblem();
    res.style.display = "none";
});

// טוען את הנתונים השמורים בעת טעינת הדף
window.addEventListener('load', () => {
    loadTableData();
    updateProblem(); // עדכן את התרגיל הראשון כאשר הדף נטען
});

// איוונט מסוג לחיצה אשר מפעיל את הסרת השמירה
document.getElementById("DeleteLocal").addEventListener("click", () => {
    if (tbody.innerHTML === "") {
        return;
    }
    clearData();
});

// פונקציה שמטפלת בעניין הסרת הנתונים מהאחסון המקומי
function clearData() {
    localStorage.removeItem("cumulativeScore");
    localStorage.removeItem("tableData");
    cumulativeScore = 0;
    tbody.innerHTML = "";
    document.getElementById("res").innerText = "";
    answer.value = "";
    updateProblem();
}

// פונקציה שמציגה את חוקי המשחק 
// איוונט שעושה שני פעולות: הצגת החוקים והסתרתם
document.getElementById("game-rools").addEventListener("click", () => {
    gameRulesVisible = !gameRulesVisible;
    if (gameRulesVisible) {
        res.style.direction = "rtl";
        res.innerHTML = "ברוכים הבאים ללומדת חשבון: <br> בעזרת החידון המתמטי הזה תוכלו לשפר את היכולות המתמטיות שלכם <br> הערות לגבי המשחק: יש לכן אופציה לדרגות קושי: 1-10 יזכה אתכם ב10 נקודות לתשובה נכונה <br> 1-100 יזכה אתכם ל-20 נקודות לתשובה נכונה <br> ו 1 עד 100 יזכה אתכם ב-30 נקודות לתשובה נכונה <br> שימו לב: כאשר יש מצב שהותצאה הינה מספר עשרוני אז גם המספר הראשון יתקבל";
        document.getElementById("game-rools").innerText = "הסתר";
    } else {
        res.innerHTML = "";
        document.getElementById("game-rools").innerText = "חוקי המשחק";
    }
});