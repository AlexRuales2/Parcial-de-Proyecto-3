<template>
  <div class="carrito">
    <h3>Carrito de Compras</h3>
    <ul v-if="items.length">
      <li v-for="(item, idx) in items" :key="idx">
        {{ item.nombre }} — {{ item.cantidad }} x ${{ item.precio }}
      </li>
    </ul>
    <p v-else>El carrito está vacío.</p>
    <div class="total-inventario">
      <strong>Total: <span>${{ total }}</span></strong>
    </div>
  </div>
</template>

<script setup>
import '../styles/app.css';
defineProps(['items', 'total']);
</script>
