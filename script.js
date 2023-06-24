var firstParameter, secondParameter, result;
var secondMassive = [];


function setParameters(inputNumber){
    var isValidNumber = false;

    while(!isValidNumber){
        var input = prompt("Въведете първия множител до колко цифрен да е. Възможният избор е в интервала от 1 до 9:");
        var inputNumber = parseInt(input);

        if (isNaN(inputNumber) || inputNumber < 1 || inputNumber > 9) {
            alert("Невалидно! Моля, въведете число от 1 до 9.");
          } else {
            isValidNumber = true;
          }
    }

    switch (inputNumber) {
        case 1:
          firstParameter = Math.floor(Math.random() * 9) + 1;
          break;
        case 2:
          firstParameter = Math.floor(Math.random() * 90) + 10;
          break;
        case 3:
          firstParameter = Math.floor(Math.random() * 900) + 100;
          break;
        case 4:
          firstParameter = Math.floor(Math.random() * 9000) + 1000;
          break;
        case 5:
          firstParameter = Math.floor(Math.random() * 90000) + 10000;
          break;
        case 6:
          firstParameter = Math.floor(Math.random() * 900000) + 100000;
          break;
        case 7:
          firstParameter = Math.floor(Math.random() * 9000000) + 1000000;
          break;
        case 8:
          firstParameter = Math.floor(Math.random() * 90000000) + 10000000;
          break;
        case 9:
          firstParameter = Math.floor(Math.random() * 900000000) + 100000000;
          break;
        default:
          firstParameter = Math.floor(Math.random() * 999999999) + 1;
          break;
    }

    var isValidNumber = false;

    while (!isValidNumber) {
        var input = prompt("Въведете втория множител до колко цифрен да е. Възможният избор е в интервала от 1 до 9:");
        inputNumber = parseInt(input);
    
        if (isNaN(inputNumber) || inputNumber < 1 || inputNumber > 9) {
          alert("Невалидно! Моля, въведете число от 1 до 9.");
        } else {
          isValidNumber = true;
        }
    }

    switch (inputNumber) {
        case 1:
          secondParameter = Math.floor(Math.random() * 9) + 1;
          break;
        case 2:
          secondParameter = Math.floor(Math.random() * 90) + 10;
          break;
        case 3:
          secondParameter = Math.floor(Math.random() * 900) + 100;
          break;
        case 4:
          secondParameter = Math.floor(Math.random() * 9000) + 1000;
          break;
        case 5:
          secondParameter = Math.floor(Math.random() * 90000) + 10000;
          break;
        case 6:
          secondParameter = Math.floor(Math.random() * 900000) + 100000;
          break;
        case 7:
          secondParameter = Math.floor(Math.random() * 9000000) + 1000000;
          break;
        case 8:
          secondParameter = Math.floor(Math.random() * 90000000) + 10000000;
          break;
        case 9:
          secondParameter = Math.floor(Math.random() * 900000000) + 100000000;
          break;
        default:
          secondParameter = Math.floor(Math.random() * 999999999) + 1;
          break;
    }
    
    result = firstParameter * secondParameter;
    secondMassive = secondParameter.toString().split('').reverse().map(Number);
}

function generateExpression() {

    var letters = Array.from({length: 26}, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i))
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
  
    var letterToDigit = {};
    letters.forEach((letter, index) => {
      letterToDigit[index] = letter;
    });
  
    var firstExpression = convertDigitsToLetter(firstParameter, letterToDigit);
    var secondExpression = convertDigitsToLetter(secondParameter, letterToDigit);
    
    var expression = firstExpression + ' * ' + secondExpression;

    var letterMatrix = []; // Prazen array za badeshtata tablica

    letterMatrix.push(expression.split('')); //Adva parviq sub array sadarjasht parviq red s umnojenieto na dvete chisla

  
    var rowLength = expression.length;
  
    for (var i = 0; i < secondMassive.length; i++) {
      var sum = firstParameter * secondMassive[i];
      var textResult = ' '.repeat(rowLength - sum.toString().length - i) + convertDigitsToLetter(sum, letterToDigit);// + '<br/>';
      var subArray = textResult.split('');
      letterMatrix.push(subArray);
    }
  

    var textResult = ' '.repeat(rowLength - result.toString().length) + convertDigitsToLetter(result, letterToDigit);

    letterMatrix.push(textResult.split(''))

    letterMatrix[Math.ceil(secondMassive.length / 2)][0] = '+';

    const table = document.querySelector('table');

    letterMatrix.forEach(x => {
      const row = document.createElement('tr');
      x.forEach(letter => {
        const cell = document.createElement('td');
        cell.textContent = letter;
        row.appendChild(cell);
      });
      table.appendChild(row);
    });

    var rows = table.getElementsByTagName('tr');
    rows[0].classList.add('underline-row');
    //rows[4].classList.add('underline-column');
}

function convertDigitsToLetter(number, letterToDigit) {
    var toPrint = '';
    number.toString().split('').forEach(function (n) {
      toPrint += letterToDigit[parseInt(n)];
    });
    return toPrint;
}

setParameters();
generateExpression();