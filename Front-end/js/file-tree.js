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
      data: ['rt-code-example']
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
 * Get files of the code.
 *
 * @author Guilherme da Silva Martin
 */
function getCodeFiles() {
  $.ajax({
    url: baseURL + '/code/tree/' + getRoomName(),
    contentType: 'application/json',
    type: 'GET'
  })
    .done((data) => {})
    .fail(() => {
      toastr.error('Error to load code files.');
    });
}

/**
 * Build tree JSON based on content files.
 *
 * @author Guilherme da Silva Martin
 */
function buildTreeJson(codeName, files) {
  tree = [];

  tree.push({text: codeName, state: {opened: true}});

  files.forEach(element => {
    tree.push({element : })
  });
}

/**
 * Execute when page is ready.
 *
 * @author Guilherme da Silva Martin
 */
$(document).ready(() => {
  getCodeFiles();
  tree = $('#file-tree').jstree(true);
});
