import LocalEchoController from '../js/import/local-echo/local-echo.js';

let localEcho;
const term = new Terminal();

/**
 * Initialize terminal.
 *
 * @author Guilherme da Silva Martin
 */
function initTerminal() {
  joinRoom();
  term.setOption('theme', { background: '#2b2b2b' });
  term.open(document.getElementById('terminal'));
  localEcho = new LocalEchoController(term);

  term.write('Welcome to RTCode \r\n');
  term.write('\r\n');
}

/**
 * Handle user key input.
 *
 * @author Guilherme da Silva Martin
 */
function handleUserInput() {
  localEcho
    .read('~$ ')
    .then((input) => {
      socket.emit('cmd', [getRoomName() + '#' + getSelectedNode(), input]);
      socket.emit('term-enter', [getRoomName() + '#' + getSelectedNode(), input]);
    })
    .catch((error) => console.log(`Error reading: ${error}`));
}

/**
 * Runs as soon as the page is ready.
 *
 * @author Guilherme da Silva Martin
 */
$(document).ready(() => {
  initTerminal();
  handleUserInput();
});
