<template>
  <div>
    <h2 class="titulo-lista">Lista de Inventario</h2>
    <ul class="inventario-list">
      <li v-for="(item, index) in items" :key="item.id || index" class="inventario-item">
        <template v-if="!item.editando">
          <span>{{ item.nombre }} — {{ item.cantidad }} x ${{ item.precio }}</span>
          <button @click="$emit('editar', index)">Editar</button>
          <button @click="$emit('eliminar', index)">Eliminar</button>
        </template>
        <template v-else>
          <input v-model="item.nombre" />
          <input v-model.number="item.cantidad" type="number" min="1" />
          <input v-model.number="item.precio" type="number" min="0" />
          <button @click="$emit('guardar', index)">Guardar</button>
        </template>
      </li>
    </ul>
  </div>
</template>

<script setup>
import '../styles/app.css';
defineProps(['items']);
</script>
