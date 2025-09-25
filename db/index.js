const { Sequelize } = require('sequelize');
const path = require('path');

// Load environment variables if present
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const dialect = process.env.DB_DIALECT || 'postgres';

const sequelize = new Sequelize(
    process.env.DB_NAME || 'bakery',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
        dialect,
        logging: process.env.DB_LOGGING === 'true' ? console.log : false,
        dialectOptions: dialect === 'postgres' ? { } : { }
    }
);

module.exports = { sequelize };


