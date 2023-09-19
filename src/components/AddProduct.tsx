import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, message, Row, Col } from 'antd';
import { useApolloClient } from '@apollo/client';
import { CHECK_PRODUCT_NAME_EXISTENCE } from '../queries/products.query';
import { IProductFormValues } from '../types/products.type';
import useCreateProduct from '../hooks/product.hook';

const AddProduct: React.FC = () => {
  const [form] = Form.useForm();
  const client = useApolloClient();
  const createProduct = useCreateProduct();

  const [productNameError, setProductNameError] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const [isMutationSuccess, setIsMutationSuccess] = useState<boolean>(false);

  const handleSubmit = async (values: IProductFormValues) => {
    try {
      await createProduct({
        variables: { values },
      });

      message.success('Product added successfully');
      setIsMutationSuccess(true);
      form.resetFields();
    } catch (error) {
      message.error('Failed to add product');
    }
  };

  let debounceTimer: NodeJS.Timeout;

  const handleProductNameChange = (value: string) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      checkProductNameExists(value);
    }, 500);
  };

  // to prevent duplicate name being inserted the following logic is applied
  const checkProductNameExists = async (name: string) => {
    try {
      const { data } = await client.query({
        query: CHECK_PRODUCT_NAME_EXISTENCE,
        variables: { name },
      });

      if (data && data.products.length > 0) {
        setIsFormValid(false);
        setProductNameError('Product name already exists');
      } else {
        setIsFormValid(true);
        setProductNameError('');
      }
    } catch (error) {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    if (isMutationSuccess) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isMutationSuccess]);

  return (
    <Row justify='center' align='middle' style={{ minHeight: '100vh' }}>
      <Col xs={24} sm={16} md={12} lg={10} xl={8}>
        <Form form={form} onFinish={handleSubmit} layout='vertical'>
          <Form.Item
            label='Product Name'
            name='name'
            rules={[
              {
                required: true,
                message: 'Please enter the product name',
              },
            ]}
            validateStatus={productNameError ? 'error' : ''}
            help={productNameError}
          >
            <Input onChange={(e) => handleProductNameChange(e.target.value)} />
          </Form.Item>
          <Form.Item label='Description' name='description'>
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label='Price'
            name='price'
            rules={[{ required: true, message: 'Please enter the price' }]}
          >
            <InputNumber style={{ width: '100%' }} min={0.01} step={0.01} />
          </Form.Item>
          <Form.Item
            label='Stock'
            name='stock'
            rules={[
              { required: true, message: 'Please enter the stock quantity' },
            ]}
          >
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' disabled={!isFormValid}>
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default AddProduct;
