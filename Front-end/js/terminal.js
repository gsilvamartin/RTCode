let inputLine = '';
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
        term.write('\r\n');
        term.write('~$ ');
    } else {
        if (data.domEvent.keyCode !== 37 && data.domEvent.keyCode !== 38 &&
            data.domEvent.keyCode !== 39 && data.domEvent.keyCode !== 40) {
            inputLine += data.key;
        }

        term.write(data.key);
    }
});

/**
 * Runs as soon as the page is ready.
 *
 * @author Guilherme da Silva Martin
 */
$(document).ready(() => {
    initTerminal();
});