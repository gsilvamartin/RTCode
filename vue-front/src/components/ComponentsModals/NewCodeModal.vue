<template>
  <div class="modal fade new-code" id="newCodeModal">
    <div class="modal-dialog options animated">
      <div class="modal-content">
        <div class="modal-body">
          <div class="box">
            <div class="content">
              <div class="">
                <form method="" action="" accept-charset="UTF-8">
                  <div class="form-group">
                    <label for="new-code-name">Code name</label>
                    <input class="form-control" id="new-code-name" />
                  </div>
                  <div class="form-group">
                    <label for="code-language">Code language</label>
                    <div class="dropdown">
                      <a class="dropdown-toggle lang-dropdown-btn" href="#" role="button" id="dropdownMenuLink"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img :src="selectedLanguage.img" class="img-lang" />
                        {{selectedLanguage.name}}
                      </a>

                      <div class="dropdown-menu lang-dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a v-for="lang in languages" class="dropdown-item lang-dropdown-item"
                          @click="changeLangSelected(lang)">
                          <img :src="lang.img" class="img-lang" />
                          {{lang.name}}
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <input class="btn btn-login" type="button" value="save" onclick="saveCode()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        selectedLanguage: {},
        languages: []
      }
    },
    methods: {
      changeLangSelected() {
        
      }
    }
  }

</script>

<style>

</style>
