let codeEditor;

/**
 * Init the editor.
 *
 * @author Guilherme da Silva Martin
 */
function initEditor() {
  require.config({ paths: { vs: 'https://unpkg.com/monaco-editor@0.17.1/min/vs' } });
  window.MonacoEnvironment = { getWorkerUrl: () => proxy };

  let proxy = URL.createObjectURL(
    new Blob(
      [
        `
        self.MonacoEnvironment = {
            baseUrl: 'https://unpkg.com/monaco-editor@0.17.1/min/'
        };
        importScripts('https://unpkg.com/monaco-editor@0.17.1/min/vs/base/worker/workerMain.js');
    `
      ],
      { type: 'text/javascript' }
    )
  );

  require(['vs/editor/editor.main'], () => {
    codeEditor = monaco.editor.create(document.getElementById('container'), {
      value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
      language: 'javascript',
      theme: 'vs-dark'
    });
  });
}

/**
 * Execute when page is ready.
 *
 * @author Guilherme da Silva Martin
 */
$(document).ready(() => {
  initEditor();
});
