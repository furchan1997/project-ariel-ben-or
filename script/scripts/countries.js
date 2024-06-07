let countries = [];
let countriesFull = [];

const getDataAsync = async () => {
    try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await res.json();
        console.log(data);
        countries = data;
        countriesFull = [...data];
    } catch (err) {
        console.log(err);
    }
}

const reset = () => {
    countries = [...countriesFull];
}

const search = (word) => {
    countries = countries.filter((country) => {
        const name = country.name.common.toLowerCase();
        return name.includes(word.toLowerCase());
    });
}

export { getDataAsync, countries, search, reset };
