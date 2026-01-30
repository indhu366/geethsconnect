const display = document.getElementById('display');
let currentInput = '0';

function updateDisplay() {
  display.textContent = currentInput;
}

// Helper: check if last char is operator
function endsWithOperator(input) {
  return /[+\-*/%]$/.test(input);
}

// Helper: get last number segment from input string
function getLastNumber(input) {
  // split by operators, get last segment
  return input.split(/[+\-*/%]/).pop();
}

function appendNumber(num) {
  if (currentInput === '0' || endsWithOperator(currentInput)) {
    // Replace '0' or after operator with new number
    currentInput += num;
    // Fix if initial input is '0' (leading zero before number)
    if (currentInput.startsWith('0') && !isNaN(currentInput[1]) && currentInput.length === 2) {
      currentInput = num;
    }
  } else {
    // Prevent multiple leading zeros in a number
    const lastNumber = getLastNumber(currentInput);
    if (lastNumber === '0') {
      // Replace last '0' with new number
      currentInput = currentInput.slice(0, -1) + num;
    } else {
      currentInput += num;
    }
  }
  updateDisplay();
}

function appendOperator(op) {
  if (currentInput === '' && op !== '-') {
    // Don't allow operator as first char except minus (to allow negative numbers)
    return;
  }
  // Prevent multiple operators in a row (except minus after operator e.g. for negative)
  if (endsWithOperator(currentInput)) {
    // But allow minus after operator for negative sign
    if (op === '-' && !currentInput.endsWith('-')) {
      currentInput += op;
    } else {
      // Replace last operator with new one
      currentInput = currentInput.slice(0, -1) + op;
    }
  } else {
    currentInput += op;
  }
  updateDisplay();
}

function addDecimal() {
  const lastNumber = getLastNumber(currentInput);
  if (!lastNumber.includes('.')) {
    if (endsWithOperator(currentInput) || currentInput === '') {
      currentInput += '0.';
    } else {
      currentInput += '.';
    }
    updateDisplay();
  }
}

function clearAll() {
  currentInput = '0';
  updateDisplay();
}

function calculate() {
  try {
    // Remove trailing operators
    while (endsWithOperator(currentInput)) {
      currentInput = currentInput.slice(0, -1);
    }
    // Replace % with /100 for percentage calculation
    let expression = currentInput.replace(/%/g, "/100");

    // Evaluate safely
    const result = Function('"use strict";return (' + expression + ')')();

    // Format result to avoid floating point precision errors (max 8 decimals)
    const formattedResult = Number.isFinite(result) ? +parseFloat(result).toFixed(8) : 'Error';

    currentInput = formattedResult.toString();
    updateDisplay();
  } catch (e) {
    currentInput = 'Error';
    updateDisplay();
  }
}

document.querySelectorAll('[data-number]').forEach(button => {
  button.addEventListener('click', e => {
    if (currentInput === 'Error') clearAll();
    appendNumber(e.target.dataset.number);
  });
});

document.querySelectorAll('.operator').forEach(button => {
  button.addEventListener('click', e => {
    if (currentInput === 'Error') clearAll();
    appendOperator(e.target.dataset.operator);
  });
});

document.getElementById('decimal').addEventListener('click', () => {
  if (currentInput === 'Error') clearAll();
  addDecimal();
});

document.getElementById('clear').addEventListener('click', clearAll);
document.getElementById('equals').addEventListener('click', () => {
  if (currentInput !== 'Error') calculate();
});
