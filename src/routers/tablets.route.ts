import express from 'express';
import {
  getAllTabletsController,
  getRecommendedController,
  getTabletByIdController,
} from '../controllers/tablets.controller';

const tabletsRouter = express.Router();

tabletsRouter.get('/', getAllTabletsController);
tabletsRouter.get('/:tabletId', getTabletByIdController);
tabletsRouter.get('/:tabletId/recommended', getRecommendedController);

export { tabletsRouter };
