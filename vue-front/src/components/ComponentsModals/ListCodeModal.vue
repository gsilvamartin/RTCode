<template>
  <div class="modal fade list-code" id="ListCodeModal">
    <div class="modal-dialog options animated">
      <div class="modal-content">
        <div class="modal-body">
          <div class="box">
            <div class="content">
              <div class="list-group">
                <a class="list-group-item list-group-item-action" v-for="code in userCodes" 
                v-bind:key="code.value" @click="goToCode(code.CodeName)">
                  <img :src='getImgLang(code.CodeLanguage)' class="img-lang"/>
                  {{code.CodeName}}
                </a>
              </div>
            </div>
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
        userCodes: []
      }
    },
    methods: {
      goToCode() {
        
      },
      getImgLang() {
        
      }
    }
  }
</script>