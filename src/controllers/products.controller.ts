import { Controller } from '../types';
import { productsService } from '../services/Products.service';

// const sortByValues = ['itemId', 'price', 'name', 'year'];
const categories = ['phones', 'tablets', 'accessories'];

export const getAllProductsController: Controller = async (req, res) => {
  // const {
  //   category = 'phones',
  //   limit = 8,
  //   offset = 0,
  //   sortBy = 'itemId',
  // } = req.query;
  // const isSortByValid = sortByValues.includes(sortBy as string);
  // const isLimitValid = !isNaN(+limit) && +limit >= 0;
  // const isOffsetValid = !isNaN(+offset) && +offset >= 0;

  // if (!isSortByValid || !isLimitValid || !isOffsetValid) {
  //   res.sendStatus(400);
  //   return;
  // }

  // const products = await productsService.findAll(
  //   {
  //     limit: Number(limit),
  //     offset: Number(offset),
  //     sortBy: sortBy as 'itemId' | 'price' | 'name' | 'year',
  //   },
  //   category as string,
  // );

  // if (!products) {
  //   res.sendStatus(400);
  // }

  // res.status(200).send(products);
  const { id, search } = req.query;

  if (id && typeof id === 'string') {
    console.log(id);
    const idsArr = id.split(',');
    console.log(idsArr);

    const products = await productsService.findEvery(idsArr);
    console.log(products);

    if (!products) {
      res.sendStatus(400);

      return;
    }

    res.status(200).send(products);

    return;
  }

  if (typeof search === 'string') {
    const searchParams = search.split(',').join('%');

    const products = await productsService.findBySearch(`%${searchParams}%`);

    if (!products) {
      res.sendStatus(400);
      return;
    }

    res.status(200).send(products);
    return;
  }
};
export const getProductByIdController: Controller = async (req, res) => {
  const { category } = req.query;

  const isCategoryValid = categories.includes(category as string);

  if (!isCategoryValid) {
    res.status(200).send([]);
  }

  let product;

  if (!product) {
    res.sendStatus(404);
  }

  res.send(product);
};

export const getNewestController: Controller = async (_req, res) => {
  const newest = await productsService.findNewest();

  if (!newest) {
    res.sendStatus(500);
  }

  res.status(200).send(newest);
};

export const getDiscountsCountroller: Controller = async (_req, res) => {
  const hotPrices = await productsService.findDiscounts();
  res.status(200).send(hotPrices);
};
