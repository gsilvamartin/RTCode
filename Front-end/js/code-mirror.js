/**
 * Configuração editor code-mirror
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
 * Atualiza o número de linhas digitadas e total do tamanho do arquivo
 * quando o usuário pressiona qualquer tecla do teclado.
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
 * Atualiza o editor quando o socket envia um novo código atualizado.
 * 
 * @author Guilherme da Silva Martin
 */
socket.on('message', (data) => {
    codeEditor.setValue(data);
});

/**
 * Altera o tema do code-mirror
 * 
 * @author Guilherme da Silva Martin
 */
function changeTheme(theme) {
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

/**
 * Muda a linguagem utilizada no code
 * 
 * @author Guilherme da Silva Martin
 * @param {*} mode 
 */
function changeCodeMirrorMode(mode) {
    codeEditor.setOption('mode', mode);
}

codeEditor.setSize('66.66666%', '100%');