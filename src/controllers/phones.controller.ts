import { Controller } from '../types';
import { phonesService } from '../services/Phones.service';
import { productsService } from '../services/Products.service';

const sortByValues = ['itemId', 'price', 'name', 'year'];

export const getAllPhonesController: Controller = async (req, res) => {
  const { limit = 8, offset = 0, sortBy = 'itemId' } = req.query;

  const isSortByValid = sortByValues.includes(sortBy as string);
  const isLimitValid = !isNaN(+limit) && +limit >= 0;
  const isOffsetValid = !isNaN(+offset) && +offset >= 0;

  if (!isSortByValid || !isLimitValid || !isOffsetValid) {
    res.sendStatus(400);
    return;
  }

  const phones = await phonesService.findAll({
    limit: Number(limit),
    offset: Number(offset),
    sortBy: sortBy as 'itemId' | 'price' | 'name' | 'year',
  });

  res.status(200).send(phones);
};

export const getPhoneByIdController: Controller = async (req, res) => {
  const { phoneId } = req.params;
  const phones = await phonesService.findById(phoneId);

  res.status(200).send(phones);
};

export const getRecommendedController: Controller = async (req, res) => {
  const { phoneId } = req.params;

  const phone = await phonesService.findById(phoneId);

  if (!phone) {
    res.sendStatus(404);
  }

  const namespaceId = phone?.dataValues.namespaceId || '';

  const recommendedPhones = await phonesService.findRecommended(namespaceId);

  const recommendedPhonesIds = recommendedPhones.map(
    (phone) => phone.dataValues.id,
  );

  const recommended = await productsService.findRecomended(
    recommendedPhonesIds,
  );

  if (!recommended) {
    res.sendStatus(404);
  }

  res.status(200).send(recommended);
};
