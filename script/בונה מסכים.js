// הגדרת משתנים גלובליים שיעזרו לי לבנות את האתר בצורה חכמה ומודלורית
const page = document.getElementById("page");
const panelSide = document.getElementById('panelSide');
let showPanel = false;
let type, params;
// אובייקט שמכיל מערך, כל מפתח הוא בעצם הערך של שיש בסלקט, ואיבריי המערכים מכילים את ההגדרות לכל יצירה לבניית אלמנט על הדף
const elementSelected = {
    title: ['headerType', 'color', 'content', 'bcElem', 'widthElem', 'heightElem'],
    input: ['inputType', 'fontSize', 'color', 'content', 'bcElem', 'widthElem', 'heightElem'],
    button: ['fontSize', 'color', 'content', 'bcElem', 'widthElem', 'heightElem'],
    media: ['mediaType', 'mediaSource', 'mediaWidth', 'mediaHeight', 'mediaCaption', 'bcElem'],
    styleContent: ['Btncenter']
};

// פונקציה אשר מטפלת בעניין צבע הרקע של הדף בעיצוב הכללי
function bgPage(elem) {
    page.style.backgroundColor = elem.value;
    save();
}

// פונקציה אשר מטפלת בעניין גודל הטקסט שמשתמש רוצה לבחור 
function fontSize(elem) {
    page.style.fontSize = elem.value + "px";
    save();
}

// פונקציה אשר מטפלת בעניין ריווח הפנימי של הדף שהמשתמש רוצה להגדיר
function padding(elem) {
    page.style.padding = elem.value + "px";
    save();
}

// פונקציה אשר מטפלת בעניין סוג הגופן
function fontFamily(elem) {
    page.style.fontFamily = elem.value;
    save();
}

// פונקציה אשר מטפלת בעניין צבע הטקסט לבחירת המשתמש
function fontColor(elem) {
    page.style.color = elem.value;
    save();
}

// פונקציה אשר מקבלת בתור פרמטרים את חלונית העיצוב הכללי + אלמנטים 
// עשיתי לולאה שרצה על כל הכורות של הנב בר ועושה שינוי בעיצוב הכותרת על ידיי הסרת מחלקה והוספת מחלקה + לחיצה על כותרת מציגה את שאר האלמטים שמתחתייה
function pageToShow(id, elem) {
    const actives = document.querySelectorAll('nav a.active');
    actives.forEach(a => a.classList.remove("active"));
    elem.classList.add("active");

    document.querySelector("#setting").style.display = "none";
    document.querySelector("#elements").style.display = "none";

    document.querySelector("#" + id).style.display = "block";
}

// הפונקציה typeSelect נועדה לעדכן את הממשק בהתאם לסוג האלמנט שנבחר מתוך רשימת אפשרויות, ולחשוף את ההגדרות הרלוונטיות לאותו סוג אלמנט.
function typeSelect(selectElem) {
    type = selectElem.value;
    params = elementSelected[type];

    const divs = document.querySelectorAll("#params>div");
    divs.forEach(div => div.classList.remove("show"));

    params.forEach(param => document.getElementById(param).classList.add("show"));
}

// הוספת אלמנטים על גבי הדף 
function add() {
    let tagName = type;

    if (type === 'title') {
        tagName = document.querySelector('#headerType select').value;
    }
    if (type === "media") {
        tagName = document.querySelector("#mediaType select").value;
    }

    // יצירת אלמנט חדש על הדף בכל פעם
    const elem = document.createElement(tagName);

    // השמת המשתנים לערכי האלמנטים אשר אני רוצה ליצור
    const mediaSourceInput = document.querySelector("#mediaSource input").value;
    const mediaWidthInput = document.querySelector("#mediaWidth input").value;
    const mediaHeightInput = document.querySelector("#mediaHeight input").value;
    const mediaCaptionInput = document.querySelector("#mediaCaption input").value;

    const inputType = document.querySelector('#inputType select').value;
    const fontSize = document.querySelector('#fontSize input').value;
    const color = document.querySelector('#color input').value;
    const content = document.querySelector('#content input').value;
    const bcElem = document.querySelector('#bcElem input').value;
    const widthElem = document.querySelector('#widthElem input').value;
    const heightElem = document.querySelector('#heightElem input').value;

    // לולאה שרצה על כל הפמטרים ובודקת שאם הפרמטר שווה לערך שרשום באופציות של הסלקט אז התווצר האלמנט הרלוונטי לו
    params.forEach(param => {
        if (param === 'inputType') {
            elem.type = inputType;
        } else if (param === 'fontSize') {
            elem.style.fontSize = fontSize + "px";
        } else if (param === 'bcElem') {
            elem.style.backgroundColor = bcElem;
        } else if (param === 'widthElem') {
            elem.style.width = widthElem + "px";
        } else if (param === 'heightElem') {
            elem.style.height = heightElem + "px";
        } else if (param === 'color') {
            elem.style.color = color;
        } else if (param === 'content') {
            if (type === 'input') {
                elem.value = content;
            } else {
                elem.innerHTML = content;
            }
        } else if (param === 'mediaSource') {
            if (tagName === 'img') {
                elem.src = mediaSourceInput;
            }
        } else if (param === 'mediaWidth') {
            elem.style.width = mediaWidthInput + "px";
        } else if (param === 'mediaHeight') {
            elem.style.height = mediaHeightInput + "px";
        } else if (param === 'mediaCaption') {
            elem.innerHTML = mediaCaptionInput;
        }
    });

    page.appendChild(elem);
    save();
}

