const socket = io('http://0.0.0.0:5000');
const editor = document.getElementById('editor');

/**
 * Initialize the page
 *
 * @author Guilherme da Silva Martin
 */
function init() {
  joinRoom();
}

/**
 * Returns the name of the room sent by parameter
 *
 * @author Guilherme da Silva Martin
 */
function getRoomName() {
  let url = window.location.href;
  let roomName = url.split('/').reverse()[0];

  return roomName;
}

/**
 * Connects to desired room
 *
 * @author Guilherme da Silva Martin
 */
function joinRoom() {
  socket.emit('join-code', getRoomName());
}

/**
 * Handle receiving new messages
 *
 * @author Guilherme da Silva Martin
 */
socket.on('message', (data) => {
  editor.value = data;
});

/**
 * Function performed as soon as page is fully loaded
 *
 * @author Guilherme da Silva Martin
 */
$(document).ready(() => {
  init();
});
