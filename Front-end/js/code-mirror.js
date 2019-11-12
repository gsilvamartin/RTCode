let codeEditor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    lineNumbers: true,
    theme: 'darcula'
});

codeEditor.on('keyup', (cm, event) => {
    const text = codeEditor.getValue();
    const room = getRoomName();

    socket.send([room, text]);
});

socket.on('message', (data) => {
    codeEditor.setValue(data);
});

codeEditor.setSize('100%', '100%');

/**
 * Altera o tema do code-mirror
 * 
 * @author Guilherme da Silva Martin
 */
function changeTheme() {
    const theme = $('#theme').val();

    codeEditor.setOption('theme', theme);
}