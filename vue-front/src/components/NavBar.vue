<template>
  <nav class="navbar">
    <a href="" class="navbar-brand">
      <img src="../assets/img/rt-code-logo.png" class="img-logo" />
    </a>
    <div class="options-navbar">
      <button v-if="inExecution" type="button" class="btn btn-dark action-button stop" @click="stopCode"
        title="Stop execution">
        <i class="fas fa-stop"></i>
      </button>
      <button v-else type="button" class="btn btn-dark action-button run" @click="runCode" title="Run code">
        <i class="fas fa-play"></i>
      </button>

      <button type="button" class="btn btn-dark action-button" id="sync-button" onclick="updateCodeFileContent()"
        title="Save">
        <i class="fas fa-save"></i>
      </button>

      <button type="button" class="btn btn-dark" id="options-button" onclick="openOptionsModal()" title="Options">
        Options
      </button>

      <button v-if="!isLoged" type="button" class="btn btn-dark" id="register-button" onclick="openRegisterModal()"
        title="Register">
        Register
      </button>

      <button v-if="!isLoged" type="button" class="btn btn-dark" id="login-button" @click="openLoginModal()"
        title="Login">
        Login
      </button>

      <div class="btn-nav dropdown dropdown-user" v-if="isLoged">
        <a class="btn btn-dark dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          <i class="far fa-user"></i> {{userName}}
        </a>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <a class="dropdown-item" href="#">User</a>
          <a class="dropdown-item" href="#" onclick="openNewCodeModal()">New Code</a>
          <a class="dropdown-item" href="#" onclick="openListCodesModal()">Codes</a>
          <a class="dropdown-item" href="#" onclick="logout()">Logout</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    data: function() {
      return {
        inExecution: false,
        isLoged: false,
        userName: 'Username'
      }
    },
    methods: {
      openLoginModal() {
        // document.getElementById('loginModal').modal('show');
        $('#loginModal').modal('show');
      },
      openRegisterModal() {

      },
      runCode() {

      },
      stopCode() {

      }
    }
  }
</script>

<style>
.navbar {
  border-bottom: 1.019px solid #ffffff0a;
  background-color: #2b2b2b;
}

.navbar .img-logo {
  width: 130px;
  height: 30px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  margin-left: 1%;
}

.navbar .options-navbar {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.navbar .options-navbar .btn {
  margin-right: 7px;
}

.navbar .options-navbar .action-button {
  width: 45px;
  height: 38px;
}

.action-button.run {
  color: green;
}

.action-button.stop {
  color: red;
}

.dropdown-user > .dropdown-menu {
  left: -20%;
}

.dropdown-user > .dropdown-menu > .dropdown-item:hover {
  color: #fff;
  background-color: #23272b;
  border-color: #1d2124;
}
</style>
