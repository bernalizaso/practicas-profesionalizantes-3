let display = document.getElementById("display");
let currentInput = "";

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function appendOperator(operator) {
    currentInput += operator;
    updateDisplay();
}

function calculate() {
    try {
        currentInput = eval(currentInput);
        updateDisplay();
    } catch (error) {
        currentInput = "Error";
        updateDisplay();
    }
}

function clearDisplay() {
    currentInput = "";
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput;
}