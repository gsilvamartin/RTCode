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
    plugins: ['contextmenu'],
    contextmenu: {
      items: function($node) {
        let tree = $('#file-tree').jstree(true);

        return {
          Create: {
            separator_before: false,
            separator_after: true,
            label: 'Create',
            action: false,
            submenu: {
              File: {
                seperator_before: false,
                seperator_after: false,
                label: 'File',
                action: function(obj) {
                  $node = tree.create_node($node, { text: 'New File', type: 'file', icon: 'glyphicon glyphicon-file' });
                  tree.deselect_all();
                  tree.select_node($node);
                }
              },
              Folder: {
                seperator_before: false,
                seperator_after: false,
                label: 'Folder',
                action: function(obj) {
                  $node = tree.create_node($node, { text: 'New Folder', type: 'default' });
                  tree.deselect_all();
                  tree.select_node($node);
                }
              }
            }
          },
          Rename: {
            separator_before: false,
            separator_after: false,
            label: 'Rename',
            action: function(obj) {
              tree.edit($node);
            }
          },
          Remove: {
            separator_before: false,
            separator_after: false,
            label: 'Remove',
            action: function(obj) {
              tree.delete_node($node);
            }
          }
        };
      }
    }
  });
});
