import { Sequelize } from 'sequelize';
import pg from 'pg'; // ✅ Explicitly import pg

declare global {
  var sequelizeInstance: Sequelize | undefined;
}

const sequelize =
  global.sequelizeInstance ||
  new Sequelize('postgres', 'postgres', 'postgres', {
    host: 'localhost',
    port: 5431, // Update if needed
    dialect: 'postgres',
    dialectModule: pg, // ✅ Fix the pg module not found issue
    logging: false,
  });

if (process.env.NODE_ENV !== 'production') {
  global.sequelizeInstance = sequelize;
}

export default sequelize;
// This code initializes a Sequelize instance for PostgreSQL and ensures it is reused in development to avoid connection limits.
