import { useMutation } from '@apollo/client';
import {
  CREATE_PRODUCT_MUTATION,
  SELECT_PRODUCT_QUERY,
} from '../queries/products.query';
import { IProduct } from '../types/products.type';

const useCreateProduct = () => {
  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION, {
    update: (cache, { data: { insert_products_one: newProduct } }) => {
      const existingProducts = cache.readQuery<{ products: IProduct[] }>({
        query: SELECT_PRODUCT_QUERY,
      });

      if (!existingProducts && newProduct) {
        cache.writeQuery({
          query: SELECT_PRODUCT_QUERY,
          data: {
            products: [newProduct],
          },
        });
      }

      if (existingProducts && newProduct) {
        cache.writeQuery({
          query: SELECT_PRODUCT_QUERY,
          data: {
            products: [...existingProducts.products, newProduct],
          },
        });
      }
    },
  });

  return createProduct;
};

export default useCreateProduct;
