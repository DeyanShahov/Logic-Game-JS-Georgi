var firstParameter, secondParameter, result;
var secondMassive = [];
var letterToDigit = {};
var usedLetters = '';


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

    // Sazdavane na spisak s latinskite bukvi, razbarkvane i vzemane na pavite 10
    var letters = Array.from({length: 26}, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i))
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);

    //Dobavqne na bukvite kam slojen obekt s otnoshenieto im bukvi kam cifri
    letters.forEach((letter, index) => {
      letterToDigit[index] = letter;
    });
  
    var firstExpression = convertDigitsToLetter(firstParameter, letterToDigit);
    var secondExpression = convertDigitsToLetter(secondParameter, letterToDigit);

    //Dobavqne na bukvenite stoinosti kam izpolzvanite bukvi
    usedLetters += firstExpression;
    usedLetters += secondExpression;
    
    var expression = firstExpression + ' * ' + secondExpression;

    // Prazen array za badeshtata tablica
    var letterMatrix = []; 

    //Adva parviq sub array sadarjasht parviq red s umnojenieto na dvete chisla
    letterMatrix.push(expression.split('')); 

  
    var rowLength = expression.length;
  
    for (var i = 0; i < secondMassive.length; i++) {
      var sum = firstParameter * secondMassive[i];
      var sumToString = convertDigitsToLetter(sum, letterToDigit)
      var textResult = ' '.repeat(rowLength - sum.toString().length - i) + sumToString;
      usedLetters += sumToString;
      var subArray = textResult.split('');
      letterMatrix.push(subArray);
    }
  
    var textResult = convertDigitsToLetter(result, letterToDigit);
    usedLetters += textResult;
    var textResultToPrint = ' '.repeat(rowLength - result.toString().length) + textResult;

    letterMatrix.push(textResultToPrint.split(''))

    // Dobavqne na znaka '+' za vizualizaciq
    letterMatrix[Math.ceil(secondMassive.length / 2)][0] = '+';

    const table = document.querySelector('table');

    // Izgrajdane na tablicata sprqmo dannite ot matricata
    letterMatrix.forEach((x, index) => {
      const row = document.createElement('tr');
      // Dobavqne na podchertavanitq pod parviq i predi posledniq red
      if(index == 0 || index == secondMassive.length) row.classList.add("border-between-rows");

      x.forEach(letter => {
        const cell = document.createElement('td');
        cell.textContent = letter;
        row.appendChild(cell);
      });
      table.appendChild(row);
    });
}

function convertDigitsToLetter(number, letterToDigit) {
    var toPrint = '';
    number.toString().split('').forEach(function (n) {
      toPrint += letterToDigit[parseInt(n)];
    });
    return toPrint;
}

function setTableLetterWithDigits(){
  var scaleSlider = document.getElementById('scale-slider');
  var tableContainer1 = document.getElementById('table-container');
  var tableContainer2 = document.getElementById('table-task');

  function changeScale() {
    var scale = scaleSlider.value;
    tableContainer1.style.transform = 'scale(' + scale + ')';      
    tableContainer2.style.transform = 'scale(' + scale + ')';      
  }

  scaleSlider.addEventListener('input', changeScale);

  function toggleMark(event) {
    var cell = event.target;

    if (cell.tagName === 'SPAN' && cell.classList.contains('digit')) {
      cell.classList.toggle('marked');
    }
  }

  var lettersContainer = document.getElementById('letters-container');

  var uniqueUsedLettersArray = usedLetters
      .split('')
      .filter(function(item, index, arr) {
         return arr.indexOf(item) === index; // Филтриране на уникалните символи
      })
      .join(""); // Обединяване на уникалните символи в низ

  for (var i = 0; i < uniqueUsedLettersArray.length; i++) {
      var row = document.createElement('tr');

      for (var j = 0; j <= 10; j++) {
        var digitCell = document.createElement('td');
        var digitSpan = document.createElement('span');

        if(j == 0){
         digitSpan.textContent = '-';
         digitCell.appendChild(digitSpan);
         row.appendChild(digitCell);
        }
        else{
         digitSpan.textContent = j - 1;
         digitSpan.classList.add('digit');
         digitSpan.setAttribute('data-digit', j - 1);
         digitCell.appendChild(digitSpan);
         row.appendChild(digitCell);
        };        
      }

      row.addEventListener('mousedown', toggleMark);
      lettersContainer.appendChild(row);
    }

    var rows = lettersContainer.getElementsByTagName('tr');

    for (var i = 0; i < uniqueUsedLettersArray.length; i++) {
      var letter = uniqueUsedLettersArray[i];
      var cell = document.createElement('td');
      cell.textContent = letter;

      rows[i].insertBefore(cell, rows[i].firstChild);
    }
}

setParameters();
generateExpression();
setTableLetterWithDigits();