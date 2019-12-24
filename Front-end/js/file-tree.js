/* eslint-disable camelcase */

let tree;
let currentTreeNode;
const treeId = $('#file-tree');

/**
 * Init file tree.
 *
 * @author Guilherme da Silva Martin
 */
function initTree() {
  getCodeFiles();
  handleNodeTreeSelect();
}

/**
 * Handle tree node select.
 *
 * @author Guilherme da Silva Martin
 */
function handleNodeTreeSelect() {
  treeId.on('select_node.jstree', (evt, data) => {
    if (data.node.parent !== '#') {
      joinCodeRoom(data.node.text);
      getFileContent(data.node.text);
    }
  });
}

/**
 * Return the selected node
 *
 * @author Guilherme da Silva Martin
 */
function getSelectedNode() {
  const selectedNode = treeId.jstree().get_selected(true)[0];

  if (selectedNode !== undefined && selectedNode !== null) return selectedNode.text;
}

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
    .fail((jqXHR, status, thrown) => {
      const statusCode = jqXHR.status;
      console.log(jqXHR);
      switch(statusCode) {
        case 401:
          $('#loginModal').modal('show');
          break;
        case 501:
          toastr.error('You don\'t have permission for access this code.');
          break;
        default:
          toastr.error('Error to load code files. \n' + jqXHR.message);
      }
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

  console.log(files);
  
  if (files) {
    files.forEach((element) => {
      let elementPattern = element.split('.');
  
      if (elementPattern.length > 1) {
        childrenElements.push({ text: element, type: 'file', icon: getFileIcon(elementPattern[1]) });
      }
    });
  
    jsonTree.push({ text: codeName, state: { opened: true }, children: childrenElements });
  
    return jsonTree;
  }
}

/**
 * Build tree.
 *
 * @author Guilherme da Silva Martin
 */
function buildTree(treeJson) {
  tree = $('#file-tree').jstree({
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
              tree.jstree().edit($node);
            }
          },
          Remove: {
            separator_before: false,
            separator_after: false,
            label: 'Remove',
            action: function(obj) {
              deleteFile($node);
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
  initTree();
});
