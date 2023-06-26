var firstParameter, secondParameter, result;
var secondMassive = [];
var letterToDigit = {};
var usedLetters = '';


function setParameters(inputNumber){
    var isValidNumber = false;

    // Въвеждане и валидиране на входните данни за първия параметър
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

     // Въвеждане и валидиране на входните данни за първия параметър
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
    
    // Изчисляване на резултата от умножението
    result = firstParameter * secondParameter;

    // Преобразуване на втория множител в текстов масив от данни
    secondMassive = secondParameter.toString().split('').reverse().map(Number);
}

function generateExpression() {

    // Създаване на списък с латинските букви, разбъркване и вземане на парвите 10
    var letters = Array.from({length: 26}, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i))
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);

    // Добавяне на буквите към сложен обек с отношението им букви към цифри
    letters.forEach((letter, index) => {
      letterToDigit[index] = letter;
    });
  
    var firstExpression = convertDigitsToLetter(firstParameter, letterToDigit);
    var secondExpression = convertDigitsToLetter(secondParameter, letterToDigit);

    // Добавяне на буквените стоиности към използваните букви
    usedLetters += firstExpression;
    usedLetters += secondExpression;
    
    var expression = firstExpression + ' * ' + secondExpression;

    // Празен арай за бъдещата таблица
    var letterMatrix = []; 

    // Добавяне към таблицата на суб арай с буквите за умножението на двата множителя
    letterMatrix.push(expression.split('')); 

    // Дължина на израза за умножението на множителите
    var rowLength = expression.length;
  
    // Попълване на таблицата с буквите за отпечатване с резултатите от умножаването
    for (var i = 0; i < secondMassive.length; i++) {
      var sum = firstParameter * secondMassive[i];
      var sumToString = convertDigitsToLetter(sum, letterToDigit)
      var textResult = ' '.repeat(rowLength - sum.toString().length - i) + sumToString;
      usedLetters += sumToString;
      var subArray = textResult.split('');
      letterMatrix.push(subArray);
    }
  
    // Преобразуване на резултата от умножението в букви
    var textResult = convertDigitsToLetter(result, letterToDigit);
    // Добавяне на резултата кам списъка с изпоплзваните букви
    usedLetters += textResult;
    // Изчисляване на дължината на краиния резултат и преобразужането му в маасив
    var textResultToPrint = (' '.repeat(rowLength - result.toString().length) + textResult).split('');

    // Добавяне към таблицата на суб арай с буквите за резултата от умножението на двата множителя
    letterMatrix.push(textResultToPrint)

    // Добавяне на знака '+' в масива от данни, за по добра визуализация на действията
    letterMatrix[Math.ceil(secondMassive.length / 2)][0] = '+';

    const table = document.querySelector('table');

    // Изграждане на таблица спрямо данните от матрицата с букви ("letterMatrix")
    letterMatrix.forEach((x, index) => {
      const row = document.createElement('tr');
      // Добавяне на подчертавания под парвия и преди последния ред в таблицата
      if(index == 0 || index == secondMassive.length) row.classList.add("border-between-rows");

      x.forEach(letter => {
        const cell = document.createElement('td');
        cell.textContent = letter;
        row.appendChild(cell);
      });
      table.appendChild(row);
    });

    SetFieldForSolution(letterMatrix);
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
  var table2 = document.getElementById('table2-task');

  function changeScale() {
    var scale = scaleSlider.value;
    tableContainer1.style.transform = 'scale(' + scale + ')';      
    tableContainer2.style.transform = 'scale(' + scale + ')';  

    const opacityValue = this.value;
    table2.style.opacity = scaleSlider["max"] - opacityValue;    
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

      for (var j = 1; j <= 11; j++) {
        var digitCell = document.createElement('td');
        var digitSpan = document.createElement('span');
 
        switch(j){
          case 1:
             digitSpan.textContent = '-';
             digitCell.appendChild(digitSpan);
             row.appendChild(digitCell);
            break;
          case 11:
             digitSpan.textContent = 0;
             digitSpan.classList.add('digit');
             digitSpan.setAttribute('data-digit', 0);
             digitCell.appendChild(digitSpan);
             row.appendChild(digitCell);
            break;
          default:
             digitSpan.textContent = j - 1;
             digitSpan.classList.add('digit');
             digitSpan.setAttribute('data-digit', j - 1);
             digitCell.appendChild(digitSpan);
             row.appendChild(digitCell);
            break;
        }      
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

function showList(){
  // Получаване на референция към текстовото поле с клас "fixed-bottom"
  const textArea = document.querySelector('.fixed-bottom'); 

  // Прочитане на информацията от обекта и отпечатване на един ред
  let output = '';
  for (const key in letterToDigit) {
    output += ` ${letterToDigit[key]} - ${key} /`;
  }

  // Записване на резултата в текстовото поле
  textArea.value += '\n' + output;
}


function SetFieldForSolution(letterMatrix) {
  var table = document.getElementById('table2-task');

  letterMatrix.forEach((x, index) => {
    const row = document.createElement('tr');
    if (index == 0 || index == letterMatrix.length - 2) {
      row.classList.add("border-between-rows");
    }

    x.forEach(letter => {
      const cell = document.createElement('td');

      if (/[a-zA-Z]/.test(letter)) {
        cell.textContent = '';
        createInputField(cell);
      } else {
        cell.textContent = letter;
      }
      
      row.appendChild(cell);
    });

    table.appendChild(row);
  });
}

function createInputField(cell) {
  const input = document.createElement('input');
  input.type = 'text';
  input.maxLength = 1;

  input.addEventListener('input', () => {
    const inputValue = Number(input.value);
    const isValidNumber = !isNaN(inputValue) && inputValue >= 0 && inputValue <= 9;

    if (!isValidNumber) {
      input.value = '';
    } else if (input.value.length > 1) {
      input.value = input.value.slice(0, 1);
    }
  });

  cell.appendChild(input);
}


setParameters();
generateExpression();
setTableLetterWithDigits();