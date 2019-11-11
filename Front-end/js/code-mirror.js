let codeEditor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    lineNumbers: true,
    theme: 'darcula'
});

codeEditor.setSize('100%', '100%');

function changeTheme() {
    const theme = $('#theme').val();
}