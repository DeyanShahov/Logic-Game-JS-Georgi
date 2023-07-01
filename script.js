var firstParameter, secondParameter, result;
var secondMassive = []; // Втория множител представен като масив
var letterToDigit = {}; // Списък с записани Букви към Цифри 
var usedLetters = ''; // Текст с използваните букви  
var letterMatrix = []; // Празен масив за бъдещата таблица с букви
var digitsMatrix = []; // Празен масив за бъдещата таблица с цифри
var solutionButtonFase = true; // Текущо състояние на бутона за резултат
var solutionMatrix = []; // Празен масив за бъдещата таблица за въвеждане на евентуални отговори
var tableLetterWithDigitsMatrix = [] // Празен масив за състоянието на клетките маркирани ли са или не

function inputAndSetParameters(inputNumber){

  // Проверка дали играта е ново стартирана или след рестарт
  if (isNaN(result)){
     // Въвеждане и валидиране на входните данни за параметрите
     while(isNaN(firstParameter) || isNaN(secondParameter)){
      var input = prompt("Въведете множителя до колко цифрен да е. Възможният избор е в интервала от 1 до 6:");
      var inputNumber = parseInt(input);

      // Валидация и записване на входните данни
      if (isNaN(inputNumber) || inputNumber < 1 || inputNumber > 6) {
        alert("Невалидно! Моля, въведете число от 1 до 6.");
      } else {
        setParameters(inputNumber);
      }};

  } else {
    // Рестартирване на играта, като вземам дължината на текущите параметрите и директно преизчислявам наново
    var lengthFirstParameter = firstParameter.toString().length;
    var lengthSecondParameter = secondParameter.toString().length;
    firstParameter = NaN ;
    secondParameter = NaN;
    setParameters(lengthFirstParameter);
    setParameters(lengthSecondParameter);
  }
 

  // Изчисляване на резултата от умножението
  result = firstParameter * secondParameter;

  // Преобразуване на втория множител в текстов масив от данни
  secondMassive = secondParameter.toString().split('').reverse().map(Number);
}

function setParameters(number){
    
  var parameter;

    switch (number) {
        case 1:
          parameter = Math.floor(Math.random() * 9) + 1;
          break;
        case 2:
          parameter = Math.floor(Math.random() * 90) + 10;
          break;
        case 3:
          parameter = Math.floor(Math.random() * 900) + 100;
          break;
        case 4:
          parameter = Math.floor(Math.random() * 9000) + 1000;
          break;
        case 5:
          parameter = Math.floor(Math.random() * 90000) + 10000;
          break;
        case 6:
          parameter = Math.floor(Math.random() * 900000) + 100000;
          break;
        case 7:
          firstParameter = Math.floor(Math.random() * 9000000) + 1000000;
          break;
        case 8:
          parameter = Math.floor(Math.random() * 90000000) + 10000000;
          break;
        case 9:
          parameter = Math.floor(Math.random() * 900000000) + 100000000;
          break;
        default:
          parameter = Math.floor(Math.random() * 999999999) + 1;
          break;
    }

    // Задаване конкретните стойности на двата основни параметъра, след като вече са били преобразувани в реялни числа
    isNaN(firstParameter) ? firstParameter = parameter : secondParameter = parameter;
}

