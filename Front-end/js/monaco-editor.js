let codeEditor;

/**
 * Init the editor.
 *
 * @author Guilherme da Silva Martin
 */
function initEditor() {
  require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.18.1/min/vs' } });

  window.MonacoEnvironment = {
    getWorkerUrl: function(workerId, label) {
      return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
              self.MonacoEnvironment = {
                  baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.18.1/min/'
              };
              importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.18.1/min/vs/base/worker/workerMain.js');`)}`;
    }
  };

  require(['vs/editor/editor.main'], () => {
    codeEditor = monaco.editor.create(document.getElementById('code-editor'), {
      language: codeLanguage,
      theme: 'vs-dark'
    });

    codeEditor.addCommand([monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S], () => {
      updateCodeFileContent();
    });

    codeEditor.onKeyUp(() => {
      const text = codeEditor.getValue();
      const room = getRoomName() + '#' + getSelectedNode();

      socket.emit('code-change', [room, text]);
    });

    window.onresize = function() {
      editor.layout();
    };
  });
}

/**
 * Returns the content of editor.
 *
 * @author Guilherme da Silva Martin
 */
function getEditorText() {
  return codeEditor.getValue();
}

/**
 * Set the content of editor.
 *
 * @param {*} text
 */
function setEditorText(text) {
  codeEditor.setValue(text);
}

/**
 * Set the language of editor.
 *
 * @param {*} language
 */
function setEditorLanguage(language) {
  const codeModel = codeEditor.getModel();

  monaco.editor.setModelLanguage(codeModel, language);
}

/**
 * Update editor when socket sends new updated code.
 *
 * @author Guilherme da Silva Martin
 */
socket.on('code-change', (data) => {
  setEditorText(data);
});
