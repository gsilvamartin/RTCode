import LocalEchoController from '../js/import/local-echo/local-echo.js';

let localEcho;
const term = new Terminal({
  fontFamily: "'Roboto Mono', monospace",
  cols: 100,
  rows: 8,
  cursorBlink: true
});

/**
 * Initialize terminal.
 *
 * @author Guilherme da Silva Martin
 */
function initTerminal() {
  term.open(document.getElementById('terminal'));
  localEcho = new LocalEchoController(term);
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

  if(!vueApp.inExecution) handleUserInput();
});

/**
 * Handle terminal process end.
 *
 * @author Guilherme da Silva Martin
 */
socket.on('process-end', () => {
  vueApp.inExecution = false;
  handleUserInput();
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
