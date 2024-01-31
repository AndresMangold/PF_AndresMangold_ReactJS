import { useState, useEffect } from 'react'
import { getProductsById } from '../../asyncMock'
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom'

const ItemDetailContainer = () => {
    const [product, setProducts] = useState(null)

    const { itemId } = useParams()

    useEffect(() => {
        getProductsById(itemId)
            .then(response => {
                setProducts(response)
            })
            .catch(error => {
                console.error(error)
            })
    }, [itemId])

    return (
        <div className='ItemDetailContainer'>
            <h4 className='tituloDetalle font-weight-bold text-white mb-5 mt-5'>Detalles</h4>
            <ItemDetail {...product} />
        </div>
    )
}

export default ItemDetailContainer