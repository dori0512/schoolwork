class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.reset();
    }

    reset() {
        this.currentNumber = '0';
        this.operator = null;
        this.previousNumber = null;
        this.isCalculating = false;
    }

    appendNumber(number) {
        if (this.isCalculating) {
            this.currentNumber = String(number);
            this.isCalculating = false;
        } else {
            if (this.currentNumber === '0') {
                this.currentNumber = String(number);
            } else {
                this.currentNumber += String(number);
            }
        }
        this.updateDisplay();
    }
    appendDecimal() {
        if (!this.currentNumber.includes('.')) {
            this.currentNumber += '.';
            this.updateDisplay();
        }
    }

    calculate() {
        let result;
        const previous = parseFloat(this.previousNumber);
        const current = parseFloat(this.currentNumber);

        if (isNaN(previous) || isNaN(current)) return;

        switch (this.operator) {
            case '+':
                result = previous + current;
                break;
            case '-':
                result = previous - current;
                break;
            case '*':
                result = previous * current;
                break;
            case '/':
                result = previous / current;
                break;
            default:
                return;
        }

        this.currentNumber = result.toString();
        this.operator = null;
        this.previousNumber = null;
        this.updateDisplay();
        this.isCalculating = true;
    }

    setOperator(operator) {
        if (this.operator !== null) {
            this.calculate();
        }
        this.operator = operator;
        this.previousNumber = this.currentNumber;
        this.isCalculating = true;
    }

    add() {
        this.setOperator('+');
    }

    subtract() {
        this.setOperator('-');
    }

    multiply() {
        this.setOperator('*');
    }

    divide() {
        this.setOperator('/');
    }

    updateDisplay() {
        this.display.innerText = this.currentNumber;
    }

    clearDisplay() {
        this.reset();
        this.display.innerText = "0";
    }
    squareRoot() {
        const result = Math.sqrt(parseFloat(this.currentNumber));
        this.currentNumber = result.toString();
        this.updateDisplay();
    }

    cubeRoot() {
        const result = Math.cbrt(parseFloat(this.currentNumber));
        this.currentNumber = result.toString();
        this.updateDisplay();
    }

    reciprocal() {
        const result = 1 / parseFloat(this.currentNumber);
        this.currentNumber = result.toString();
        this.updateDisplay();
    }

    negate() {
        const result = -parseFloat(this.currentNumber);
        this.currentNumber = result.toString();
        this.updateDisplay();
    }
}

const calculator = new Calculator();

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/\d/.test(key)) {
        calculator.appendNumber(parseInt(key));
    } else if (key === '.') {
        calculator.appendDecimal();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        calculator.setOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculator.calculate();
    }
});