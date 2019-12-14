/* eslint-disable camelcase */

/**
 * Execute when page is ready.
 *
 * @author Guilherme da Silva Martin
 */
$(document).ready(() => {
  $('#file-tree').jstree({
    core: {
      check_callback: true,
      data: [
        'rt-code-example',
        {
          text: 'Raiz 2',
          state: {
            opened: true,
            selected: true
          },
          children: [{ text: 'Child 1' }, 'Child 2']
        }
      ]
    },
    plugins: ['contextmenu']
  });
});
