import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { database } from "../../app/firebase";
import { useState } from "react";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { ContextBox } from '../../App'
import module from './Category.module.scss'
import { Link } from "react-router-dom";

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
            products.push({ ...product.data(), id: product.id })
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
            <div className={module.maincards}>
                <Card text="123123" key={index}>
                    <div className="id-card" data-id={product.id}></div>
                    <Link to='/products'><Card.Img variant="top" src={product.photo} /></Link>
                    <Card.Body>
                        <div className={module.name}>
                            <Card.Title>
                                {product.name}
                            </Card.Title>
                        </div>
                        <div className={module.description}>
                            <Card.Text>
                                {product.description}
                            </Card.Text>
                        </div>
                    </Card.Body>
                    <div className={module.price}>
                        <Card.Footer>
                            <div className={module.price}><span className="price-product">{product.price}</span>$</div>
                            <div><button onClick={addToCart} className={module.btncart}>Добавить в корзину</button></div>
                        </Card.Footer>
                    </div>
                </Card>
            </div>
        )
    })

    return (
        <div>
            <div className={module.container}>
                <h1 className={module.text1}>Страница категории</h1>
                <div className={module.main}>
                    <CardGroup>
                        {viewProducts}
                    </CardGroup>
                </div>
            </div>
        </div>
    )
};

export default Category;