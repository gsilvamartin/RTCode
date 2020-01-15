<template>
  <div class="modal fade register " id="registerModal">
    <div class="modal-dialog register animated">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title">Register with</p>
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        </div>
        <div class="modal-body">
          <div class="box">
            <div class="content registerBox">
              <div class="social">
                <a class="circle github" href="#">
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
              <div class="form">
                <form method="" html="{:multipart=>true}" data-remote="true" action="" accept-charset="UTF-8">
                  <input id="nicknameRegister" class="form-control" type="text" placeholder="Nickname"
                    name="nickname" />
                  <input id="emailRegister" class="form-control" type="email" placeholder="Email" name="email" />
                  <input id="passwordRegister" class="form-control" type="password" placeholder="Password"
                    name="password" />
                  <input id="password_confirmation" class="form-control" type="password" placeholder="Repeat Password"
                    name="password_confirmation" />
                  <input class="btn btn-register" type="button" value="Create account" onclick="registerNewUser()"
                    name="commit" />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="sub-text">
            <span>Already have an account?</span>
            <a href="javascript: openLoginModal();">Login</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>