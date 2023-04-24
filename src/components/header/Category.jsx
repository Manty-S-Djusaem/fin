import { useParams } from "react-router-dom";
import { useEffect, useContext} from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { database } from "../../app/firebase";
import { useState } from "react";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import {ContextBox} from '../../App'

const Category = (props) => {
    const id = useParams()
    const [products, setProducts] = useState([])
    const [box, setBox] = useContext(ContextBox)
    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        const q = query(collection(database, "product"), where("idCategory", "==", id.id));
        const allProducts = await getDocs(q)
        let products = []
        allProducts.forEach(product => {
            products.push({...product.data(), id: product.id})
        })
        setProducts(products)
        console.log(products)
    }

    function addToCart(event) {
        const currentCard = event.currentTarget.closest('.card')

        if (box.find(item => item.id === currentCard.querySelector('.id-card').dataset.id)) {
            const index = box.findIndex(item => item.id === currentCard.querySelector('.id-card').dataset.id)
            let nexBox = box;
            nexBox[index].count++;
            setBox(nexBox)
        } else {
            setBox([
                ...box,
                {
                    image: currentCard.querySelector('.card-img-top').getAttribute('src'),
                    title: currentCard.querySelector('.card-title').innerHTML,
                    description: currentCard.querySelector('.card-text').innerHTML,
                    price: currentCard.querySelector('.price-product').innerHTML,
                    id: currentCard.querySelector('.id-card').dataset.id,
                    count: 1
                }
            ])
        }
    }

    const viewProducts = products.map((product, index) => {
        return (
            <Card text="123123" key={index}>
                <div className="id-card" data-id={product.id}></div>
                <Card.Img variant="top" src={product.photo} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                    {product.description}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted"><span className="price-product">{product.price}</span>$</small>
                    <div><button onClick={addToCart}>Добавить в корзину</button></div>
                </Card.Footer>
            </Card>
        )
    })

    return (
        <div>
            <div className="container">
                Страница категории
                <CardGroup>
                    {viewProducts}
                </CardGroup>
            </div>
        </div>
    )
};

export default Category;