import React from 'react';
import { Button, Container } from 'reactstrap';
import AppNavbar from './AppNavbar.js';
import { Link } from 'react-router-dom';

const OrderConfirmation
= () => {

  return (
    <div>
      <AppNavbar/>
      <Container fluid className="pt-4">
        <h3>Thank you for your order!</h3>
        <Button color="primary" tag={Link} to="/">Home</Button>
      </Container>
    </div>
  );
};

export default OrderConfirmation;
