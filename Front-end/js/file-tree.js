/* eslint-disable camelcase */

let tree;
let currentTreeNode;

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
    .done((result) => {
      const jsonTree = buildTreeJson(result.data.CodeName, result.data.CodeFiles);

      buildTree(jsonTree);
    })
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
  let jsonTree = [];
  let childrenElements = [];

  files.forEach((element) => {
    let elementPattern = element.split('.');

    if (elementPattern.length > 1) {
      childrenElements.push({ text: element, type: 'file', icon: getFileIcon(elementPattern[1]) });
    }
  });

  jsonTree.push({ text: codeName, state: { opened: true }, children: childrenElements });

  return jsonTree;
}

/**
 * Build tree.
 *
 * @author Guilherme da Silva Martin
 */
function buildTree(treeJson) {
  $('#file-tree').jstree({
    core: {
      check_callback: true,
      data: treeJson
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
