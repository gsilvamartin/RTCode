/**
 * Retorna o tamanho do arquivo
 * 
 * @author Guilherme da Silva Martin
 */
function getFileSize() {
    let text = codeEditor.getValue();

    return text.length;
}

function getTotalLines() {
    const text = codeEditor.getValue();
    const lines = (text.match(/\n/g) || '').length + 1;

    return lines;
}