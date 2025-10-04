<template>
  <div id="app">
    <h1>Inventario de Almacén de Repuestos</h1>
    <Home />
  </div>
</template>

<script>
import Home from './views/Home.vue';
import './styles/app.css';

export default { name: 'App', components: { Home } }
</script>
