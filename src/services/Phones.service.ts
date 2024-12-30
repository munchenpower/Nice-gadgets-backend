import { Phones } from '../models/Phones.model';
import { Products } from '../models/Products.model';

interface FindAllOptions {
  limit: number;
  offset: number;
  sortBy: 'itemId' | 'price' | 'name' | 'year';
}

class PhonesService {
  findAll(options: FindAllOptions) {
    const { limit, offset, sortBy } = options;

    return Products.findAndCountAll({
      limit,
      offset,
      order: [[sortBy, 'ASC']],
      where: {
        category: 'phones',
      },
    });
  }

  findById(itemId: string) {
    return Phones.findOne({
      where: {
        id: itemId,
      },
    });
  }
  findRecommended(namespaceId: string) {
    if (!namespaceId) {
      return [];
    }

    return Phones.findAll({
      where: {
        namespaceId: namespaceId,
      },
    });
  }
}

export const phonesService = new PhonesService();
