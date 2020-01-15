<template>
  <div class="modal fade options" id="optionsModal">
    <div class="modal-dialog options animated">
      <div class="modal-content">
        <div class="modal-body">
          <div class="box">
            <div class="content">
              <div class="">
                <form method="" action="" accept-charset="UTF-8">
                  <div class="form-group">
                    <label for="editor-theme">Editor theme</label>
                    <select class="form-control" id="editor-theme">
                      <option value="darcula">Darcula</option>
                      <option value="base16-dark">Base 16 Dark</option>
                      <option value="base16-light">Base 16 Light</option>
                      <option value="eclipse">Eclipse</option>
                      <option value="monokai">Monokai</option>
                      <option value="moxer">Moxer</option>
                    </select>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <input class="btn" type="button" value="save" @click="saveOptions()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {

      }
    },
    methods: {
      saveOptions() {
        
      }
    }
  }
</script>