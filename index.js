// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { buildSequelize } = require('./src/entities/entity'); // ruta relativa

const app = express();
app.use(cors());
app.use(express.json());

async function init() {
  try {
    const { sequelize, Inventario } = await buildSequelize();

    // Autenticar y sincronizar (crear/actualizar tablas)
    await sequelize.authenticate();
    console.log('✅ Conexión a la BD (Sequelize) OK');

    // sync: crea tablas si no existen. { alter: true } ajusta columnas sin borrar datos.
    await sequelize.sync({ alter: true });
    console.log('✅ sequelize.sync() completado — tablas creadas/ajustadas');

    // Rutas usando Inventario
    app.get('/api/inventario', async (req, res) => {
      try {
        const items = await Inventario.findAll();
        res.json(items);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
    });

    app.post('/api/inventario', async (req, res) => {
      try {
        const { nombre, cantidad, precio } = req.body;
        const item = await Inventario.create({ nombre, cantidad, precio });
        res.json(item);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
    });

    app.put('/api/inventario/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const { nombre, cantidad, precio } = req.body;
        await Inventario.update({ nombre, cantidad, precio }, { where: { id } });
        res.json({ id, nombre, cantidad, precio });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
    });

    app.delete('/api/inventario/:id', async (req, res) => {
      try {
        const { id } = req.params;
        await Inventario.destroy({ where: { id } });
        res.json({ success: true });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ Error iniciando la app:', err);
    process.exit(1);
  }
}

init();
