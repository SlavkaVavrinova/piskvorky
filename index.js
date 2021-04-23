'use strict';

let player = 'circle';

const fields = document.querySelectorAll('.button');

let playerPicture = document.querySelector('.player');

//------

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

//-----------------------------------------------

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1;

  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

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

  let inColumn = 1;

  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

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

  return false;
};

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
        //------
        isWinningMove(field);
        if (isWinningMove(field) === true) {
          setTimeout(() => {
            alert(`Vyhrávají kolečka! Chcete odvetu?`);
            location.reload(true);
          }, 50);
        }
        //--------
      } else if (player === 'cross') {
        field.classList.replace('button', 'button--cross');
        player = 'circle';
        playerPicture.src = 'circle.svg';
        playerPicture.alt = 'Kolečko';
        field.disabled = true;
        //------
        isWinningMove(field);
        if (isWinningMove(field) === true) {
          setTimeout(() => {
            alert(`Vyhrávají křížky! Chcete odvetu?`);
            location.reload(true);
          }, 50);
        }
        //--------
      }
    }
  });
}

//S použitím nachystaných funkcí zjisti při každém tahu, jestli se nejedná o výherní. Nový kód navaž na event listener ze čtvrtého úkolu.

//toto bude blbě

//Funkci isWinningMove pusť s každým nově přidaným symbolem.

//Pokud vrátí true, zobraz alert s hláškou, který hráč vyhrál.
