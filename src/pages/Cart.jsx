import React from 'react';

import { ContextBox } from "../App";
import {useContext} from "react"

const Cart = (props) => {
    const [box, setBox] = useContext(ContextBox)

    const allProducts = box.map((item, index) => {
        return (
            <div className="goods" key={index}>
                <div className="title">{item.title}</div>
                <div className="title">
                    <img src={item.image} alt="" />
                </div>
                <div>{item.price}</div>
            </div>
        )
    })

    return (
        <div>
            <Header />
            <div className="container">
                Корзина
                {allProducts}
            </div>
            <Footer />
        </div>
    )
};
export default Cart;