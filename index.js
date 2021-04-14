'use strict';

let player = 'circle';

const buttons = document.querySelectorAll('.button');
console.log(buttons);

let playerPicture = document.querySelector('.player');

for (let i = 0; i < buttons.length; i += 1) {
  buttons[i].addEventListener('click', (event) => {
    console.log(buttons[i]);
    if (event.target.classList.contains('button')) {
      if (player === 'circle') {
        event.target.classList.replace('button', 'button--circle');
        player = 'cross';

        playerPicture.src = 'cross.svg';
        playerPicture.alt = 'Křížek';
        player.src;
        event.target.disabled = true;
      } else if (player === 'cross') {
        event.target.classList.replace('button', 'button--cross');
        player = 'circle';

        playerPicture.src = 'circle.svg';
        playerPicture.alt = 'Kolečko';
        event.target.disabled = true;
      }
    }
  });
}
