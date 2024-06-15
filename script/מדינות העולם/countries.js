//  משתנה שמיועד לאחסון רשימת המדינות הנוכחית
let countries = [];
// משתנה שמיועד לאחסון רשימת המדינות המקורית. נעשה שימור של הנתונים המקוריים במשתנה זה, כדי שנוכל לאפס את המשתנה שמעליי למצב ההתחלתי בכל עת
let countriesFull = [];

const getDataAsync = async () => {
    try {
        // ביצוע של fetch לכתובת ה-URL של ה-API שמחזירה את כל המדינות
        const res = await fetch("https://restcountries.com/v3.1/all");
        // זריקת שגיאה עם הודעת שגיאה תואמת
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        // אחרי קריאה מוצלחת ל-API והפיכת התשובה ל-JSON
        // הנתונים מועברים למשתנה דאטה
        const data = await res.json();
        console.log(data);
        // מקבל את הנתונים החדשים מה-API
        countries = data;
        // מתעדכן כדי לשמור את כל הנתונים המקוריים
        countriesFull = [...data];
    } catch (err) {
        console.log(err);
    }
}
// פונקציה שמחליפה את הערכים
// על מנת לאפס את הרשימה של countries למצב ההתחלתי שלה, על פי הנתונים המקוריים
const reset = () => {
    countries = [...countriesFull];
}

// פונקציה האחראית לחיפוש המדינה
const search = (word) => {
    // מערך חדש שמכיל רק את המדינות ששם המדינה שלהן מכיל את word
    countries = countries.filter((country) => {

        // משתנה countries מתעדכן כך שהוא מכיל את רשימת המדינות שסוננו לפי המילה המפתח. 
        const name = country.name.common.toLowerCase();
        return name.includes(word.toLowerCase());
    });
}

export { getDataAsync, countries, search, reset };
