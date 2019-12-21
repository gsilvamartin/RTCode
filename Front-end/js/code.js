let selectedLanguage;
const baseURL = 'http://localhost:5000';

/**
 * Returns file size.
 *
 * @author Guilherme da Silva Martin
 */
function getFileSize() {
  let text = codeEditor.getValue();

  return text.length;
}

/**
 * Returns the total rows in the editor.
 *
 * @author Guilherme da Silva Martin
 */
function getTotalLines() {
  const text = codeEditor.getValue();
  const lines = (text.match(/\n/g) || '').length + 1;

  return lines;
}

/**
 * Returns the language code uses.
 *
 * @author Guilherme da Silva Martin
 */
function getSelectedLanguage() {
  return selectedLanguage;
}

/**
 * Sets the code language used.
 *
 * @author Guilherme da Silva Martin
 * @param {*} language
 */
function setLanguage(language) {
  let selectedText = $(language)
    .find('option:selected')
    .text();
  let selectedValue = $(language)
    .find('option:selected')
    .val();

  selectedLanguage = selectedText;
  changeCodeMirrorMode(selectedValue);
  $('#code-language').text(selectedText);
}

/**
 * Set toastr notification settings.
 *
 * @author Guilherme da Silva Martin
 */
function setToastrOptions() {
  toastr.options = {
    progressBar: true
  };
}

/**
 * Show login modal.
 *
 * @author Guilherme da Silva Martin
 */
function openLoginModal() {
  $('#registerModal').modal('hide');
  $('#loginModal').modal('show');
}

/**
 * Show register modal.
 *
 * @author Guilherme da Silva Martin
 */
function openRegisterModal() {
  $('#loginModal').modal('hide');
  $('#registerModal').modal('show');
}

/**
 * Login user.
 *
 * @author Guilherme da Silva Martin
 */
function login() {
  $.ajax({
    url: baseURL + '/users/login/',
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify({
      Email: $('#emailLogin').val(),
      Password: $('#passwordLogin').val()
    })
  })
    .done(() => {
      $('#loginModal').modal('hide');
      toastr.success('Success to login!');
    })
    .fail(() => {
      shakeModal();
    });
}

/**
 * Shake modal effect
 *
 * @author Creative Tim
 */
function shakeModal() {
  $('#loginModal .modal-dialog').addClass('shake');
  $('.error')
    .addClass('alert alert-danger')
    .html('Invalid email/password combination');
  $('input[type="password"]').val('');
  setTimeout(() => {
    $('#loginModal .modal-dialog').removeClass('shake');
  }, 1000);
}

/**
 * Open the options modal.
 *
 * @author Guilherme da Silva Martin
 */
function openOptionsModal() {
  $('#optionsModal').modal('show');
}

/**
 * Save file into the system.
 *
 * @param {*} params node tree params
 */
function saveFile($node) {
  let fileName = $('#file-name').val();

  $.ajax({
    url: baseURL + '/code/file/' + getRoomName(),
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify({
      FileName: fileName
    })
  })
    .done(() => {
      insertNewFileTree($node, fileName);
    })
    .fail((err) => {
      $('#newFileModal').modal('hide');
      toastr.error(err.responseJSON.message, 'Error to create file!');
    });
}

/**
 * Delete file from code.
 *
 * @param {*} params node tree params
 */
function deleteFile($node) {
  let fileName = $node.text;

  $.ajax({
    url: baseURL + '/code/file/' + getRoomName(),
    contentType: 'application/json',
    type: 'DELETE',
    data: JSON.stringify({
      FileName: fileName
    })
  })
    .done(() => {
      tree.jstree().delete_node($node);
      toastr.success('Success to delete file!');
    })
    .fail((err) => {
      toastr.error(err.responseJSON.message, 'Error to delete file!');
    });
}

/**
 * Update code file content.
 *
 * @author Guilherme da Silva Martin
 */
function updateCodeFileContent() {
  $.ajax({
    url: baseURL + '/code/file/' + getRoomName(),
    contentType: 'application/json',
    type: 'PUT',
    data: JSON.stringify({
      FileName: getSelectedNode(),
      FileContent: getEditorText()
    })
  })
    .done((result) => {
      toastr.clear();
      toastr.success('Success to save file');
    })
    .fail((err) => {
      toastr.error(err.responseJSON.message, 'Error to get file content!');
    });
}

/**
 * Get code file content.
 *
 * @author Guilherme da Silva Martin
 */
function getFileContent(fileName) {
  $.ajax({
    url: baseURL + '/code/file/' + getRoomName() + '/' + fileName,
    contentType: 'application/json',
    type: 'GET'
  })
    .done((result) => {
      codeEditor.setValue(result.data.fileContent);
    })
    .fail((err) => {
      toastr.error(err.responseJSON.message, 'Error to get file content!');
    });
}

/**
 * Insert a new file on tree.
 *
 * @author Guilherme da Silva Martin
 */
function insertNewFileTree($node, fileName) {
  let fileNameSplit = fileName.split('.');

  $node = tree.jstree().create_node($node, { text: fileName, type: 'file', icon: getFileIcon(fileNameSplit[1]) });
  tree.jstree().deselect_all();
  tree.jstree().select_node($node);
  toastr.success('Success to create file!');

  $('#newFileModal').modal('hide');
}

/**
 * Return the file icon of language.
 *
 * @author Guilherme da Silva Martin
 */
function getFileIcon(pattern) {
  switch (pattern) {
    case 'js':
      return 'fab fa-js-square';
    case 'py':
      return 'fab fa-python';
    case 'html':
      return 'fab fa-html5';
    default:
      break;
  }
}

/**
 * Register a new user.
 *
 * @author Guilherme da Silva Martin
 */
function registerNewUser() {
  $.ajax({
    url: baseURL + '/users/',
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify({
      Name: $('#nicknameRegister').val(),
      Email: $('#emailRegister').val(),
      Password: $('#passwordRegister').val(),
      Image: ''
    })
  })
    .done(() => {
      $('#registerModal').modal('hide');
      toastr.success('Success to create user!');
    })
    .fail(() => {
      $('#registerModal').modal('hide');
      toastr.error('Error to create user!');
    });
}

/**
 * Runs as soon as the page is ready.
 *
 * @author Guilherme da Silva Martin
 */
$(document).ready(() => {
  setToastrOptions();
});
