<template>
  <div class="home">
    <section class="inventario-section">
      <form @submit.prevent="agregarItem" class="inventario-form">
        <input v-model="nuevoItem.nombre" placeholder="Nombre" required />
        <input v-model.number="nuevoItem.cantidad" type="number" min="1" placeholder="Cantidad" required />
        <input v-model.number="nuevoItem.precio" type="number" min="0" placeholder="Precio" required />
        <button type="submit">Agregar</button>
      </form>
      <InventarioList
        :items="items"
        @eliminar="eliminarItem"
        @editar="editarItem"
        @guardar="guardarItem"
      />
      <Carrito :items="items" :total="totalInventario" />
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import InventarioList from '../components/InventarioList.vue';
import Carrito from '../components/Carrito.vue';
import { fetchInventario, addItem as apiAdd, updateItem as apiUpdate, deleteItem as apiDelete } from '../services/api.js';
import '../styles/app.css';

const items = ref([]);
const nuevoItem = ref({ nombre: '', cantidad: 1, precio: 0 });

onMounted(async () => {
  items.value = await fetchInventario();
});

const agregarItem = async () => {
  const item = await apiAdd({ ...nuevoItem.value });
  // Asegúrate de que item tenga id, nombre, cantidad y precio
  items.value.push({ ...item, editando: false });
  nuevoItem.value = { nombre: '', cantidad: 1, precio: 0 };
};

const eliminarItem = async (index) => {
  const item = items.value[index];
  await apiDelete(item.id);
  items.value.splice(index, 1);
};

const editarItem = (index) => {
  items.value[index].editando = true;
};

const guardarItem = async (index) => {
  const item = items.value[index];
  const actualizado = await apiUpdate(item.id, item);
  items.value[index] = { ...actualizado, editando: false };
};

const totalInventario = computed(() =>
  items.value.reduce((acc, item) => acc + item.cantidad * item.precio, 0)
);
</script>