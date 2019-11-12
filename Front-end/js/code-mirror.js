let codeEditor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    lineNumbers: true,
    theme: 'darcula',
    autoCloseTags: true,
    autoCloseBrackets: true,
    extraKeys: {
        'Ctrl-S': function(instance) {
            indentAllLines();
        },
        'Ctrl-Alt-F': function(instance) {
            indentAllLines();
        },
        'Ctrl-Space': 'autocomplete'
    }
});

codeEditor.on('keyup', (cm, event) => {
    const text = codeEditor.getValue();
    const room = getRoomName();
    $('#total-lines').text(getTotalLines());
    $('#total-size').text(getFileSize() + " B");

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

/**
 * Indenta todo o código
 * 
 * @author Guilherme da Silva Martin
 */
function indentAllLines() {
    for (let i = 0; i < codeEditor.lineCount(); i++) {
        codeEditor.indentLine(i);
    }
}