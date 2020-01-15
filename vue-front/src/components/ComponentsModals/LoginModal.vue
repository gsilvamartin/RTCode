<template>
  <div class="modal fade login" id="loginModal">
    <div class="modal-dialog login animated">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title">Login with</p>
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        </div>
        <div class="modal-body">
          <div class="box">
            <div class="content">
              <div class="social">
                <a id="github_login" class="circle github" href="#">
                  <i class="fab fa-github"></i>
                </a>
                <a id="google_login" class="circle google" href="#">
                  <i class="fab fa-google"></i>
                </a>
                <a id="facebook_login" class="circle facebook" href="#">
                  <i class="fab fa-facebook-f"></i>
                </a>
              </div>
              <div class="division">
                <div class="line l"></div>
                <span>or</span>
                <div class="line r"></div>
              </div>
              <div class="error"></div>
              <div class="form loginBox">
                <form method="" action="" accept-charset="UTF-8">
                  <input id="emailLogin" class="form-control" type="text" placeholder="Email" name="email" />
                  <input id="passwordLogin" class="form-control" type="password" placeholder="Password" name="password"
                    v-on:keyup.enter="login()" />
                  <input class="btn btn-login" type="button" value="Login" @click="login()" />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="sub-text">
            <span>
              Looking to<a href="javascript: openRegisterModal();">create an account</a>?
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        isLoged: false
      }
    },
    methods: {
      login() {
        const baseURL = 'http://localhost:5000';
        $.ajax({
          url: baseURL + '/users/login/',
          crossDomain: true,
          contentType: 'application/json',
          type: 'POST',
          data: JSON.stringify({
            Email: $('#emailLogin').val(),
            Password: $('#passwordLogin').val()
          })
        })
          .done((result) => {
            getCodeFiles();
            $('#loginModal').modal('hide');
            isLoged = true;
            localStorage.setItem('isLoged', 'true');
            localStorage.setItem('nickname', result.data.Nickname);
            localStorage.setItem('email', result.data.Email);
            // vueApp.loadInformations();
            console.log('Sucesso')
          })
          .fail(() => {
            shakeModal();
          });
      }
    }
  }
</script>