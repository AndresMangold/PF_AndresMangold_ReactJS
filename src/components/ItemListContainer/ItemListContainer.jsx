import React, { useEffect } from 'react';
import ItemList from '../ItemList/ItemList.jsx'; 
import styles from './ItemListContainer.module.css';
import { useParams } from 'react-router-dom';
import { db } from '../../services/firebase/firebaseConfig.js';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { useAsync } from '../../hooks/useAsync.js';

const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams();

  const { data: products, error, loading } = useAsync(async () => {
    const productsCollection = categoryId
      ? query(collection(db, 'products'), where('category', '==', categoryId))
      : collection(db, 'products');

    const querySnapshot = await getDocs(productsCollection);
    const productsAdapted = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return productsAdapted.sort((a, b) => a.order - b.order);
  }, [categoryId]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="container mt-5">
        <div className="row"> 
            <div className='col-12 text-center mb-5'>
                <h1 className={styles.mensaje}>{greeting}</h1>
            </div>
            {loading ? (
                <div className="text-light">
                    <h3 className={`${styles.h3} h3`}>Cargando los productos...</h3>
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <ItemList products={products} />
            )}
        </div>
    </div>
);
};

export default ItemListContainer;
