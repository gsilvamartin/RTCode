<template>
  <div class="lateral-menu" id="lateral-menu" :style="{ width: widthLateral + 'px' }">
    <div class="file-tree-top-bar">
      <p>Files</p>
      <div class="icons">
        <a onclick="openNewFileModal()" title="New File"><i class="far fa-plus-square fa-lg"></i></a>
        <a title="New Folder"><i class="fas fa-folder-plus fa-lg"></i></a>
      </div>
    </div>
    <div class="file-tree" id="file-tree"></div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      widthLateral: 250
    };
  }
};
</script>

<style>
.file-tree-top-bar {
  display: inline-flex;
  height: 5%;
  background-color: #313335;
  color: white;
  flex-flow: row nowrap;
  align-items: center;
  min-height: 24;
}

.file-tree-top-bar p {
  flex: 1;
  margin: auto;
  margin-left: 5%;
  text-align: left;
  vertical-align: middle;
}

.file-tree-top-bar .icons {
  justify-content: space-between;
  padding-right: 5px;
}

.file-tree-top-bar .icons i {
  padding-left: 4px;
  padding-right: 4px;
}

.file-tree-top-bar .icons a {
  cursor: pointer;
}

.file-tree {
  flex: 1;
}

.jstree-container-ul {
  color: white;
}

.jstree-default .jstree-clicked {
  background: #528ac8bf !important;
}

.jstree-hovered {
  background-color: #cccccc38 !important;
}
</style>
