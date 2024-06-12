const board = document.querySelector("#board");

// מערך המכיל אוסף כפול של תמונות עבור המשחק
const arryImges = ['../images/משחק זכרון/angry.png', '../images/משחק זכרון/Asks.png', '../images/משחק זכרון/broke off.png',
    '../images/משחק זכרון/childish.png', '../images/משחק זכרון/elf.png', '../images/משחק זכרון/listening.png', '../images/משחק זכרון/oops.png',
    '../images/משחק זכרון/salutes.png', '../images/משחק זכרון/very angry.png', '../images/משחק זכרון/thinking.png', '../images/משחק זכרון/angry.png', '../images/משחק זכרון/Asks.png', '../images/משחק זכרון/broke off.png',
    '../images/משחק זכרון/childish.png', '../images/משחק זכרון/elf.png', '../images/משחק זכרון/listening.png', '../images/משחק זכרון/oops.png',
    '../images/משחק זכרון/salutes.png', '../images/משחק זכרון/very angry.png', '../images/משחק זכרון/thinking.png'
];

// התאמת הלוח למסך למובייל + עיצוב הלוח
const width = window.screen.width < 640 ? 110 : 100;
// משתנים גלובליים אשר יעזרו לי לפיתוח המשחק 
const height = 100;
const hiddenSrc = '../images/משחק זכרון/regular.png';
let firstCard, secondCard;
let isChecking = false;
let isClicked = false;
let counter = 0;
let recordOfCounter = 0;
let clickCount = 0;
let attempts = 0;
const res = document.getElementById("res");
const showRecord = document.getElementById("record");

