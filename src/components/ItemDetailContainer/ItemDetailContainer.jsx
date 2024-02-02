import { useState, useEffect } from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router-dom';
import { db } from '../../services/firebase/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore'; 
import './ItemDetailContainer.module.css'

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const { itemId } = useParams();

  useEffect(() => {
    const productDocument = doc(db, 'products', itemId); 
    getDoc(productDocument)
      .then((queryDocumentSnapshot) => {
        const fields = queryDocumentSnapshot.data(); 
        const productAdapted = { id: queryDocumentSnapshot.id, ...fields };
        setProduct(productAdapted);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [itemId]);

  return (
    <div className='ItemDetailContainer'>
      <h1 className='tituloDetalle font-weight-bold text-white mb-5 mt-5'>Detalles</h1>
      <ItemDetail {...product} />
    </div>
  );
};

export default ItemDetailContainer;
