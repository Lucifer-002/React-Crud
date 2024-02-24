import React from 'react';
import { Menu, Image } from 'semantic-ui-react';
import './Navbar.css'; // Import your CSS file

const Navbar = () => {
  return (
    <Menu className="navbar-container" style={{ backgroundColor: 'beige' }}>
      <Menu.Menu position='left'>
        <Menu.Item style={{ color: 'red' }}>My Shop</Menu.Item>
        <Menu.Item style={{ color: 'red' }}>My Products</Menu.Item>
        <Menu.Item style={{ color: 'red' }}>Retailers</Menu.Item>
      </Menu.Menu>
      
      <Menu.Menu position='right'>
        <Menu.Item>
          <Image src="https://www.freeiconspng.com/thumbs/cart-icon/basket-cart-icon-27.png" alt="cart" className="navbar-image1" />
        </Menu.Item>
        <Menu.Item>
          <Image src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" alt="profile" className="navbar-image2" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
