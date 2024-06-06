const ex = document.getElementById("targil");
const tbody = document.querySelector("tbody");
const answer = document.querySelector("#answer");
const checkResButton = document.getElementById('checkRes');
const optionsDif = ["easy", "medium", "hard"];
const difficulty = document.querySelector("#difficulty");
const operators = document.querySelector("#operators");
const res = document.getElementById("res");
let num1, num2, correctAnswer;
let cumulativeScore = parseInt(localStorage.getItem('cumulativeScore')) || 0;
let score = 0;

function updateProblem() {
    const selected = difficulty.value;
    const maxNum = selected === "easy" ? 10 : selected === "medium" ? 100 : 1000;

    if (selected === "easy") {
        score = 10;
    } else if (selected === "medium") {
        score = 20;
    } else if (selected === "hard") {
        score = 30;
    }

    num1 = Math.floor(Math.random() * maxNum);
    num2 = Math.floor(Math.random() * maxNum) + 1

    const operSelected = operators.value;
    if (operSelected === "/") {
        num1 = Math.floor(Math.random() * (maxNum / 2)) * 2 + 2;
        num2 = Math.floor(Math.random() * (maxNum / 2)) * 2 + 2;
        if (num2 > num1) {
            [num1, num2] = [num2, num1];
        }
    }

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

function isCorrectAnswer() {
    const number = Number(answer.value);

    if (isNaN(number) || answer.value.trim() === "") {
        return false;
    }
    if (operators.value !== '/') {
        return correctAnswer === number;
    }
    const expectedString = correctAnswer.toString();
    return expectedString.startsWith(answer.value);
}

// מאזין אירועים לבדיקה של התוצאה
checkResButton.addEventListener('click', () => {
    if (isCorrectAnswer()) {
        cumulativeScore += score;
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
    } else {
        res.style.display = "block";
        res.innerText = "תשובה לא נכונה נסה שוב או תעבור לתרגיל הבא";
        res.style.color = "#ff6347";
        createTable();
    }
});

function createTable() {
    const tr = document.createElement("tr");
    tbody.appendChild(tr);

    if (isCorrectAnswer()) {
        tr.innerHTML = `
        <td>${num1} ${operators.value} ${num2}</td>
        <td>${correctAnswer}</td>
        <td></td>
        <td>${score}</td>
        `;
    } else {
        tr.innerHTML = `
        <td>${num1} ${operators.value} ${num2}</td>
        <td></td>
        <td>${Number(answer.value)}</td>
        <td>0</td>
        `;
    }
    // if (tr.innerHTML = NaN) {
    //     return;
    // }
    saveTableData();
}

function saveTableData() {
    const tableData = tbody.innerHTML;
    localStorage.setItem('tableData', tableData);
}

function loadTableData() {
    const savedTableData = localStorage.getItem('tableData');
    if (savedTableData) {
        tbody.innerHTML = savedTableData;
    }
}

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

document.getElementById("DeleteLocal").addEventListener("click", () => {


    if (tbody.innerHTML === "") {
        return;
    }
    clearData();
});

function clearData() {
    localStorage.removeItem("cumulativeScore");
    localStorage.removeItem("tableData");
    cumulativeScore = 0;
    tbody.innerHTML = "";
    document.getElementById("res").innerText = "";
    answer.value = "";
    updateProblem();
}