function generateExpression() {

    // Създаване на списък с латинските букви, разбъркване и вземане на първите 10
    var letters = Array.from({length: 26}, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i))
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);

    // Добавяне на буквите към сложен обек с отношението им букви към цифри
    letters.forEach((letter, index) => {
      letterToDigit[index] = letter;
    });

    // Добавяне на цифрите към масива за цифри
    digitsMatrix.push((firstParameter + ' * ' + secondParameter ).split(''))
  
    // Обръщане на цифрите към букви
    var firstExpression = convertDigitsToLetter(firstParameter, letterToDigit);
    var secondExpression = convertDigitsToLetter(secondParameter, letterToDigit);

    // Добавяне на буквените стоиности към използваните букви
    usedLetters += firstExpression;
    usedLetters += secondExpression;
    
    var expression = firstExpression + ' * ' + secondExpression; 

    // Добавяне към таблицата на суб масив с буквите за умножението на двата множителя
    letterMatrix.push(expression.split('')); 

    // Дължина на израза за умножението на множителите
    var rowLength = expression.length;
  
    // Попълване на таблицата с буквите за отпечатване с резултатите от умножаването
    for (var i = 0; i < secondMassive.length; i++) {
      var sum = firstParameter * secondMassive[i];
      var sumToString = convertDigitsToLetter(sum, letterToDigit)
      var sumText = ' '.repeat(rowLength - sum.toString().length - i) + sumToString;
      usedLetters += sumToString;
      var subArray = sumText.split('');
      letterMatrix.push(subArray);

      var test = ' '.repeat(rowLength - sum.toString().length - i) + sum;
      digitsMatrix.push(test.split(''));
    }
  
    // Преобразуване на резултата от умножението в букви
    var sumResult = convertDigitsToLetter(result, letterToDigit);
    // Добавяне на резултата кам списъка с изпоплзваните букви
    usedLetters += sumResult;
    // Изчисляване на дължината на краиния резултат и преобразужането му в маасив от букви
    var textResultToPrint = (' '.repeat(rowLength - result.toString().length) + sumResult).split('');

    digitsMatrix.push((' '.repeat(rowLength - result.toString().length) + result).split(''));

    // Добавяне към таблицата на суб арай с буквите за резултата от умножението на двата множителя
    letterMatrix.push(textResultToPrint)

    // Добавяне на знака '+' в масива от данни, за по добра визуализация на действията
    letterMatrix[Math.ceil(secondMassive.length / 2)][0] = '+';

    printMatrix(letterMatrix);

    setFieldForSolution(letterMatrix);    
}

function createSolutionMatrix() {
  var rows = letterMatrix.length;
  var columns = letterMatrix[0].length;

  solutionMatrix = Array.from({ length: rows }, () => new Array(columns));
}

