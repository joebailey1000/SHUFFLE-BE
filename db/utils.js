
//Dates are given as both years i.e 1963 and as dates in the JSON file i.e 1963-01-01. This function normalises the dates to a value between 0 and 1.
function normaliseDate(date) {
    const startYear = 1960
    const endYear = 2022
    const totalYears = endYear - startYear;

    const yearMatch = date.match(/^(\d{4})/g);

    const year = parseInt(yearMatch[0]);

    const normalised = (year - startYear) / totalYears

    return normalised.toFixed(2)

}

function normaliseTempo(tempo) {
    let min = 0
    let max = 238.895
    let normalised = (tempo - min) / (max - min)
    return normalised.toFixed(2)
}

module.exports = { normaliseDate, normaliseTempo }