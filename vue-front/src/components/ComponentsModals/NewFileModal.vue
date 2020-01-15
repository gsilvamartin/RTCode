<template>
  <div class="modal fade new-file" id="newFileModal">
    <div class="modal-dialog options animated">
      <div class="modal-content">
        <div class="modal-body">
          <div class="box">
            <div class="content">
              <div class="">
                <form method="" action="" accept-charset="UTF-8">
                  <div class="form-group">
                    <label for="new-file-name">File name</label>
                    <input class="form-control" id="new-file-name" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <input class="btn btn-login" type="button" value="save" @click="saveFile(currentTreeNode)" />
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
      saveFile() {
      }
    }
  }
</script>

<style>

</style>