import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

import AppNavbar from './AppNavbar.js';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [priceandqty, setPriceandqty] = useState(null);

  const purchaseItem = async ({ variationId }) => {
    const productVariation = priceandqty.find((v) => v.id === variationId);
    const totalAmount = productVariation.price;
    const taxAmount = totalAmount * 0.07;
    const grandTotalAmount = totalAmount + taxAmount;
    const body = { status: 'NEW', totalAmount, taxAmount, grandTotalAmount, lineItems: [{ productVariation, price: totalAmount, quantity: 1 }]};
    await fetch(`https://ecommerce.edgecloud9.com/api/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)});
    alert('Thank you for your purchase');
    navigate('/');
  }

  useEffect(() => {
    const fetchProductInfo = async() => {
      const response = await fetch(`https://ecommerce.edgecloud9.com/api/products/${id}`);
      const data = await response.json();
      setPriceandqty(data.variations);
      delete data.variations;
      setProduct(data);
    }
    fetchProductInfo();
  }, [id, setProduct]);

  /*
  useEffect(() => {
    let eventSource;
    const subscribeProductInfo = async() => {
      eventSource = new EventSource(`https://localhost:9926/api/products/${id}`, { withCredentials: true });
      eventSource.addEventListener('message', (event) => {
        const data = JSON.parse(event.data).value;
        setPriceandqty(data.priceandqty);
      });
    }
    subscribeProductInfo();
    return () => eventSource?.close();
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
            {priceandqty && priceandqty.map((v) => (
              <div className="row" key={v.id}>
                <div className="col col-3">{v?.name}</div>
                <div className="col col-3">${v?.price}</div>
                <div className="col col-3 text-center">{v?.onHandCount}</div>
                <div className="col col-3">
                  <Button color="primary" disabled={v?.onHandCount < 1} block onClick={() => purchaseItem({ variationId: v.id })}>
                    {v?.onHandCount < 1 ? 'Sold Out' : 'Buy 1'}
                  </Button>
                </div>
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
