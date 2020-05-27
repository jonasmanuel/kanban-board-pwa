<template>
  <div id="app">
    
    <div class="page-header">

      <install-prompt></install-prompt>
      
      <h1>Kanban Board</h1>
    </div>
    
    <menu-bar></menu-bar>

    <router-view/>
  </div>
</template>

<script>
import MenuBar from '@/components/MenuBar';
import InstallPrompt from '@/components/InstallPrompt';

export default {
  name: 'app',
  components: {
    'menu-bar': MenuBar,
    InstallPrompt
  }
};
</script>

<style>

#app {
 height: calc(100vh - 1rem);
 display: flex;
 flex-flow: column;
}
.page-header h1 {
  font-weight: 300;
}

body {
  padding-top: 1rem;
}

.card {
  margin-bottom: 10px;
}

.card:last-child {
  margin-bottom: 25px;
}

.card-block {
  padding: 15px;
}

.card-title {
  margin-bottom: 0;
}

h5 {
  margin-bottom: 0;
}

.close-button {
  background: transparent;
  border: 0;
  margin: 0 0 0 20px;
  padding: 0;
  color: white;
  opacity: 0.3;
}

.archive-button {
  background: transparent;
  border: 0;
  margin: 0 0 0 20px;
  padding: 0;
  color: white;
}

.close-button:hover, .archive-button:hover {
  cursor: pointer;
}

.hidden {
  display: none;
}
.item-holder::-webkit-scrollbar {
  display: none;
}
.v-select {
  background: #5b6977;
}


.ghost-card .card {
  opacity: 0.7;
  border: 1px solid #4299e1;
}
</style>
