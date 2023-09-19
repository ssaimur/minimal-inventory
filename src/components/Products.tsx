import { useQuery } from '@apollo/client';
// import Statistic from 'antd/es/statistic/Statistic';
import { IProduct } from '../types/products.type';
import { Divider, Table, Typography } from 'antd';
import { columns } from '../constants/products.constants';
import Title from 'antd/es/typography/Title';
import { SELECT_PRODUCT_QUERY } from '../queries/products.query';
import AddProduct from './AddProduct';

export function Products(): JSX.Element {
  const { data } = useQuery<{ products: IProduct[] }>(SELECT_PRODUCT_QUERY);

  const calculateTotalValue = (products?: IProduct[]) => {
    if (!products) return 0;

    return products.reduce((total, product) => {
      return total + product.price * product.stock;
    }, 0);
  };

  const totalValue = calculateTotalValue(data?.products);

  return (
    <div>
      <Title level={1}>Total Inventory Value</Title>
      <Typography.Text mark strong style={{ fontSize: 30 }}>
        ${totalValue.toFixed(2)}
      </Typography.Text>

      <Divider />

      <Title level={2}>Product List</Title>
      <Table
        columns={columns}
        dataSource={data?.products}
        pagination={{ defaultPageSize: 10 }}
      />

      <Divider />

      <Title level={3}>Add New Product</Title>
      <AddProduct />
    </div>
  );
}
