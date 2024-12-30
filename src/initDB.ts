import { Sequelize } from 'sequelize-typescript';
import { models } from './models';

export const initDB = () => {
  const { DB_PASSWORD, DB_USER, DB_NAME, DB_HOST, DB_PORT } = process.env;

  const DB_URI = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

  return new Sequelize(DB_URI, {
    logging: false,
    models,
    dialectOptions: {
      ssl: true,
    },
  });
};
