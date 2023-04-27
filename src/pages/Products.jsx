import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { database } from '../app/firebase';
import { useState } from "react";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { ContextBox } from '../App';
import { Link } from "react-router-dom";
import module from './Products.module.scss'

const Products = (props) => {
    const id = useParams()
    const [towars, setTowars] = useState([])
    const [box, setBox] = useContext(ContextBox)
    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        const q = query(collection(database, "product"), where("idCategory", "==", id.id));
        const allTowars = await getDocs(q)
        let towars = []
        allTowars.forEach(product => {
            towars.push({ ...product.data(), id: product.id })
        })
        setTowars(towars)
        console.log(towars)
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

    const viewTowars = towars.map((towars, index) => {
        return (
            <div className={module.maincards}>
                <Card text="123123" key={index}>
                    <div className="id-card" data-id={towars.id}></div>
                    <Card.Img variant="top" src={towars.photo} />
                    <Card.Body>
                        <div className={module.name}>
                            <Card.Title>
                                {towars.name}
                            </Card.Title>
                        </div>
                        <div className={module.description}>
                            <Card.Text>
                                {towars.description}
                            </Card.Text>
                        </div>
                    </Card.Body>
                    <div className={module.price}>
                        <Card.Footer>
                            <div className={module.price}><span className="price-product">{towars.price}</span>$</div>
                        </Card.Footer>
                    </div>
                </Card>
            </div>
        )
    })

    return (
        <div>
            <div className={module.container}>
                <h1 className={module.text1}>Страница Товара</h1>
                <div className={module.main}>
                    <CardGroup>
                        {viewTowars}
                    </CardGroup>
                </div>
            </div>
        </div>
    );
}

export default Products;