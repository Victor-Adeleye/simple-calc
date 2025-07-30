const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");

// Calculator button values
const keys = [
  "C", "/", "*", "-",
  "7", "8", "9", "+",
  "4", "5", "6", "=",
  "1", "2", "3", "0",
  "."
];

// Generate buttons dynamically
keys.forEach(key => {
  const button = document.createElement("button");
  button.textContent = key;
  button.setAttribute("aria-label", `Button ${key}`);
  button.addEventListener("click", () => handleInput(key));
  buttons.appendChild(button);
});

// Append numbers or operators to display
function handleInput(value) {
  if (value === "C") {
    display.value = "";
  } else if (value === "=") {
    try {
      display.value = evaluate(display.value);
    } catch {
      display.value = "Error";
    }
  } else {
    display.value += value;
  }
}

// Safer alternative to eval()
function evaluate(expression) {
  const operators = /[+\-*/]/g;
  const tokens = expression.split(operators).map(Number);
  const ops = expression.match(operators);

  if (!tokens || !ops) return expression;

  let result = tokens[0];
  for (let i = 0; i < ops.length; i++) {
    const next = tokens[i + 1];
    switch (ops[i]) {
      case "+": result += next; break;
      case "-": result -= next; break;
      case "*": result *= next; break;
      case "/": result /= next; break;
    }
  }
  return result;
}
