const socket = io('http://localhost:5000');
const editor = document.getElementById('editor');

/**
 * Retorna o nome da sala enviado por parâmetro
 *
 * @author Guilherme da Silva Martin
 */
function getRoomName() {
    let url = window.location.href;
    let roomName = url.split('?').reverse()[0];

    return roomName;
}

/**
 * Conecta na sala desejada
 *
 * @author Guilherme da Silva Martin
 */
function joinRoom() {
    socket.emit('join', getRoomName());
}

/**
 * Inicializa a página
 *
 * @author Guilherme da Silva Martin
 */
function init() {
    joinRoom();
}

/**
 * Handle que recebe mensagens novas
 * 
 * @author Guilherme da Silva Martin
 */
socket.on('message', (data) => {
    editor.value = data;
});

$(document).ready(() => {
    init();
});