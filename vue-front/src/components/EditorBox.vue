<template>
<div class="editor-container">
  <lateral-menu></lateral-menu>
  <div class="gutter-vertical" id="gutterVertical"></div>
  <editor-block></editor-block>
</div>
  
</template>

<script>
import LateralMenu from './LateralMenu'
import EditorBlock from './EditorBlock'

export default {
  components: {
    LateralMenu,
    EditorBlock
  }
}
</script>

<style>
.editor-container {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  min-width: 100vw;
}

.editor-container .lateral-menu {
  display: flex;
  flex-direction: column;
  background-color: #2b2b2b !important;
  min-width: 10% !important;
}

.editor-container .gutter-vertical {
  width: 3px;
  cursor: col-resize;
  background: #2d333b;
}

.editor-container .editor-block {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}
</style>