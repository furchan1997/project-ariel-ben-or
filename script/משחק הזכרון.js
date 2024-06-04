const board = document.querySelector("#board");
const arryImges = ['אננס.jpg', 'בצל.jpg', 'חסה.jpg', 'מלפפון.jpg', 'מנגו.jpg', 'עגבניה.jpg', 'פלפל אדום מתוק.jpg', 'פלפל ירוק חריף.jpg', 'צנון.jpg', 'שום.jpg', 'אננס.jpg', 'בצל.jpg', 'חסה.jpg', 'מלפפון.jpg', 'מנגו.jpg', 'עגבניה.jpg', 'פלפל אדום מתוק.jpg', 'פלפל ירוק חריף.jpg', 'צנון.jpg', 'שום.jpg'];
const width = window.screen.width < 640 ? 97 : 100;
const height = 100;
const hiddenSrc = 'defulet card.png';
let firstCard, secondCard;
let isChecking = false;
let isClicked = false;
let counter = 0;
let recordOfCounter = 0;
let clickCount = 0;
const res = document.getElementById("res");
const showRecord = document.getElementById("record");

function updateBoard() {
    arryImges.forEach(imgSrc => {
        const photo = document.createElement("img");
        photo.style.width = width + "px";
        photo.style.height = height + "px";
        photo.classList.add("dizing");
        photo.src = hiddenSrc;

        checkRes(`ברוכים הבאים למשחק הזכרון <br /> החוקים הם פשוטים: בלחיצה חד פעמית על כפתור הצג קלפים יהיו לכם כ-10 שניות להתסכל על מיקומי הקלפים, אחריי 10 שניות הקלפים יוסתרו ועליכם להתאים לכל קלף את הקלף הזהה לו <br /> שימו לב: אם מגיעים ל5 פסילות המשחק נגמר, בהצלחה ! <br`, counter, "green", "yellow")

        document.getElementById("showCards").addEventListener("click", () => {
            if (!isClicked) {

                checkRes("", counter, "green", "yellow")
                photo.src = imgSrc;
                isChecking = true;

                setTimeout(() => {
                    photo.src = hiddenSrc;
                    isClicked = true;
                    isChecking = false;
                    checkRes("זמן הצפייה בקלפים נגמר ! בהצלחה", counter, "green", "yellow")
                }, 10000)
            }

        });

        photo.addEventListener("click", () => {

            if (!isChecking) {
                if (!firstCard) {
                    isClicked = true;
                    firstCard = photo;
                    firstCard.src = imgSrc;
                    sound("click.mp3");

                    checkRes("בחר את הקלף הנכון", counter, "green", "yellow");
                } else if (!secondCard) {
                    secondCard = photo;
                    secondCard.src = imgSrc;
                    isChecking = true;
                    sound("click.mp3");
                    setTimeout(() => {
                        if (firstCard.src === secondCard.src) {
                            checkRes("כל הכבוד, המשך הלאה", ++counter, "green", "yellow");

                            if (counter === 10) {
                                board.innerHTML = "";
                                res.classList.add("styleAftterWon");
                                checkRes("כל הכבוד, סיימתם את המשחק !", counter, "blue", "white");
                                sound("won.mp3");
                                arryImges.sort(() => Math.random() - 0.5);
                                localStorage.setItem("recordOfCounter", recordOfCounter)
                                loadRecords()
                                // newGame();
                            }
                        } else {
                            clickCount++;
                            firstCard.src = hiddenSrc;
                            secondCard.src = hiddenSrc;
                            checkRes("נסו שוב", counter, "red", "white");
                        }
                        if (clickCount >= 5) {
                            isChecking = false;
                            alert("טעית כ5 פעמים, המשחק מתחיל מחדש")
                            newGame();
                        }

                        firstCard = null;
                        secondCard = null;
                        isChecking = false;
                    }, 1000);
                }
            }
        });

        board.appendChild(photo);
    });
}

function newGame() {
    board.innerHTML = "";
    res.classList.remove("styleAftterWon");
    checkRes("ברוכים הבאים למשחק הזכרון, יש לכם 10 שניות להתסכל על הלקפים ולנסות לזכור אותם, שכאתם מוכנים לחצו על הצג קלפים והמשחק יתחיל !", counter, "green", "yellow")
    arryImges.sort(() => Math.random() - 0.5);
    counter = 0;
    clickCount = 0
    isClicked = false;
    updateBoard();
}

function checkRes(msg, counter, color, bgcolor) {
    res.innerHTML = `${msg} <br>Score: ${counter}`;
    res.style.color = color;
    res.style.backgroundColor = bgcolor;
}


function loadRecords() {
    recordOfCounter = localStorage.getItem("recordOfCounter");
    if (recordOfCounter === null) {
        recordOfCounter = 0;
    } else {
        recordOfCounter++;
        recordOfCounter = parseInt(recordOfCounter);
    }
    showRecord.classList.add("recordStyle");
    showRecord.innerHTML = `השיא שלך הינו ${recordOfCounter}`;
    checkRes("סיימתם את המשחק", counter, "blue", "white");
}

function clearRecord() {
    localStorage.removeItem("recordOfCounter");
    recordOfCounter = 0;
    showRecord.innerHTML = `השיא שלך הינו ${recordOfCounter.valueOf()}`;
}

function sound(fillName) {
    const audio = document.createElement("audio");
    audio.src = fillName
    audio.play();
}
document.addEventListener("DOMContentLoaded", () => {
    loadRecords();

    const restButton = document.getElementById("clearRecord");
    restButton.addEventListener("click", clearRecord);
});

