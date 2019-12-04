const term = new Terminal();

/**
 * Inicia o terminal
 * 
 * @author Guilherme da Silva Martin
 */
function initTerminal() {
    term.open(document.getElementById('terminal'));
    term.write('Term@RTCode: ~> Olá, mundo!');
}

$(document).ready(() => {
    initTerminal();
});