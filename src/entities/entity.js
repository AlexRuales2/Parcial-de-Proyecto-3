// src/entities/entity.js
const mysql = require('mysql2/promise'); // sólo para crear DB si no existe (opcional)
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = Number(process.env.DB_PORT || 3306);
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'inventario_db';

// --- OPCIONAL: crear la base de datos si NO existe (muy útil en dev)
// Esto usa mysql2/promise para ejecutar: CREATE DATABASE IF NOT EXISTS <DB_NAME>
async function ensureDatabaseExists() {
  try {
    const conn = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD
    });
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    await conn.end();
    console.log(`✅ Base de datos comprobada/creada: ${DB_NAME}`);
  } catch (err) {
    console.error('❌ Error creando DB (ensureDatabaseExists):', err.message || err);
    throw err;
  }
}

async function buildSequelize() {
  // Primero aseguramos la DB (opcional, comenta la llamada si no la quieres)
  await ensureDatabaseExists();

  const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: false // cambia a console.log para ver las consultas SQL
  });

  const Inventario = sequelize.define('Inventario', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    }
  }, {
    tableName: 'inventario',
    timestamps: false
  });

  return { sequelize, Inventario };
}

// Exporta una función que inicializa y devuelve sequelize+modelo
module.exports = { buildSequelize };
