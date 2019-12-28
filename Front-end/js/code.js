let codeLanguage;
let selectedLanguage;
const baseURL = 'http://localhost:5000';

/**
 * Start vue.js on code.html page.
 *
 * @author Matheus Muriel
 */
const vueApp = new Vue({
  el: '#principal',
  data: {
    inExecution: false,
    isLoged: false,
    userName: 'Teste Guy',
    languages: [
      { name: 'Python', value: 'python', img: '/img/python.svg' },
      { name: 'Javascript', value: 'javascript', img: '/img/javascript.svg' },
      { name: 'Java', value: 'java', img: '/img/java.svg' },
      { name: 'NodeJS', value: 'nodejs', img: '/img/nodejs.svg' },
      { name: 'C', value: 'c', img: '/img/c.svg' },
      { name: 'C++', value: 'cpp', img: '/img/cpp.svg' },
      { name: 'C#', value: 'csharp', img: '/img/csharp.svg' }
    ],
    selectedLanguage: { name: 'Python', value: 'python', isActive: true, img: '/img/python.svg' }
  },
  beforeMount() {
    this.loadInformations();
  },
  methods: {
    loadInformations() {
      let _isLoged = sessionStorage.getItem('isLoged');

      this.isLoged = !!_isLoged;
    },
    changeLangSelected(lang) {
      this.selectedLanguage = lang;
    },
    runCode() {
      executeFile();
      this.inExecution = true;
    },
    stopCode() {
      stopFile();
      this.inExecution = false;
    }
  }
});

/**
 * Stop of running file.
 *
 * @author Guilherme da Silva Martin
 */
function stopFile() {
  socket.emit('file-stop');
}

/**
 * Execute selected file
 *
 * @author Guilherme da Silva Martin
 */
function executeFile() {
  const language = getLanguageCommand();
  const fileName = getSelectedNode();
  const codeName = getRoomName();

  socket.emit('file-execute', [language, codeName, fileName]);
}

/**
 * Returns the command to init REPL.
 *
 * @author Guilherme da Silva Martin
 */
function getLanguageCommand() {
  return codeLanguage;
}

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
      getCodeFiles();
      $('#loginModal').modal('hide');
      vueApp.$data.isLoged = true;
      sessionStorage.setItem('isLoged', 'true');
    })
    .fail(() => {
      shakeModal();
    });
}

/**
 * Logout user.
 *
 * @author Matheus Muriel
 */
function logout() {
  $.ajax({
    url: baseURL + '/users/logout/',
    contentType: 'application/json',
    type: 'DELETE'
  })
    .done(() => {
      vueApp.$data.isLoged = false;
      sessionStorage.setItem('isLoged', '');
    })
    .fail(() => {
      toastr.error('Error on logout!');
    });
}

/**
 * Save options
 *
 * @author Matheus Muriel
 */
function saveOptions(func) {
  let codeTheme = $('#editor-theme').val();

  $.getScript('code-mirror.js', () => {
    changeTheme(codeTheme);
  })
    .done(() => {
      $('#optionsModal').modal('hide');
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
 * Get language of code.
 *
 * @author Guilherme da Silva Martin
 */
function getCodeLanguage() {
  $.ajax({
    url: baseURL + '/code/language/' + getRoomName(),
    contentType: 'application/json',
    type: 'GET'
  })
    .done((result) => {
      codeLanguage = result.data.CodeLanguage;
    })
    .fail((err) => {
      toastr.error(err.responseJSON.message, 'Error to get code language!');
    });
}

/**
 * Save file into the system.
 *
 * @param {*} params node tree params
 */
function saveFile($node) {
  let fileName = $('#new-file-name').val();

  $.ajax({
    url: baseURL + '/code/file/',
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify({
      CodeName: getRoomName(),
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
      let tree = $('#file-tree');

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
      toastr.error(err.responseJSON.message, 'Error to update file content!');
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
 * Open new file modal
 *
 * @author Guilherme da Silva Martin
 */
function openNewFileModal() {
  $('#newFileModal').modal('show');
}

/**
 * Open the new Code Modal.
 *
 * @author Matheus Muriel
 */
function openNewCodeModal() {
  $('#newCodeModal').modal('show');
}

/**
 * Save a new code.
 *
 * @author Matheus Muriel
 */
function saveCode() {
  let codeName = $('#new-code-name').val();
  let newCodeLanguage = $('#code-language').val();

  $.ajax({
    url: baseURL + '/code/' + codeName + '/' + newCodeLanguage,
    contentType: 'application/json',
    type: 'POST'
  })
    .done(() => {
      $('#newCodeModal').modal('hide');
      toastr.success('Success to create code!');
      window.location.href = baseURL + '/code/' + codeName;
    })
    .fail((err) => {
      $('#newCodeModal').modal('hide');
      toastr.error(err.responseJSON.message, 'Error to create code!');
    });
}

/**
 * Insert a new file on tree.
 *
 * @author Guilherme da Silva Martin
 */
function insertNewFileTree($node, fileName) {
  let fileNameSplit = fileName.split('.');
  let tree = $('#file-tree');

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
  getCodeLanguage();
});
