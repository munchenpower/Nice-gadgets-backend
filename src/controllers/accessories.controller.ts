import { Controller } from '../types';
import { accessoriesService } from '../services/Accessories.service';
import { productsService } from '../services/Products.service';

const sortByValues = ['itemId', 'price', 'name', 'year'];

export const getAllAccessoriesController: Controller = async (req, res) => {
  const { limit = 8, offset = 0, sortBy = 'itemId' } = req.query;

  const isSortByValid = sortByValues.includes(sortBy as string);
  const isLimitValid = !isNaN(+limit) && +limit >= 0;
  const isOffsetValid = !isNaN(+offset) && +offset >= 0;

  if (!isSortByValid || !isLimitValid || !isOffsetValid) {
    res.sendStatus(400);
    return;
  }

  const accessories = await accessoriesService.findAll({
    limit: Number(limit),
    offset: Number(offset),
    sortBy: sortBy as 'itemId' | 'price' | 'name' | 'year',
  });

  res.status(200).send(accessories);
};

export const getAccessoriesByIdController: Controller = async (req, res) => {
  const { accessoriesId } = req.params;
  const accessories = await accessoriesService.findById(accessoriesId);

  res.status(200).send(accessories);
};

export const getRecommendedController: Controller = async (req, res) => {
  const { accessoriesId } = req.params;

  const accessories = await accessoriesService.findById(accessoriesId);

  if (!accessories) {
    res.sendStatus(404);
  }

  const namespaceId = accessories?.dataValues.namespaceId || '';

  const recommendedAccessories = await accessoriesService.findRecommended(
    namespaceId,
  );

  const recommendedAccessoriesIds = recommendedAccessories.map(
    (accessory) => accessory.dataValues.id,
  );

  const recommended = await productsService.findRecomended(
    recommendedAccessoriesIds,
  );

  if (!recommended) {
    res.sendStatus(404);
  }

  res.status(200).send(recommended);
};
