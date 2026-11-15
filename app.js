const display = document.querySelector(".display");
const currPara = document.querySelector(".current");
const prevPara = document.querySelector(".previous");
const buttonsContainerRef = document.querySelector(".buttons");
const numButtons = document.querySelectorAll("button[data-number]");
const opButtons = document.querySelectorAll("button[data-operator]");
const equalBtn = document.querySelector("button[data-action='=']");
const clearBtn = document.querySelector("button[data-action='C']");

[...numButtons].forEach((button) =>
  button.addEventListener("click", function (e) {
    let num = e.target.dataset.number;
    addDigit(num);
  }),
);
[...opButtons].forEach((button) =>
  button.addEventListener("click", function (e) {
    let op = e.target.dataset.operator;
    addOperator(op);
  }),
);
equalBtn.addEventListener("click", function (e) {
  console.log("sss");
  onEqual();
});
clearBtn.addEventListener("click", function (e) {
  clear();
  updateUI();
});
let firstNum = "";
let secondNum = "";
let operator = "";
let currentInput = "";
let result = "";
let resultDisplayed = false;
window.addEventListener("keydown", function (e) {
  // console.log(e.key);
});
function onEqual() {
  if (!firstNum || !operator || !secondNum) return;

  result = operate(operator, +firstNum, +secondNum);
  if (typeof result === "string") {
    clear();
    updateUI();
    currPara.textContent = result;
    return;
  }
  resultDisplayed = true;
  updateUI();
}
function addDigit(digit) {
  if (resultDisplayed) {
    clear();
  }
  if (!firstNum) {
    firstNum += digit;
    updateUI();
    return;
  }
  if (firstNum && !operator) {
    if (firstNum == "0" && digit == "0") return updateUI();
    if (firstNum === "0" && digit !== "0") {
      firstNum = digit;
      return updateUI();
    }
    firstNum += digit;
    updateUI();
    return;
  }
  if (firstNum && operator) {
    secondNum += digit;
    updateUI();
    return;
  }
}
function updateUI() {
  if (resultDisplayed) {
    prevPara.textContent = `${firstNum} ${operator} ${secondNum} =`;
    currPara.textContent = result;
  }
  if (!firstNum) {
    prevPara.textContent = "";
    currPara.textContent = "0";
  }

  if (firstNum && !operator) currPara.textContent = firstNum;
  if (firstNum && operator && !resultDisplayed) {
    prevPara.textContent = `${firstNum} ${operator}`;
    currPara.textContent = secondNum || "0";
  }
}
function clear() {
  firstNum = "";
  secondNum = "";
  operator = "";
  currentInput = "";
  resultDisplayed = false;
}
function addOperator(op) {
  if (!operator) {
    operator = op;
    updateUI();
    return;
  }
  if (operator && firstNum && secondNum) {
    firstNum = operate(operator, +firstNum, +secondNum);
    if (typeof firstNum === "string") {
      clear();
      updateUI();
      return;
    }
    secondNum = "";
    operator = op;
    resultDisplayed = false;
    updateUI();
  }
}
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) {
    return "Ha..cant divide by 0";
  }
  return a / b;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
      break;
    case "-":
      return subtract(num1, num2);
      break;
    case "*":
      return multiply(num1, num2);
      break;
    case "/":
      return divide(num1, num2);
  }
}
