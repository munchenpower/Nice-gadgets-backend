import express from 'express';
import {
  getAllProductsController,
  getDiscountsCountroller,
  getNewestController,
} from '../controllers/products.controller';

const productsRouter = express.Router();

productsRouter.get('/', getAllProductsController);
productsRouter.get('/new', getNewestController);
productsRouter.get('/discounts', getDiscountsCountroller);

export { productsRouter };
