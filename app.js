const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearAllBtn = document.querySelector('#clear-all-btn');
const clearBtn = document.querySelector('#clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingSecondValue = false; 

const sendNumberValue = (number) => {
    // replace the current display value if first value is entered
    if (awaitingSecondValue) {
        calculatorDisplay.textContent = number;
        awaitingSecondValue = false;
    } else {
    // If the current display value is 0, then replace it, if not then add a number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : 
    displayValue + number;
    }
}

const addDecimal = () => {
    // If operator is pressed, don't add decimal
    if (awaitingSecondValue) return;
    // If there's no decimal, add one
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
}

// Calculate first and second values depending on calculator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

    '=': (firstNumber, secondNumber) => secondNumber
};

const useOperator = (operator) => {
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operators at the same time
    if (operatorValue && awaitingSecondValue) {
        operatorValue = operator;
        return;
    }
    // Assign first value if there's no value
    if (!firstValue) {
        firstValue = currentValue;
    }　else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // Ready for the next value
    awaitingSecondValue = true;
    operatorValue = operator;
}

// Add Event Listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => {
            sendNumberValue(inputBtn.value);
        })
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => {
            useOperator(inputBtn.value);
        })
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => {
            addDecimal();
        })
    }
}))

// Clear all button, reset all values and display
const resetAll = () => {
    firstValue = 0;
    operatorValue = '';
    awaitingSecondValue = false; 
    calculatorDisplay.textContent = '0';
}

clearAllBtn.addEventListener('click', resetAll);

// Delete button
const clear = () => {
    firstValue = 0;
    operatorValue = '';
    awaitingSecondValue = false; 
    const stripped = calculatorDisplay.textContent.toString().slice(0, -1);
    calculatorDisplay.textContent = stripped;
    if (calculatorDisplay.textContent.length < 1) {
        calculatorDisplay.textContent = '0'
    } 
}

clearBtn.addEventListener('click', () => {
    if (calculatorDisplay.textContent !== '0') {
        clear(); 
    }
});