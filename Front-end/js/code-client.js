const socket = io(baseURL);
const editor = document.getElementById('editor');

/**
 * Initialize the page
 *
 * @author Guilherme da Silva Martin
 */
function init() {}

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
 * Connects to desired code room
 *
 * @author Guilherme da Silva Martin
 */
function joinCodeRoom(fileName) {
  socket.emit('join-code', getRoomName() + '#' + fileName);
}

/**
 * Function performed as soon as page is fully loaded
 *
 * @author Guilherme da Silva Martin
 */
$(document).ready(() => {
  init();
});
