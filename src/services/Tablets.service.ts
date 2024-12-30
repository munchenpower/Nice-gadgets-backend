import { Tablets } from '../models/Tablets.model';
import { Products } from '../models/Products.model';

interface FindAllOptions {
  limit: number;
  offset: number;
  sortBy: 'itemId' | 'price' | 'name' | 'year';
}

class TabletsService {
  findAll(options: FindAllOptions) {
    const { limit, offset, sortBy } = options;

    return Products.findAndCountAll({
      limit,
      offset,
      order: [[sortBy, 'ASC']],
      where: {
        category: 'tablets',
      },
    });
  }

  findById(itemId: string) {
    return Tablets.findOne({
      where: {
        id: itemId,
      },
    });
  }
  findRecommended(namespaceId: string) {
    if (!namespaceId) {
      return [];
    }

    return Tablets.findAll({
      where: {
        namespaceId: namespaceId,
      },
    });
  }
}

export const tabletsService = new TabletsService();
