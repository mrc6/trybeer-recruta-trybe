import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BeerContext } from '../context/context';
import './style/MenuTop.css';

function MenuTop() {
  const [open, setOpen] = useState(false);
  const { title } = useContext(BeerContext);

  const showAside = () => (
    <div className="showAside">
      <Link className="link-aside" data-testid="side-menu-item-products" to="/products">Produtos</Link>
      <Link className="link-aside" data-testid="side-menu-item-my-orders" to="/orders">Meus pedidos</Link>
      <Link className="link-aside" data-testid="side-menu-item-my-profile" to="/profile">Meu Perfil</Link>
      <Link className="link-aside" data-testid="side-menu-item-logout" to="/login">Sair</Link>
    </div>
  );

  const asideLinks = () => (
    <button
      data-testid="top-hamburguer"
      className="menu-btn"
      type="button"
      onClick={() => setOpen(true)}
    >
      <div className="menu-toggle" />
      <div className="menu-toggle" />
      <div className="menu-toggle" />
    </button>
  );

  const menuToggle = () => (
    <button
      data-testid="top-hamburguer"
      className="menu-btn"
      type="button" onClick={() => setOpen(false)}>
      <div className="menu-toggle" />
      <div className="menu-toggle" />
      <div className="menu-toggle" />
      <div className="side-menu-container">
        {showAside()}
      </div>
    </button>
  );

  return (
    <header className="header" >
      {open ? menuToggle() : asideLinks()}
      <h1 className="top-title" data-testid="top-title">{title}</h1>
    </header>
  );
}

export default MenuTop;
