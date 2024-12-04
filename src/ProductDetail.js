import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

import config from './_VARS.js';
import AppNavbar from './AppNavbar.js';

const purchaseItem = async ({ product, variationId, navigate }) => {
  const productVariation = product.variations.find((v) => v.id === variationId);
  const totalAmount = productVariation.price;
  const taxAmount = totalAmount * 0.07;
  const grandTotalAmount = totalAmount + taxAmount;
  const body = { totalAmount, taxAmount, grandTotalAmount, lineItems: { productVariation, price: totalAmount, quantity: 1 }};

  console.log(body);

  const response = await fetch(`https://ecommerce.edgecloud9.com/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const result = await response.json();
  if (result.status !== 200) {
    return alert('There was an error purchasing your shirt');
  }
  navigate('/order-confirmation');
}

/*
let eventSource;
const subscribeProductInfo = async({ id, setProduct }) => {
  eventSource = new EventSource(`${config.PRODUCT_API}${id}`, { withCredentials: true });
  eventSource.addEventListener('message', (event) => {
    const data = JSON.parse(event.data).value;
    setProduct(data);
  });
}
*/

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProductInfo() {
      const response = await fetch(`${config.PRODUCT_API}/${id}`);
      const data = await response.json();
      setProduct(data);
    }
    fetchProductInfo();
  }, [id, setProduct]);
/*

  useEffect(() => {
    let eventSource;
    async function subscribeProductInfo() {
      eventSource = new EventSource(`${config.PRODUCT_API}${id}`, { withCredentials: true });
      eventSource.addEventListener('message', (event) => {
        const data = JSON.parse(event.data).value;
        setProduct(data);
      });
    }
    subscribeProductInfo();
    return () => eventSource.close();
  }, [id, setProduct]);
*/

  return (
    <div>
      <AppNavbar/>
      <Container className="pt-4">
      { !product ? (
        <div className="text-center">loading...</div>
      ) : (
        <div className="row">
          <div className="col col-5">
            <img alt="" width="100%" src={"https://ecommerce.edgecloud9.com/api/images/" + product?.name + "/image.png"} />
          </div>
          <div className="col col-7">
            <h4>{product?.description}</h4>
            <hr />
            <div className="row">
              <div className="col col-3">Size</div>
              <div className="col col-3">Price</div>
              <div className="col col-3 text-center">On Hand</div>
              <div className="col col-3"></div>
            </div>
            <hr />
            {product.variations.map((v) => (
              <div className="row" key={v.id}>
                <div className="col col-3">{v?.name}</div>
                <div className="col col-3">${v?.price}</div>
                <div className="col col-3 text-center">{v?.onHandCount}</div>
                <div className="col col-3"><Button color="primary" block onClick={() => purchaseItem({ product, variationId: v.id, navigate })}>Buy 1</Button></div>
                <div className="col col-12"><hr/></div>
              </div>
            ))}
            <Button color="secondary" block tag={Link} to="/">Return To Product List</Button>
          </div>
        </div>
      )}
      </Container>
    </div>
  )
};

export default ProductDetail;
