const term = new Terminal();

/**
 * Inicia o terminal
 * 
 * @author Guilherme da Silva Martin
 */
function initTerminal() {
    term.open(document.getElementById('terminal'));
    term.write('$ \r\n');
    term.write('$');
}

/**
 * Runs as soon as the page is ready.
 * 
 * @author Guilherme da Silva Martin
 */
$(document).ready(() => {
    initTerminal();
});