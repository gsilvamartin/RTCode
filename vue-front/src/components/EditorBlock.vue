<template>
  <div class="editor-block">
    <monaco-editor v-if="codeOpened"></monaco-editor>
    <no-code-screen v-else></no-code-screen>
    <div class="gutter-horizontal" id="gutterHorizontal"></div>
    <terminal></terminal>
  </div>
</template>

<script>
import Terminal from './Terminal'
import MonacoEditor from './MonacoEditor'
import NoCodeScreen from './NoCodeScreen'

export default {
  data: function() {
    return {
      codeOpened: true
    }
  },
  components: {
    MonacoEditor,
    NoCodeScreen,
    Terminal
  }
}
</script>

<style>
.editor-block .monaco-editor,
.editor-block .no-code-screen {
  flex-grow: 1;
}

.editor-block .terminal {
  height: 30%;
  display: flex;
}

.editor-container .gutter-horizontal {
  height: 3px;
  cursor: row-resize;
  background: #2d333b;
}
</style>