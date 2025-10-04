import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000 // opcional: 5 segundos de espera
});

// Interceptor para capturar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🚫 No usamos ?. porque Vue CLI no lo soporta sin plugins extra
    const errorMsg = (error.response && error.response.data) || error.message;
    console.error("❌ Error en API:", errorMsg);
    return Promise.reject(error);
  }
);

export const fetchInventario = async () => {
  const { data } = await api.get('/inventario');
  return data;
};

export const addItem = async (item) => {
  const { data } = await api.post('/inventario', item);
  return data;
};

export const updateItem = async (id, item) => {
  const { data } = await api.put(`/inventario/${id}`, item);
  return data;
};

export const deleteItem = async (id) => {
  const { data } = await api.delete(`/inventario/${id}`);
  return data;
};
