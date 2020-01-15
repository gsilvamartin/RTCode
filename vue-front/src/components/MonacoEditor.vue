<template>
  <div class="monaco-editor">
    <MonacoEditor
      theme="vs-dark"
      language="javascript"
      :options="options"
      @change="onChange"
    ></MonacoEditor>
  </div>
</template>

<script>
import MonacoEditor from 'monaco-editor-vue';

export default {
  components: {
    MonacoEditor
  },
  data: function() {
    return {
      options: {
        automaticLayout: true
      }
    }
  },
  methods: {
    onChange(value) {
      console.log(value)
    }
  }
}
</script>

<style>

</style>