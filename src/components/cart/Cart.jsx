import React from 'react';

import { ContextBox } from '../../App';
import { useContext } from "react"
import { removeItem } from 'localforage';
import module from './Cart.module.scss'

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
                <div className={module.pr}><button>УДАЛИТЬ</button></div>
            </div>
        )
    })

    return (
        <div>
            <div className="container">
                Корзина
                {allProducts}
            </div>
        </div>
    )
};
export default Cart;