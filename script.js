const expression = document.getElementById("expression");
const result = document.getElementById("result");
const historyList = document.getElementById("history-list");
const buttons = document.querySelectorAll(".buttons button");
const themeBtn = document.getElementById("theme-btn");
const clearHistory = document.getElementById("clear-history");

let currentExpression = "";

// ==========================
// Update Display
// ==========================
function updateDisplay() {

    expression.value = currentExpression;

    if (currentExpression === "") {
        result.value = "";
        return;
    }

    try {
        result.value = eval(currentExpression);
    }
    catch {
        result.value = "";
    }

}

// ==========================
// Add History
// ==========================
function addHistory(exp, ans) {

    if (historyList.innerHTML.includes("No calculations yet")) {
        historyList.innerHTML = "";
    }

    const li = document.createElement("li");

    const time = new Date().toLocaleTimeString();

    li.innerHTML = `
        <strong>${exp} = ${ans}</strong><br>
        <small>${time}</small>
    `;

    historyList.prepend(li);

    localStorage.setItem("history", historyList.innerHTML);

}

// ==========================
// Button Clicks
// ==========================
buttons.forEach(button => {

    button.addEventListener("click", () => {

        let value = button.textContent;
        const action = button.dataset.action;

        if (value === "×") value = "*";
        if (value === "÷") value = "/";
        if (value === "−") value = "-";

        // ==========================
        // Square Root
        // ==========================
        if (action === "sqrt") {

            if (currentExpression === "") return;

            try {

                const number = eval(currentExpression);

                if (number < 0) {
                    result.value = "Invalid";
                    return;
                }

                const answer = Math.sqrt(number);

                currentExpression = answer.toString();

                expression.value = currentExpression;
                result.value = answer;

                addHistory(`√(${number})`, answer);

            }
            catch {

                result.value = "Error";

            }

            return;

        }

        // ==========================
        // Square
        // ==========================
        if (action === "square") {

            if (currentExpression === "") return;

            try {

                const number = eval(currentExpression);

                const answer = number * number;

                currentExpression = answer.toString();

                expression.value = currentExpression;
                result.value = answer;

                addHistory(`${number}²`, answer);

            }
            catch {

                result.value = "Error";

            }

            return;

        }

        // ==========================
        // Cube
        // ==========================
        if (action === "cube") {

            if (currentExpression === "") return;

            try {

                const number = eval(currentExpression);

                const answer = Math.pow(number, 3);

                currentExpression = answer.toString();

                expression.value = currentExpression;
                result.value = answer;

                addHistory(`${number}³`, answer);

            }
            catch {

                result.value = "Error";

            }

            return;

        }

        // ==========================
        // Pi
        // ==========================
        if (action === "pi") {

            currentExpression += Math.PI.toFixed(6);

            expression.value = currentExpression;

            try {

                result.value = eval(currentExpression);

            }
            catch {

                result.value = currentExpression;

            }

            return;

        }

        // ==========================
        // Normal Calculator
        // ==========================
        switch (value) {

            case "AC":

                currentExpression = "";
                expression.value = "";
                result.value = "";

                break;

            case "⌫":

                currentExpression = currentExpression.slice(0, -1);

                updateDisplay();

                break;

            case "=":

                try {

                    const answer = eval(currentExpression);

                    result.value = answer;

                    addHistory(currentExpression, answer);

                    currentExpression = answer.toString();

                    expression.value = currentExpression;

                }
                catch {

                    result.value = "Error";

                }

                break;

            default:

                currentExpression += value;

                updateDisplay();

        }

    });

});

// ==========================
// Keyboard Support
// ==========================
document.addEventListener("keydown", (event) => {

    const key = event.key;

    if (!isNaN(key)) {

        currentExpression += key;

        updateDisplay();

        return;

    }

    if (["+", "-", "*", "/", ".", "%"].includes(key)) {

        currentExpression += key;

        updateDisplay();

        return;

    }

    if (key === "Backspace") {

        currentExpression = currentExpression.slice(0, -1);

        updateDisplay();

        return;

    }

    if (key === "Escape") {

        currentExpression = "";

        expression.value = "";
        result.value = "";

        return;

    }

    if (key === "Enter") {

        try {

            const answer = eval(currentExpression);

            result.value = answer;

            addHistory(currentExpression, answer);

            currentExpression = answer.toString();

            expression.value = currentExpression;

        }
        catch {

            result.value = "Error";

        }

    }

});

// ==========================
// Theme
// ==========================
themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        themeBtn.textContent = "☀️";
    }
    else {
        themeBtn.textContent = "🌙";
    }

});

// ==========================
// Clear History
// ==========================
clearHistory.addEventListener("click", () => {

    historyList.innerHTML = "<li>No calculations yet</li>";

    localStorage.removeItem("history");

});

// ==========================
// Load History
// ==========================
window.onload = () => {

    const savedHistory = localStorage.getItem("history");

    if (savedHistory) {
        historyList.innerHTML = savedHistory;
    }

};







