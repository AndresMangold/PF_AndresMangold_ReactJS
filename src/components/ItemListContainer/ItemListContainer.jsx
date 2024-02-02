import { useState, useEffect } from 'react';
import ItemList from '../ItemList/ItemList.jsx'; 
import styles from './ItemListContainer.module.css';
import { useParams } from 'react-router-dom';
import { db } from '../../services/firebase/firebaseConfig.js';
import { getDocs, collection, query, where } from 'firebase/firestore';

const ItemListContainer = ({ greeting }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    const productsCollection = categoryId
    ? query(collection(db, 'products'), where('category', '==', categoryId))
    : collection(db, 'products');

    getDocs(productsCollection)
      .then((querySnapshot) => {
        const productsAdapted = querySnapshot.docs.map((doc) => {
          const fields = doc.data();
          return { id: doc.id, ...fields };
        });

        const sortedProducts = productsAdapted.sort((a, b) => a.order - b.order);

        setProducts(productsAdapted);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  return (
    <div className="container mt-5">
      <div className="row"> 
        <div className='col-12 text-center mb-5'>
          <h1 className={styles.mensaje}>{greeting}</h1>
        </div>
        <ItemList products={products} />
      </div>
    </div>
  );
};

export default ItemListContainer;
