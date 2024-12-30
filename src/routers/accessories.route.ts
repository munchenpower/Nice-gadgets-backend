import express from 'express';
import {
  getAccessoriesByIdController,
  getAllAccessoriesController,
  getRecommendedController,
} from '../controllers/accessories.controller';

const accessoriesRouter = express.Router();

accessoriesRouter.get('/', getAllAccessoriesController);
accessoriesRouter.get('/:accessoriesId', getAccessoriesByIdController);
accessoriesRouter.get('/:accessoriesId/recommended', getRecommendedController);

export { accessoriesRouter };
