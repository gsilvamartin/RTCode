/* eslint-disable camelcase */

let tree;
let currentTreeNode;

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
                  currentTreeNode = $node;
                  $('#newFileModal').modal('show');
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

/**
 * Execute when page is ready.
 *
 * @author Guilherme da Silva Martin
 */
$(document).ready(() => {
  tree = $('#file-tree').jstree(true);
});
