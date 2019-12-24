import LocalEchoController from '../js/import/local-echo/local-echo.js';

let localEcho;
const term = new Terminal();

/**
 * Initialize terminal.
 *
 * @author Guilherme da Silva Martin
 */
function initTerminal() {
  term.setOption('theme', { background: '#2b2b2b' });
  term.open(document.getElementById('terminal'));
  localEcho = new LocalEchoController(term);

  term.write('Welcome to RTCode \r\n');
  term.write('\r\n');
  socket.emit('term-cmd', getLanguageCommand());
}

/**
 * Handle terminal socket response.
 *
 * @author Guilherme da Silva Martin
 */
socket.on('term-response', (result) => {
  term.write(result + '\r\n');
});

/**
 * Handle user key input.
 *
 * @author Guilherme da Silva Martin
 */
function handleUserInput() {
  localEcho
    .read('')
    .then((input) => {
      socket.emit('term-cmd', input);
      handleUserInput();
    })
    .catch((error) => console.log(`Error reading: ${error}`));
}

/**
 * Returns the command to init REPL.
 *
 * @author Guilherme da Silva Martin
 */
function getLanguageCommand() {
  return 'python';
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
