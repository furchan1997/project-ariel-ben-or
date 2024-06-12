// השמת הפתורים באפליקציה למשתנים גלובליים + השמת הסלטורים למשתנים גלובליים
const tasks = document.querySelector(".tasks");
const deleteAllBtn = document.getElementById("delete");
const divList = document.querySelector(".lists");
const deleteAllListsBtn = document.getElementById("delete-all")

// פונקציה שמטפלת בהוספה ובייצירת המשימות ומחיקתן
function add() {
    // השמת המשתנה לתיבת הקלט שב- HTML
    const input = document.querySelector("input");
    // טיפול במצב שבו יש שדה ריק והודעה תואמת למצב ועצירת הפונקציה במצב זה
    if (!input.value) {
        divList.classList.add("msg-click")
        divList.innerHTML = "אין אפשרות להוסיף שדה ריק";
        return;
    } else if (input.value) {
        divList.innerHTML = "";
    }

    // הצגת הכפתור אשר מוחק את כל המשימות
    deleteAllListsBtn.style.display = "block";
    // הסרת המחלקה 
    divList.classList.remove("msg-click")
    // יצירת אלמנטים על ה-DOM
    const li = document.createElement("li");
    const div = document.createElement("div");
    // נותן את האפשרות לכתוב על האתר
    div.contentEditable = true;
    // הוספת הערך שבשדה הקלט על הדיב שמכיל את הערכים 
    div.innerHTML = input.value;
    // יצירת דיב על גבי הליסט
    li.appendChild(div);

    // יצירת כפתור האחראי למחיקת משימה
    const btnDelete = document.createElement("button");
    btnDelete.innerHTML = "🗑️";
    // הוספת אירוע אשר אחראי על מחיקת משימה
    btnDelete.addEventListener("click", () => {
        const question = confirm(`האם הינך בטוח למחוק את ${div.innerHTML} ?`);
        if (question) {
            li.remove();
            saveTasks();
        }
        // הסתרת הכפתור אשר מוחק את כל המשימות כאשר אין משימות כלל
        if (tasks.children.length === 0) {
            deleteAllListsBtn.style.display = "none";
        }
    });

    // יצירת הכפתור על גבי הליסט 
    li.appendChild(btnDelete);
    // יצירת הליסט על גבי הסלקטור שמוצגות עליו המשימות 
    tasks.appendChild(li);
    // ניקוי שדה הקלט לאחר הוספת משימה
    input.value = "";
    // שמירת המשימה
    saveTasks();
}
// פונקציה שנועדה להוסיף אירוע לחיצה על המיקלדת
function keyup(ev) {
    if (ev.key === "Enter") {
        add();
    }
}
// פונקציה לשמירת הערך של הנתונים 
function saveTasks() {
    const divs = document.querySelectorAll(".tasks div");
    // המרת כל המשימות שנוצרו למערך
    // מיפוי מערך חדש של ערכי ה-HTML של כל אלמנט
    const tasksArray = Array.from(divs).map(div => div.innerHTML);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

// פונקציה להצגת הערך של הנתונים על ה-DOM
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    // הוספת האלמנטים והפעולות לשמירה באחסון המקומי
    if (savedTasks) {
        tasks.innerHTML = ""; // ניקוי הרשימה הקיימת לפני שנוסיף את הפריטים מחדש
        savedTasks.forEach(task => {
            const li = document.createElement("li");
            const div = document.createElement("div");
            div.contentEditable = true;
            div.innerHTML = task;

            const btnDelete = document.createElement("button");
            btnDelete.innerHTML = "🗑️";
            btnDelete.addEventListener("click", () => {
                const question = confirm(`האם הינך בטוח למחוק את ${div.innerHTML} ?`);
                if (question) {
                    li.remove();
                    saveTasks();
                }
            });
            li.appendChild(div);
            li.appendChild(btnDelete);
            tasks.appendChild(li);
        });
        divList.innerHTML = savedTasks.join("<br>");
    }
}
//אחראי על הכפתור שמוחק הכל וההצגה הויזואלית לאחר מכן
function clearAllTasks() {
    if (confirm("האם אתה בטוח שברצונך למחוק את המשימות?")) {
        localStorage.removeItem("tasks");
        divList.classList.add("lists")
        divList.innerHTML = "";
        tasks.innerHTML = "";
        deleteAllBtn.style.display = "none";
        divList.style.display = "none";
    }
}
//אחראי על השמירה של הרשימה והדפסתה לבחוץ
document.querySelector("#save").addEventListener("click", () => {
    saveTasks();
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    deleteAllListsBtn.style.display = "none";

    // טיפול במצב שאין תוכן 
    if (tasks.innerHTML.trim() === "") {
        deleteAllBtn.style.display = "none";
        divList.innerHTML = "אנא הוסף פריטים לרשימה";
        divList.style.display = "block";
        divList.classList.remove("lists")
        divList.classList.add("msg-click")
    }
    // הדפסת נתונים שנוצרו אל תוך אזור המציג את התוכן + הצגה הויזואלית לאחר פעולה זו
    else if (savedTasks && savedTasks.length > 0) {
        deleteAllBtn.style.display = "block"
        divList.innerHTML = "<b> הרשימה שלך: <b>" + "<br>" + savedTasks.join("<br>");
        divList.classList.remove("msg-click")
        divList.classList.add("lists")
    }
});

// כפתור האחראי על מחיקת כל המשימות יחד
deleteAllListsBtn.addEventListener("click", () => {
    const questionClearAll = confirm(`האם הינך בטוח למחוק את כל המשימות?`);
    divList.innerHTML = "";
    // מצב בו יש איושר למחיקה של כל הרשימה
    if (questionClearAll) {
        tasks.innerHTML = "";
        divList.classList.remove("msg-click")
        divList.classList.add("lists")
        localStorage.removeItem("tasks");
        if (tasks.innerHTML === "") {
            deleteAllListsBtn.style.display = "none";
        }
    }
    add();
});

// הוספת אירוע לחיצה כאשר רוצים למחוק הכל 
document.querySelector("#delete").addEventListener("click", clearAllTasks);

// הפעלת הפונקציה אשר שומרת את הנתונים כאשר הדף נטען
function init() {
    loadTasks();
}