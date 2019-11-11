const socket = io('http://localhost:3000');
const editor = document.getElementById('editor');

editor.addEventListener('keyup', (evt) => {
  const text = editor.value;

  socket.send(text);
});

socket.on('message', (data) => {
  editor.value = data;
});
