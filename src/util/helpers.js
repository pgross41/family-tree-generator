import moment from 'moment';
import blankConfig from './../config/blank';

/**
 * Returns the new value 
 */
export const handleNumberFieldArrowKey = (event) => {
    if (!['ArrowUp', 'ArrowDown'].includes(event.key)) return event.target.value;
    event.preventDefault();
    const valueParts = event.target.value.match(/(.*?)(-?[.\d]+)(.*)/);
    if (!valueParts) return event.target.value;
    const number = valueParts[2].includes('.') ? parseFloat(valueParts[2]) : parseInt(valueParts[2])
    const multiplier = (event.altKey && 0.1) || (event.ctrlKey && 100) || 1;
    const newNumber = number + (event.key === 'ArrowUp' ? multiplier : -multiplier);
    return `${valueParts[1]}${Math.round(newNumber * 10) / 10}${valueParts[3]}`;
}

/**
 * Creates an object using an array of strings as both the key and value
 */
export const makeEnum = (...strings) => {
    return strings.reduce((obj, string) => ({ ...obj, [string]: string }), {});
}

export const toTitleCase = (string) =>
    string.split(' ').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' ');

export const toType = (string) => {
    try {
        return JSON.parse(string);
    } catch (e) {
        return string;
    }
}

export const formatDate = (date, format) =>
    date && moment(date, ['DDMMMMY', 'MMMMDDY']).format(format || blankConfig.dateFormat);