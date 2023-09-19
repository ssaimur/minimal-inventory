import { gql } from '@apollo/client';

export const SELECT_PRODUCT_QUERY = gql`
  query ProductQuery {
    products {
      description
      id
      name
      price
      stock
    }
  }
`;

export const CREATE_PRODUCT_MUTATION = gql`
  mutation InsertProduct($values: products_insert_input!) {
    insert_products_one(object: $values) {
      id
      name
      description
      price
      stock
    }
  }
`;

export const CHECK_PRODUCT_NAME_EXISTENCE = gql`
  query CheckProductNameExistence($name: String!) {
    products(where: { name: { _eq: $name } }) {
      id
    }
  }
`;
