import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/">FamousTShirts</NavbarBrand>
    </Navbar>
  );

export default AppNavbar;
