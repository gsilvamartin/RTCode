/**
 * Code-mirror editor configuration.
 * 
 * @author Guilherme da Silva Martin
 */
let codeEditor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    lineNumbers: true,
    theme: 'darcula',
    autoCloseTags: true,
    autoCloseBrackets: true,
    scrollbarStyle: 'null',
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

/**
 * Updates number of lines typed and total file size
 * when the user presses any key on the keyboard.
 * 
 * @author Guilherme da Silva Martin
 */
codeEditor.on('keyup', (cm, event) => {
    const text = codeEditor.getValue();
    const room = getRoomName();

    $('#total-lines').text(getTotalLines());
    $('#total-size').text(getFileSize() + ' B');

    socket.send([room, text]);
});

/**
 * Update editor when socket sends new updated code.
 * 
 * @author Guilherme da Silva Martin
 */
socket.on('message', (data) => {
    codeEditor.setValue(data);
});

/**
 * Change the code mirror theme.
 * 
 * @author Guilherme da Silva Martin
 */
function changeTheme(theme) {
    codeEditor.setOption('theme', theme);
}

/**
 * Indent all code.
 * 
 * @author Guilherme da Silva Martin
 */
function indentAllLines() {
    for (let i = 0; i < codeEditor.lineCount(); i++) {
        codeEditor.indentLine(i);
    }
}

/**
 * Changes the language used in code.
 * 
 * @author Guilherme da Silva Martin
 * @param {*} mode 
 */
function changeCodeMirrorMode(mode) {
    codeEditor.setOption('mode', mode);
}

/**
 * Set code editor height and width.
 * 
 * @author Guilherme da Silva Martin
 */
codeEditor.setSize('66.66666%', '100%');