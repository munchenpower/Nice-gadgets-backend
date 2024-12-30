import express from 'express';
import cors from 'cors';
import path from 'path';
import { phonesRouter } from './routers/phones.route';
import { initDB } from './initDB';
import { productsRouter } from './routers/products.route';
import { tabletsRouter } from './routers/tablets.route';
import { accessoriesRouter } from './routers/accessories.route';

export const createServer = () => {
  // const CLIENT_URL = process.env.CLIENT_URL;

  const app = express();

  initDB();

  app.use(
    cors({
      // origin: [CLIENT_URL as string, 'http://localhost:3000'],
      origin: '*',
    }),
  );

  app.use('/img', express.static(path.join('img')));
  app.use('/phones', express.json(), phonesRouter);
  app.use('/products', express.json(), productsRouter);
  app.use('/tablets', express.json(), tabletsRouter);
  app.use('/accessories', express.json(), accessoriesRouter);
  app.use('*', express.json(), (_req, res) => {
    res.sendStatus(404);
  });
  return app;
};
