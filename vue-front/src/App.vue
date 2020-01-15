<template>
  <div id="principal" class="principal">
    <nav-bar></nav-bar>
    <editor-box></editor-box>
    <modals></modals>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import EditorBox from './components/EditorBox'
import Modals from './components/Modals'

export default {
  name: 'App',
  data: function() {
    return {
      selectedLanguage: {}
    }
  },
  components: {
    NavBar,
    EditorBox,
    Modals
  }
}
</script>

<style>
.principal {
  display: flex;
  flex-direction: column;
  min-width: 100vh;
  min-height: 100vh;
}
</style>
