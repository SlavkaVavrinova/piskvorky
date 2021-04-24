'use strict';

let player = 'circle';

//Úkol 4

const fields = document.querySelectorAll('.button');
let playerPicture = document.querySelector('.player');

for (let i = 0; i < fields.length; i += 1) {
  fields[i].addEventListener('click', (event) => {
    console.log(fields[i]);
    const field = event.target;
    if (field.classList.contains('button')) {
      if (player === 'circle') {
        field.classList.replace('button', 'button--circle');
        player = 'cross';
        playerPicture.src = 'cross.svg';
        playerPicture.alt = 'Křížek';
        field.disabled = true;
        //Úkol 5
        isWinningMove(field);
        if (isWinningMove(field) === true) {
          setTimeout(() => {
            alert(`Vyhrávají kolečka! Chcete odvetu?`);
            location.reload();
          }, 50);
        }
        //
      } else if (player === 'cross') {
        field.classList.replace('button', 'button--cross');
        player = 'circle';
        playerPicture.src = 'circle.svg';
        playerPicture.alt = 'Kolečko';
        field.disabled = true;
        //Úkol 5
        isWinningMove(field);
        if (isWinningMove(field) === true) {
          setTimeout(() => {
            alert(`Vyhrávají křížky! Chcete odvetu?`);
            location.reload();
          }, 50);
        }
        //
      }
    }
  });
}

//Funkce pro úkol 5

const boardSize = 10;

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length) {
    if (field === fields[fieldIndex]) {
      break;
    }
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

const getField = (row, column) => fields[row * boardSize + column];

const getSymbol = (field) => {
  if (field.classList.contains('button--cross')) {
    return 'cross';
  } else if (field.classList.contains('button--circle')) {
    return 'circle';
  }
};

//Funkce  výhry

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  //Výhra v řádku
  let inRow = 1; // Jednička pro právě vybrané políčko

  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }
  //Výhra ve sloupečku
  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  //---------------Výhry v diagonále-----------------------

  let j; /*Potřebuji zároveň řádek i sloupec, proto navíc j*/

  let diagonal1 = 1;

  i = origin.row;
  j = origin.column;
  while (i > 0 && j > 0 && symbol === getSymbol(getField(i - 1, j - 1))) {
    diagonal1++;
    i--;
    j--;
  }

  i = origin.row;
  j = origin.column;
  while (
    i < boardSize - 1 &&
    j < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, j + 1))
  ) {
    diagonal1++;
    i++;
    j++;
  }

  if (diagonal1 >= symbolsToWin) {
    return true;
  }

  let diagonal2 = 1;

  i = origin.row;
  j = origin.column;
  while (
    i > 0 &&
    j < boardSize - 1 &&
    symbol === getSymbol(getField(i - 1, j + 1))
  ) {
    diagonal2++;
    i--;
    j++;
  }

  i = origin.row;
  j = origin.column;
  while (
    i < boardSize - 1 &&
    j > 0 &&
    symbol === getSymbol(getField(i + 1, j - 1))
  ) {
    diagonal2++;
    i++;
    j--;
  }

  if (diagonal2 >= symbolsToWin) {
    return true;
  }

  return false;
};
