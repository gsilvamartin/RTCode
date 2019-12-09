let inputLine = '';
let lineCursor = 0;
const term = new Terminal();

/**
 * Initialize terminal.
 *
 * @author Guilherme da Silva Martin
 */
function initTerminal() {
    term.open(document.getElementById('terminal'));

    term.write('Welcome to RTCode \r\n');
    term.write('\r\n');
    term.write('~$ ');
}

/**
 * Handle user key input.
 * 
 * @author Guilherme da Silva Martin
 */
term.onKey((data) => {
    if (data.domEvent.keyCode === 38 || data.domEvent.keyCode === 40) return;

    if (data.domEvent.key === 'Enter') {
        inputLine = '';
        writeNewTerminalLine();
    } else if (isArrowKeyCode(data.domEvent.keyCode)) {
        incrementOrDecrementArrowCursor(data);
    } else {
        term.write(data.key);
    }
});

/**
 * Write a new line in terminal.
 * 
 * @author Guilherme da Silva Martin
 */
function writeNewTerminalLine() {
    term.write('\r\n');
    term.write('~$ ');
}

/**
 * Increments or decrements the cursor taking as parameter
 * the arrow that is entered.
 * 
 * @author Guilherme da Silva Martin
 */
function incrementOrDecrementArrowCursor(data) {
    switch (data.domEvent.keyCode) {
        case 37:
            if (getCursorPosition().cursorX > 3) {
                lineCursor -= 1;
                term.write(data.key);
            }
            break;
        case 39:
            lineCursor += 1;
            term.write(data.key);
            break;
        default:
            break;
    }
}

/**
 * 
 * 
 * @author Guilherme da Silva Martin
 */
function getCursorPosition() {
    return { cursorX: term.buffer.cursorX, cursorY: term.buffer.cursorY };
}

/**
 * Verify if keycode is a arrow key
 * 
 * @author Guilherme da Silva Martin
 */
function isArrowKeyCode(keyCode) {
    if (keyCode !== 37 && keyCode !== 38 &&
        keyCode !== 39 && keyCode !== 40) {
        return false;
    } else {
        return true;
    }
}

/**
 * Runs as soon as the page is ready.
 *
 * @author Guilherme da Silva Martin
 */
$(document).ready(() => {
    initTerminal();
});