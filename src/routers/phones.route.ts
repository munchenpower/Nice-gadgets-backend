import express from 'express';
import {
  getAllPhonesController,
  getPhoneByIdController,
  getRecommendedController,
} from '../controllers/phones.controller';

const phonesRouter = express.Router();

phonesRouter.get('/', getAllPhonesController);
phonesRouter.get('/:phoneId', getPhoneByIdController);
phonesRouter.get('/:phoneId/recommended', getRecommendedController);

export { phonesRouter };
