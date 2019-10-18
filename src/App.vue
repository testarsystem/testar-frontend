<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
:root{
  --primary-color: #26a69a;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.list-divider {
    height: 0;
    margin: 3px 0 4px;
    border: none;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: rgba(0,0,0,.12);
}
</style>
