import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import SearchBar from '../SearchBar/SearchBar';
import styles from './navbar.module.css';

const NavBar = () => {
  const handleSearch = (searchTerm) => {
    console.log('Buscar:', searchTerm);
  };

  return (
    <nav className="navbar navbar-expand-lg text-center sticky-top" style={{ backgroundColor: "#1C1C1C" }}>
      <div className={`container-fluid ${styles.brandContainer}`}>
        <Link to='/'>
          <div className={`col col-12 col-lg-2 ${styles.logoContainer}`}>
            <img src="../img/Logo VM Woodworking_1.png" alt="Logo" className={styles.logo} />
          </div>
        </Link>
        <div className={`col col-12 col-lg-4 ${styles.titleContainer} d-flex align-items-center`}>
          <h3 className={styles.title}>VM Woodworking</h3>
          <div className={`row mt-3 ${styles.buttonContainer}`}>
            <div className='col-4'>
              <NavLink to={`/category/Individuales`} className={styles.Option}>Individuales</NavLink>
            </div>
            <div className='col-4'>
              <NavLink to={`/category/Conjuntos`} className={styles.Option}>Conjuntos</NavLink>
            </div>
            <div className='col-4'>
              <NavLink to={`/category/Miniaturas`} className={styles.Option}>Miniaturas</NavLink>
            </div>
          </div>
        </div>
        <div className={`col col-12 col-lg-2 ${styles.cartContainer}`}>
          <div className="row">
            <div className="col-12 mt-5 mr-lg-5">
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className="col-12">
              <CartWidget />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
