import { Accessories } from '../models/Accessories.model';
import { Products } from '../models/Products.model';

interface FindAllOptions {
  limit: number;
  offset: number;
  sortBy: 'itemId' | 'price' | 'name' | 'year';
}

class AccessoriesService {
  findAll(options: FindAllOptions) {
    const { limit, offset, sortBy } = options;

    return Products.findAndCountAll({
      limit,
      offset,
      order: [[sortBy, 'ASC']],
      where: {
        category: 'accessories',
      },
    });
  }

  findById(itemId: string) {
    return Accessories.findOne({
      where: {
        id: itemId,
      },
    });
  }
  findRecommended(namespaceId: string) {
    if (!namespaceId) {
      return [];
    }

    return Accessories.findAll({
      where: {
        namespaceId: namespaceId,
      },
    });
  }
}

export const accessoriesService = new AccessoriesService();
