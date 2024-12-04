import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

import AppNavbar from './AppNavbar.js';

const ProductList = () => {
  const [products, setProducts] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('https://ecommerce.edgecloud9.com/api/products');
      const data = await response.json();
      setProducts(data);
    }
    fetchProducts();
  }, [setProducts]);

  return (
    <div>
      <AppNavbar/>
      <Container className="pt-4">
        { !products ? (
          <div className="text-center">loading...</div>
        ) : (
        <Table>
          <thead>
          <tr>
            <th width="20%">Name</th>
            <th width="20%">Description</th>
            <th width="10%">Actions</th>
          </tr>
          </thead>
          <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td style={{whiteSpace: 'nowrap'}}>{product.name}</td>
              <td>{product.description}</td>
              <td>
                <Button style={{ width: '102px' }} size="sm" color="primary" tag={Link} to={"/products/" + product.id}>View</Button>
              </td>
            </tr>))}
          </tbody>
        </Table>
      )}
      </Container>
    </div>
  );
};

export default ProductList;
