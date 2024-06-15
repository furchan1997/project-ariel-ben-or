import { countries, reset, search as goSearch } from './countries.js';

// השמה של שדה תיבת הקלט של חיפוש המדינה והמזהה שאחראי על תצוגת הקלפים למשתנים גלובליים
const search = document.getElementById('search');
const cards = document.getElementById('cards');

// הוספת אירוע על גבי הקלט להצגת המדינות וטיפול במצב של שדה ריק
search.addEventListener('input', (e) => {
    const word = e.target.value;
    cards.innerHTML = '';
    reset();
    if (word === '' || word === null) {
        cards.innerHTML = '';
        createAllCards();
    }
    goSearch(word);
    createAllCards();
});

// מקבלת אובייקט מדינה ויוצרת כרטיסיה לפי הנתונים שנמצאים באובייקט המדינה
// הכרטיסיה כוללת תמונה, כותרת, טקסט ואייקון להוספת למועדפים (לב)
const createCard = (country) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card shadow rounded m-2 col-md-3 col-sm-10';

    const cardImg = document.createElement('img');
    cardImg.src = country.flags.png;
    cardImg.className = 'card-img-top img border shadow rounded mt-2';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = country.name.common;

    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.textContent = `capital: ${country.capital}`;

    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer d-flex justify-content-center';

    const heartIcon = document.createElement('i');
    heartIcon.className = 'fa fa-heart';

    if (isHartsPressed(country.name.common)) {
        // אם המדינה נמצאת במועדפים
        heartIcon.classList.add('text-danger')
        // אם המדינה לא נמצאת במועדפים 
    } else {
        heartIcon.classList.add('text-secondary')
    };

    // הוספת אירועי לחיצה להוספת מדינה למועדפים והסרתה
    heartIcon.addEventListener('click', () => {
        heartIcon.classList.toggle('text-danger');
        heartIcon.classList.toggle('text-secondary');
        savaHart(country.name.common, heartIcon.classList.contains('text-danger'));
        const clickSound = document.createElement('audio');
        clickSound.src = '../sound/click.mp3';
        clickSound.play();
    });


    cardDiv.appendChild(cardImg);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);

    cardDiv.appendChild(cardBody);
    cardFooter.appendChild(heartIcon);
    cardDiv.appendChild(cardFooter);

    cards.appendChild(cardDiv);
}

// מוציאים את הפונקציה כדי להשתמש בה מקובץ חיצוני.
const createAllCards = () => {
    countries.forEach((country) => {
        createCard(country);
    });
}
// משמרת את המדינה ומצבה בלוקל סטוראג
function savaHart(countryName, isPressed) {
    let harts = JSON.parse(localStorage.getItem('harts')) || {};
    harts[countryName] = isPressed;
    localStorage.setItem('harts', JSON.stringify(harts));
}
// בודקת האם המדינה נמצאת במועדפים
function isHartsPressed(countryName) {
    let hearts = JSON.parse(localStorage.getItem('harts')) || {};
    return hearts[countryName] || false;
}

function loadSaved() {
    createAllCards();
}
export { createAllCards, };