// פונקציה אשר מטפלת בעימוד התוכן הנוצר על הדף, ובמקרה הזה עימוד התוכן למרכז
function centerIt() {
    page.style.display = "flex";
    page.style.flexDirection = "column";
    page.style.justifyContent = "center";
    page.style.alignItems = "center";
    save();
}
// פונקציה אשר מטפלת בעימוד התוכן הנוצר על הדף, ובמיקרה הזה עימוד תוכן לצד ימין של הדף
function rightIt() {
    page.style.display = "flex";
    page.style.flexDirection = "column";
    page.style.alignItems = "start";
    save();
}
// פונקציה אשר מטפלת בעימוד התוכן הנוצר על הדף, ובמקרה הזה עימוד התוכן לצד השמאלי של הדף
function leftIt() {
    page.style.display = "flex";
    page.style.flexDirection = "column";
    page.style.alignItems = "end";
    save();
}

// פונקציה אשר מטפלת בעימוד התוכן הנוצר על הדף, ובמקרה הזה עימוד התוכן בתחילת הדף
function topIt() {
    page.style.display = "flex";
    page.style.flexDirection = "column";
    page.style.justifyContent = "start";
    page.style.alignItems = "center";
    save();
}

// פונקציה אשר מטפלת בעימוד התוכן הנוצר על הדף, ובמקרה הזה עימוד התוכן בסוף הדף
function bottomIt() {
    page.style.display = "flex";
    page.style.flexDirection = "column";
    page.style.justifyContent = "end";
    page.style.alignItems = "center";
    save();
}

// פונקציה אשר מטפלת בנושא שמירת השינויים אשר נוצרו על הדף
function save() {
    const elements = [];

    // לולאה שרצה על כל הצאצאים שעל הדף שעליו נוצרו האלמטים והעיצובים
    // סינון אלמטים, נבדק האם הוא אלמנט 1 
    page.childNodes.forEach(child => {
        if (child.nodeType === 1) {
            // יצירת אובייקט לאלמנט, אם הצאצא הוא אלמנט אז נוצר אובייקט שמכיל את התכונות הבאות
            const element = {
                tagName: child.tagName,
                innerHTML: child.innerHTML,
                style: child.style.cssText,
                attributes: {}
            };
            // הוספת האטריביוטים לאובייקט האלמנט 
            // הפונקציה עוברת על האטריביוטים של האלמנט ומוסיפה אותם לאובייקט
            Array.from(child.attributes).forEach(attr => {
                element.attributes[attr.name] = attr.value;
            });
            elements.push(element);
        }
        // אם גודל המסך קטן מ640 פיקסל אז הפנאל סייד יוסתר 
        window.screen.width < 640 ? panelSide.style.display = 'none' : panelSide.style.display = 'block';

    });

    // הפונקציה יוצרת אובייקט pageStyle המכיל את הסגנונות של הדף ושומרת אותו באחסון מקומי
    const pageStyle = {
        backgroundColor: page.style.backgroundColor,
        fontSize: page.style.fontSize,
        padding: page.style.padding,
        fontFamily: page.style.fontFamily,
        color: page.style.color,
        display: page.style.display,
        flexDirection: page.style.flexDirection,
        justifyContent: page.style.justifyContent,
        alignItems: page.style.alignItems
    };

    // הפונקציה שומרת את המערך elements ואת אובייקט pageStyle באחסון המקומי, וגם שומרת את התוכן הפנימי של הדף.
    localStorage.setItem('text', page.innerHTML);
    localStorage.setItem('elements', JSON.stringify(elements));
    localStorage.setItem('pageStyle', JSON.stringify(pageStyle));
}

// פונקציה אשר מטפלת בהצגת האלנטים והעיצובים שנשמרו על הדף כאשר טוענים את האתר מחדש
function load() {
    // שליפת האלמנטים מהאחסון המקומי
    const elements = JSON.parse(localStorage.getItem('elements'));
    const pageStyle = JSON.parse(localStorage.getItem('pageStyle'));

    // אם יש אלמנטים שמורים הפונקציה מאפסת את התוכן ומוסיפה את האלמנטים השמורים 
    if (elements) {
        page.innerHTML = '';
        elements.forEach(element => {
            const elem = document.createElement(element.tagName);
            elem.innerHTML = element.innerHTML;
            elem.style.cssText = element.style;
            for (const [attr, value] of Object.entries(element.attributes)) {
                elem.setAttribute(attr, value);
            }
            page.appendChild(elem);
        });
    }

    // אם ישנו סגנון שמור הפונקציה מעדכנת את סגנון האלמנט בדף בהתאם לערכים השמורים
    if (pageStyle) {
        for (const [style, value] of Object.entries(pageStyle)) {
            page.style[style] = value;
        }
    }

    // אם יש טקסט שמור הפונקציה מעדכנת את תוכן של האלמנט של הדף לתוכן הזה
    if (localStorage.getItem('text')) {
        page.innerHTML = localStorage.getItem('text');
    }
}

// פונקציה אשר נועדה להסיר את האלמטים והעיצובים שנשמרו בלחיצת כפתור
function newPage() {
    page.innerHTML = "";
    page.style = "";
    localStorage.clear();
}

// הפונקציה נועדה להציג או להסתיר את הפאנל בלחיצת כפתור 
function showOrHide() {
    if (panelSide) {
        panelSide.style.display = showPanel ? "none" : "block";
        showPanel = !showPanel;
    }
};

// טעינת הדף השמור והצגתו הויזואלית
load();