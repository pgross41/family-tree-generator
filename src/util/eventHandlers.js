/**
 * Returns the new value 
 */
const handleNumberFieldArrowKey = (event) => {
    if (!['ArrowUp', 'ArrowDown'].includes(event.key)) return event.target.value;
    event.preventDefault();
    const valueParts = event.target.value.match(/(.*?)(-?[.\d]+)(.*)/);
    if (!valueParts) return event.target.value;
    const number = valueParts[2].includes('.') ? parseFloat(valueParts[2]) : parseInt(valueParts[2])
    const multiplier = (event.altKey && 0.1) || (event.ctrlKey && 100) || 1;
    const newNumber = number + (event.key === 'ArrowUp' ? multiplier : -multiplier);
    return `${valueParts[1]}${Math.round(newNumber * 10) / 10}${valueParts[3]}`;
}

export { handleNumberFieldArrowKey }
