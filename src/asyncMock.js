const products = [
        {
            id: '1',
            name: "Guerrero Vikingo",
            price: 25000,
            description: "Cedro",
            stock: 5,
            img: '13_Detalle_1.jpg',
            category: 'Individuales'
        },
        {
            id: '2',
            name: "Earl Vikingo",
            price: 10000,
            description: "Cedro",
            stock: 5,
            img: '1_Earl_Vikingo_1.jpg',
            category: 'Individuales'
        },
        {
            id: '3',
            name: "Earl Vikingo II",
            price: 10000,
            description: "Cedro",
            stock: 5,
            img: '1_Earl_Vikingo_2.jpg',
            category: 'Individuales'
        },
        {
            id: '4',
            name: "Hechicero",
            price: 12000,
            description: "Cedro",
            stock: 10,
            img: '2_Hechicero_1.jpg',
            category: 'Individuales'
        },
        {
            id: '5',
            name: "Sabio",
            price: 8000,
            description: "Cedro",
            stock: 5,
            img: '3_Sabio_1.jpg',
            category: 'Individuales'
        },
        {
            id: '6',
            name: "Guardia",
            price: 10000,
            description: "Cedro",
            stock: 5,
            img: '4_Guardia_1.jpg',
            category: 'Individuales'
        },
        {
            id: '7',
            name: "Rey",
            price: 10000,
            description: "Fresno",
            stock: 5,
            img: '5_Rey_1.jpg',
            category: 'Individuales'
        },
        {
            id: '8',
            name: "Reina",
            price: 10000,
            description: "Fresno",
            stock: 5,
            img: '6_Reina_1.jpg',
            category: 'Individuales'
        },
        {
            id: '9',
            name: "Escudera",
            price: 12000,
            description: "Cedro",
            stock: 5,
            img: '7_Escudera_1.jpg',
            category: 'Individuales'
        },
        {
            id: '10',
            name: "Caballero",
            price: 18000,
            description: "Fresno",
            stock: 5,
            img: '9_Caballero_1.jpg',
            category: 'Individuales'
        },
        {
            id: '13',
            name: "Miniaturas I",
            price: 20000,
            description: "Fresno",
            stock: 3,
            img: '8_Miniaturas_1.jpg',
            category: 'Miniaturas'
        },
        {
            id: '14',
            name: "Miniaturas II",
            price: 20000,
            description: "Fresno",
            stock: 3,
            img: '8_Miniaturas_2.jpg',
            category: 'Miniaturas'
        },
        {
            id: '15',
            name: "Conjunto I",
            price: 30000,
            description: "Cedro",
            stock: 3,
            img: '12_Conjunto_1.jpg',
            category: 'Conjuntos'
        },
        {
            id: '16',
            name: "Conjunto II",
            price: 30000,
            description: "Cedro",
            stock: 3,
            img: '12_Conjunto_2.jpg',
            category: 'Conjuntos'
        },
        {
            id: '17',
            name: "Conjunto Variado III",
            price: 30000,
            description: "Cedro",
            stock: 3,
            img: '12_Conjunto_1.jpg',
            category: 'Conjuntos'
        },
        {
            id: '18',
            name: "Miniatura Mendigo",
            price: 18000,
            description: "Fresno",
            stock: 5,
            img: '11_Mendigo_1.jpg',
            category: 'Miniaturas'
        },
]

export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products)
        }, 500)
    })
}

export const getProductsById = (productId) => {
    return new Promise ((resolve) => {
        setTimeout(() => {
            resolve(products.find(prod => prod.id === productId))
        }, 500)
    })
}

export const getProductsByCategory = (category) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.filter(prod => prod.category === category))
        }, 500)
    });
};