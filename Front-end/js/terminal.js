const term = new Terminal();

/**
 * Initialize terminal.
 *
 * @author Guilherme da Silva Martin
 */
function initTerminal() {
    term.open(document.getElementById('terminal'));

    term.write('Hello World \r\n');
    term.write('~$ ');
}

/**
 * Handle user key input.
 * 
 * @author Guilherme da Silva Martin
 */
term.onKey((data) => {
    if (data.domEvent.key === 'Enter') {
        term.write('\r\n');
        term.write('~$ ');
    } else {
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