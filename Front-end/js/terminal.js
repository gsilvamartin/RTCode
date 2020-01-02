import LocalEchoController from '../js/import/local-echo/local-echo.js';

let localEcho;
const term = new Terminal();

/**
 * Initialize terminal.
 *
 * @author Guilherme da Silva Martin
 */
function initTerminal() {
  term.setOption('cursorBlink', true);
  term.open(document.getElementById('terminal'));
  localEcho = new LocalEchoController(term);

  term.resize(100, 13) //columns, rows

  term.write('Welcome to RTCode \r\n');
  term.write('\r\n');
}

/**
 * Handle terminal socket response.
 *
 * @author Guilherme da Silva Martin
 */
socket.on('term-response', (result) => {
  localEcho.println(result);
  handleUserInput();
});

/**
 * Handle terminal process end.
 *
 * @author Guilherme da Silva Martin
 */
socket.on('process-end', (result) => {
  vueApp.inExecution = false;
});

/**
 * Handle user key input.
 *
 * @author Guilherme da Silva Martin
 */
function handleUserInput() {
  localEcho
    .read('$ ')
    .then((input) => {
      socket.emit('term-cmd', input);
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
