const tasks = document.querySelector(".tasks");
const deleteAllBtn = document.getElementById("delete");
const divList = document.querySelector(".lists");
const deleteAllListsBtn = document.getElementById("delete-all")
function add() {
    const input = document.querySelector("input");
    if (!input.value) {
        divList.classList.add("msg-click")
        divList.innerHTML = "אין אפשרות להוסיף שדה ריק";
        return;
    } else if (input.value) {
        divList.innerHTML = "";
    }

    deleteAllListsBtn.style.display = "block";
    divList.classList.remove("msg-click")
    const li = document.createElement("li");
    const div = document.createElement("div");
    div.contentEditable = true;
    div.innerHTML = input.value;
    li.appendChild(div);

    const btnDelete = document.createElement("button");
    btnDelete.innerHTML = "🗑️";
    btnDelete.addEventListener("click", () => {
        const question = confirm(`האם הינך בטוח למחוק את ${div.innerHTML} ?`);
        if (question) {
            li.remove();
            saveTasks();
        }
        if (tasks.children.length === 0) {
            deleteAllListsBtn.style.display = "none";
        }
    });

    li.appendChild(btnDelete);
    tasks.appendChild(li);
    input.value = "";
    saveTasks();

}
function keyup(ev) {
    if (ev.key === "Enter") {
        add();
    }
}
function saveTasks() {
    const divs = document.querySelectorAll(".tasks div");
    const tasksArray = Array.from(divs).map(div => div.innerHTML);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
}
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
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
//אחראי על הכפתור שמוחק הכל
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

    if (tasks.innerHTML.trim() === "") {
        deleteAllBtn.style.display = "none";
        divList.innerHTML = "אנא הוסף פריטים לרשימה";
        divList.style.display = "block";
        divList.classList.remove("lists")
        divList.classList.add("msg-click")
    }
    else if (savedTasks && savedTasks.length > 0) {
        deleteAllBtn.style.display = "block"
        divList.innerHTML = "<b> הרשימה שלך: <b>" + "<br>" + savedTasks.join("<br>");
        divList.classList.remove("msg-click")
        divList.classList.add("lists")
    }
});

// כפתור האחראי המוחק את הפריטים עוד לפני שנשמרו 
deleteAllListsBtn.addEventListener("click", () => {
    const questionClearAll = confirm(`האם הינך בטוח למחוק את כל המשימות?`);
    divList.innerHTML = "ds";
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

document.querySelector("#delete").addEventListener("click", clearAllTasks);

function init() {
    loadTasks();
}