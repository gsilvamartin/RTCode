/**
 * Retorna o tamanho do arquivo
 *
 * @author Guilherme da Silva Martin
 */
function getFileSize() {
  let text = codeEditor.getValue();

  return text.length;
}

/**
 * Retorna o total de linhas no editor
 *
 * @author Guilherme da Silva Martin
 */
function getTotalLines() {
  const text = codeEditor.getValue();
  const lines = (text.match(/\n/g) || '').length + 1;

  return lines;
}

$(document).ready(() => {
  $('.modal').modal();
});