// פונקציה לבניית לוח המשחק + אירועי הלחיצה להצגת הקלפים המוסתרים
function updateBoard() {
    // לולאה שרצה על כל מערך התמונות ויוצרת אותם על הלוח 
    arryImges.forEach(imgSrc => {
        const photo = document.createElement("img");
        photo.style.width = width + "px";
        photo.style.height = height + "px";
        photo.classList.add("dizing");
        // הקלף המוסתר
        photo.src = hiddenSrc;

        checkRes(`ברוכים הבאים למשחק הזכרון <br /> החוקים הם פשוטים: בלחיצה חד פעמית על כפתור הצג קלפים יהיו לכם כ-30 שניות להתסכל על מיקומי הקלפים, אחריי 30 שניות הקלפים יוסתרו ועליכם להתאים לכל קלף את הקלף הזהה לו <br /> שימו לב: אם מגיעים ל-10 פסילות המשחק נגמר, בהצלחה ! <br`, counter, "green", "yellow")

        // הוספת אירוע לחיצה להצגת הקלפים 
        document.getElementById("showCards").addEventListener("click", () => {
            // אם כרגע אין השוואה פעילה בין שני קלפים, ניתן להמשיך
            if (!isClicked) {
                // אם היה אירוע לחיצה אז תציג את הקלפים
                res.style.display = "none";
                photo.src = imgSrc;
                isChecking = true;
                // אחריי חצי דקה תסתיר אותם ותציג הודעה תואמת 
                setTimeout(() => {
                    photo.src = hiddenSrc;
                    isClicked = true;
                    isChecking = false;
                    res.style.display = "block";
                    checkRes("זמן הצפייה בקלפים נגמר ! בהצלחה", counter, "green", "yellow")
                }, 1000 * 30)
            }

        });

        // הוספת אירועי לחיצה להצגת כל תמונה מוסתרת
        photo.addEventListener("click", () => {

            // אם התנאי בוצע אז תציג לי את הקלף 
            if (!isChecking) {

                // אם לא נבחר קלף ראשון אז 
                if (!firstCard) {
                    // מציין את זה שהתקיימה לחיצה
                    isClicked = true;
                    firstCard = photo;

                    // מציג את התמונה האמיתית
                    firstCard.src = imgSrc;
                    sound("../sound/click.mp3");
                    checkRes("בחר את הקלף הנכון", counter, "green", "yellow");

                    // אם הפעולה הראשונה הוגדרה אבל השנייה לא הוגדה
                } else if (!secondCard) {
                    // אותם הפעולות כמו בפעולה הראשונה 
                    secondCard = photo;
                    secondCard.src = imgSrc;
                    isChecking = true;
                    sound("../sound/click.mp3");

                    // מתזמן את הבדיקות והפעולות שקשורות להצגת הקלפים לאחר פרק זמן מסוים
                    setTimeout(() => {
                        // בדיקת מצב שבו יש זיהוי של שני איברים זהים במערך
                        if (firstCard.src === secondCard.src) {
                            checkRes("כל הכבוד, המשך הלאה", ++counter, "green", "yellow");

                            // אם המשתמש הציע למצב של 10 נקודות שזה בעצם הצגת כל הקלפים
                            if (counter === 10) {
                                board.innerHTML = "";
                                res.classList.add("styleAftterWon");
                                checkRes("כל הכבוד, סיימתם את המשחק !", counter, "blue", "white");
                                sound("/sound/won.mp3");

                                //סידור מחדש של הקלפים על הלוח על ידיי ערבוב אקראי של האיברים במערך
                                arryImges.sort(() => Math.random() - 0.5);

                                // פונקציה לשמירת הערך של הנתונים 
                                localStorage.setItem("recordOfCounter", recordOfCounter)
                                loadRecords()
                            }
                            // אם לא היה התאמה בין שני התמונות 
                        } else {
                            //הגדלת המשתנה ב-1 בכל לחיצה את תמונה
                            clickCount++;

                            // החזרת הקלף המוצג לתמונה שמסתירה
                            firstCard.src = hiddenSrc;
                            secondCard.src = hiddenSrc;
                            checkRes("נסו שוב", counter, "red", "white");
                        }
                        // מטפל במצב שבו יהיו עשרה נסיונות
                        if (clickCount >= 10) {
                            isChecking = false;
                            alert("טעית כ-10 פעמים, המשחק מתחיל מחדש")
                            newGame();
                        }

                        // מבצע אתחול של המשתנים לערכים הראשוניים שלהם לאחר ביצוע הבדיקה
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

// פונקציה אשר מטפלת בנושא של משחק חדש 
function newGame() {
    // ניקוי הלוח והצגת הודעה מותאמת 
    board.innerHTML = "";
    res.classList.remove("styleAftterWon");
    checkRes("ברוכים הבאים למשחק הזכרון, יש לכם 10 שניות להתסכל על הלקפים ולנסות לזכור אותם, שכאתם מוכנים לחצו על הצג קלפים והמשחק יתחיל !", counter, "green", "yellow")
    // ערבוב של האיברים מחדש + איפוס ניקוד ומספר הלחיצות
    arryImges.sort(() => Math.random() - 0.5);
    counter = 0;
    clickCount = 0
    // מאפשר הצגה מחדש של הקלפים לזמן מוגבל בעת לחיצה על הכפתור המתאים
    isClicked = false;
    updateBoard();
}

// פונקציה אשר מטפלת בנושא של הצגת הודעות למשתמש והצגתו הויזואלית בדפדפן
function checkRes(msg, counter, color, bgcolor) {
    res.innerHTML = `${msg} <br>Score: ${counter} <br> מספר הניסיונות הן: ${clickCount}/10`;
    res.style.color = color;
    res.style.backgroundColor = bgcolor;
}

// פונקציה אשר מטפלת בהצגת השיא השמור לאחר טעינה חדשה של המשחק
function loadRecords() {
    recordOfCounter = localStorage.getItem("recordOfCounter");
    // טיפול במצב שהמשתנה ללא ערך
    if (recordOfCounter === null) {
        recordOfCounter = 0;

        // הגדלת המשתנה ב-1 בכל פעם שיש זיהוי של התמונות
    } else {
        recordOfCounter++;
        recordOfCounter = parseInt(recordOfCounter);
    }
    // טיפול במצב הודעה למשתמש כאשר יש מצב של שיא חדש והצגתו הויזואלית
    showRecord.classList.add("recordStyle");
    showRecord.innerHTML = `השיא שלך הינו ${recordOfCounter}`;
    checkRes("סיימתם את המשחק", counter, "blue", "white");
}

// פונקציה שמטפלת בניקוי ואיפוס השיא במשחק
function clearRecord() {
    localStorage.removeItem("recordOfCounter");
    recordOfCounter = 0;
    showRecord.innerHTML = `השיא שלך הינו ${recordOfCounter.valueOf()}`;
}

// פונקציה שמטפלת שנושא הסאונד במשחק
function sound(fillName) {
    const audio = document.createElement("audio");
    audio.src = fillName
    audio.play();
}
document.addEventListener("DOMContentLoaded", () => {
    // שמירת ניקוד השיא בעת רענון הדף
    loadRecords();
    // בעת ניקוי השיא השמור
    const restButton = document.getElementById("clearRecord");
    restButton.addEventListener("click", clearRecord);
});

