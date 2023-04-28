import { useState, useEffect } from "react"
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { collection, query, getDocs } from "firebase/firestore";
import { database } from "../../app/firebase";
import { Link } from 'react-router-dom'
import module from './Catalogue.module.scss'

const Catalog = (props) => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getData();
    }, [])

    console.log(categories)

    async function getData() {
        const q = query(collection(database, "category"));
        const querySnapshot = await getDocs(q);
        let category = []
        querySnapshot.forEach((doc) => {
            category.push({ ...doc.data(), id: doc.id })
            console.log(doc.id)
        });
        setCategories(category)
    }

    const showAllCategory = categories.map((category, index) => {
        return (

            <div className={module.main}>
                <Link to={`/category/${category.id}`}>


                    <Card text="123123" key={index}>
                        <div className={module.photo}><Card.Img variant="top" src={category?.img} /></div>
                        <Card.Body>
                            <Card.Title>{category.name}</Card.Title>
                            <Card.Text>
                                {category.description}
                            </Card.Text>
                        </Card.Body>
                    </Card>

                </Link >
            </div>

        )
    })

    return (
        <div className={module.cont}>
            <CardGroup className={module.cardg}>
                <div className={module.showAll}>{showAllCategory}</div>
            </CardGroup>
        </div>

    )
};

export default Catalog;