function printMatrix( matrix ) {
  const table = document.querySelector('table');

  // Изграждане на таблица спрямо данните от подадената матрицата
  matrix.forEach((x, index) => {
    const row = document.createElement('tr');
    // Добавяне на подчертавания под парвия и преди последния ред в таблицата
    if (index == 0 || index == secondMassive.length) row.classList.add("border-between-rows");

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

function setTableLetterWithDigits( game = 'new'){
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
    let row = cell.dataset.row;
    let coll = cell.dataset.coll;

    if (cell.tagName === 'SPAN' && cell.classList.contains('digit')) {
      cell.classList.toggle('marked');
      let isTrue = tableLetterWithDigitsMatrix[row][coll];
      tableLetterWithDigitsMatrix[row][coll] = isTrue ? false : true;

      checkLastPosibleDigit(row);
    }
  }

  var lettersContainer = document.getElementById('letters-container');

  var uniqueUsedLettersArray = filterUniqueLetters(); // Обединяване на уникалните символи в низ

  // Създавам нов празен масив ( попалнен със стоиноста false) за маркирване да се запаметява при saveGame
  if(game === 'new') tableLetterWithDigitsMatrix = Array.from({ length: uniqueUsedLettersArray.length }, 
      () => Array.from({ length: 10 }, () => false));

  for (var i = 0; i < uniqueUsedLettersArray.length; i++) {
      var row = document.createElement('tr');

      for (var j = 1; j <= 11; j++) {
        var digitCell = document.createElement('td');
        var digitSpan = document.createElement('span');
        digitSpan.setAttribute('data-row', i);
        digitSpan.setAttribute('data-coll', j - 2);
 
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
        
        // Ако играте е от тип Заредена, то да попални ако има маркирани полета из таблицата
        if(game === 'load' && tableLetterWithDigitsMatrix[i][j-2]) digitSpan.classList.toggle('marked'); 
      }    

      row.addEventListener('mousedown', toggleMark);
      lettersContainer.appendChild(row);
    }

  //  Добавям буква в началото на всеки ред
  var rows = lettersContainer.getElementsByTagName('tr');

  for (var i = 0; i < uniqueUsedLettersArray.length; i++) {
    var letter = uniqueUsedLettersArray[i];
    var cell = document.createElement('td');
    cell.textContent = '?/' + letter;
    rows[i].insertBefore(cell, rows[i].firstChild);
  }

  if(game === 'load'){
    for (let index = 0; index < uniqueUsedLettersArray.length; index++) {
      checkLastPosibleDigit(index);    
    }
  }
}

function filterUniqueLetters() {
  return usedLetters
    .split('')
    .filter(function (item, index, arr) {
      return arr.indexOf(item) === index; // Филтриране на уникалните символи
    })
    .join("");
}

function showList(){
  // Получаване на референция към текстовото поле с клас "fixed-bottom"
  const textArea = document.querySelector('.fixed-bottom'); 

  // Прочитане на информацията от обекта и отпечатване на един ред
  let output = '';
  for (const key in letterToDigit) {

    var letter = letterToDigit[key];

    if(usedLetters.includes(letter)){
      output += ` ${letter} - ${key} /`;
    }
  }

  // Записване на резултата в текстовото поле
  textArea.value += '\n' + output;
}


function setFieldForSolution(letterMatrix, game = 'new') {
  var table = document.getElementById('table2-task');

  letterMatrix.forEach((x, indexRow) => {
    var row = document.createElement('tr');
    if (indexRow == 0 || indexRow == letterMatrix.length - 2) {
      row.classList.add("border-between-rows");
    }

    x.forEach((letter, indexCol) => {
      var cell = document.createElement('td');

      cell.setAttribute('data-row', indexRow);
      cell.setAttribute('data-coll', indexCol);

      if (/[a-zA-Z]/.test(letter)) {
        cell.textContent = '';
        createInputField(cell, game);
      } else {
        cell.textContent = letter;
      }
      
      row.appendChild(cell);
    });

    table.appendChild(row);
  });

  // Генерирам масив в който ще се записват цифрите които са открити ако играта е нова
  if(game === 'new')  createSolutionMatrix();
}

function createInputField(cell, game) {
  var input = document.createElement('input');
  input.type = 'text';
  input.maxLength = 1;

  // Проверка дали изграждането на полетата е за игра след изтегляне на save
  // Ако се изпълни попълва таблицата
  if(game === 'load')
  {
    var isNumber = solutionMatrix[cell.dataset.row][cell.dataset.coll];

    if(!isNaN(isNumber)) input.value = isNumber;
  };

  input.addEventListener('input', () => {
    var inputValue = Number(input.value);
    var isValidNumber = !isNaN(inputValue) && inputValue >= 0 && inputValue <= 9;

    if (!isValidNumber) {
      input.value = '';
    } else {
      var value = input.value.slice(0, 1);
      input.value = value;
      solutionMatrix[cell.dataset.row][cell.dataset.coll] = value;
    }
  });

  cell.appendChild(input);
}


function executeCommand() {
  const textarea = document.getElementById('Textarea');
  const command = getSelectedText(textarea);

  switch(command){
    case "showList":
      showList();
      break;
    case "clear":
      clearTextarea();
      break;
    default:
      console.log('Невалидна команда');
      break;
  }
}

function getSelectedText(element) {
  const start = element.selectionStart;
  const end = element.selectionEnd;
  return element.value.substring(start, end).trim();
}

function deleteAllTables() {
  var table = document.getElementById('table-task'); // Идентификация на елемента, която искаме да изтрием
  deleteElements(table);

  var table2 = document.getElementById('table2-task');
  deleteElements(table2);

  var tbody = document.getElementById('letters-container');
  deleteElements(tbody);
}


function deleteElements(element) {
  while (element.firstChild) {
    element.firstChild.remove();  // Изтриване на първия дете елемент (ред) докато има такива
  }
}

function clearTextarea() {
  var textarea = document.getElementById('Textarea');
  textarea.value = '';
}

function reloadGame(){
  usedLetters = "";
  letterToDigit = {};
  secondMassive = [];
  letterMatrix = [];
  digitsMatrix = [];
  solutionMatrix = [];
  tableLetterWithDigitsMatrix = [];

  inputAndSetParameters();
  deleteAllTables();
  generateExpression();
  setTableLetterWithDigits();
  runTimer();
}

function showSolution(){
  var table = document.getElementById('table-task'); // Идентификация на елемента, която искаме да изтрием
  deleteElements(table);

  if(solutionButtonFase){
    printMatrix(digitsMatrix);
    solutionButtonFase = false;
  }else{
    printMatrix(letterMatrix);
    solutionButtonFase = true;
  }
}

function clearTable(){
  var tbody = document.getElementById('letters-container');
  deleteElements(tbody);

  setTableLetterWithDigits();
}

function runTimer(){
   // Функция за форматиране на числото с водеща нула
   function formatNumber(number) {
    return number < 10 ? "0" + number : number;
  }

  // Функция за обновяване на таймера
  function updateTimer() {
    var currentTime = new Date();
    var elapsedTime = currentTime - startTime;

    // Пресмятане на изминалото време в часове, минути и секунди
    var hours = Math.floor(elapsedTime / 3600000);
    var minutes = Math.floor((elapsedTime % 3600000) / 60000);
    var seconds = Math.floor((elapsedTime % 60000) / 1000);

    // Форматиране на числата с водеща нула
    var formattedHours = formatNumber(hours);
    var formattedMinutes = formatNumber(minutes);
    var formattedSeconds = formatNumber(seconds);

    // Показване на времето във формата "час : минути : секунди"
    document.getElementById("timer").textContent = formattedHours + " : " + formattedMinutes + " : " + formattedSeconds;

    // Повтаряне на функцията за обновяване на таймера на следващият тик
    requestAnimationFrame(updateTimer);
  }

  // Запазване на стартовата дата и стартиране на таймера
  var startTime = new Date();
  updateTimer();
}

function checkLastPosibleDigit(row){
  let falseCount = 0;
  let falseIndex = -1;

  for (let index = 0; index < tableLetterWithDigitsMatrix[row].length; index++) {
    if(tableLetterWithDigitsMatrix[row][index] === false){
      falseCount++;
      falseIndex = index;
    }

    if (falseCount > 1 ) break;
  }

  let lettersContainer = document.getElementById('letters-container');
  let cell = lettersContainer.rows[row].cells[0];
  let cellOldTContent = cell.textContent;

  if (falseCount === 1) {    
    cell.textContent = (falseIndex + 1 === 10 ? 0 : falseIndex + 1) + '/' + cellOldTContent[cellOldTContent.length - 1];
  } else {
    cell.textContent = '?/' + cellOldTContent[cellOldTContent.length - 1]; 
  }
}

function saveGame(){
  var toSave = {
    firstParameter : firstParameter,
    secondParameter : secondParameter,
    result : result,
    secondMassive : secondMassive,
    letterToDigit : letterToDigit,
    usedLetters : usedLetters,
    letterMatrix : letterMatrix,
    digitsMatrix : digitsMatrix,
    solutionButtonFase : solutionButtonFase,
    solutionMatrix : solutionMatrix,
    tableLetterWithDigitsMatrix : tableLetterWithDigitsMatrix
  };

  // Преобразуване на масива в JSON
  var json = JSON.stringify(toSave);

  // Записване на JSON в localStorage
  localStorage.setItem('game', json);

  // Получаване на референция към текстовото поле с клас "fixed-bottom"
  const textArea = document.querySelector('.fixed-bottom'); 

  // Записване на резултата в текстовото поле
  textArea.value += '\n' + 'Играта е запаметена!';
}

function loadGame(){
  // Получаване на референция към текстовото поле с клас "fixed-bottom"
  const textArea = document.querySelector('.fixed-bottom'); 

  if (localStorage.getItem('game') !== null) {
    // Взимане на JSON от localStorage
    var storedJson = localStorage.getItem('game');

    // Преобразуване на JSON в масиви
    var gameData = JSON.parse(storedJson);

    // Презаписване на данните от фаила към текущата игра 
    firstParameter = gameData.firstParameter,
    secondParameter = gameData.secondParameter;
    result = gameData.result;
    secondMassive = gameData.secondMassive;
    letterToDigit = gameData.letterToDigit;
    usedLetters = gameData.usedLetters;
    letterMatrix = gameData.letterMatrix;
    digitsMatrix = gameData.digitsMatrix;
    solutionButtonFase = gameData.solutionButtonFase;
    solutionMatrix = gameData.solutionMatrix;
    tableLetterWithDigitsMatrix = gameData.tableLetterWithDigitsMatrix;

    // Премахване на старата визуализация
    deleteAllTables()

    // Стартиране на играта използвайки данните
    printMatrix(letterMatrix);
    setFieldForSolution(letterMatrix, 'load');
    setTableLetterWithDigits('load');

    // Използване на масивите
    textArea.value += '\n' + 'Играта е заредена!';
  } else {
    // Записване на резултата в текстовото поле
    textArea.value += '\n' + 'Няма запаметена игра!';
  }
}


function initializeGame(){
  inputAndSetParameters();
  //setParameters();
  generateExpression();
  setTableLetterWithDigits();
  runTimer();
}


initializeGame();