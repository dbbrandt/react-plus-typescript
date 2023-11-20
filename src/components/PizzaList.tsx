import React from "react";
import AppCSS from './App.modules.css';
import {Pizza} from "../types";
import {AddToCartProps, withAddToCart} from "./AddToCart";

interface Props extends AddToCartProps{
    pizza: Pizza;
}

const PizzaList: React.FC<Props> = ({ pizza, addToCart}) => {

    const handleAddToCartClick = () => {
        addToCart(pizza);
    };

    return (
        <li className={AppCSS.li}>
            <h2>{pizza.name}</h2>
            <p>{pizza.description}</p>
            <p>{pizza.price}</p>
            <button type="button" onClick={handleAddToCartClick}>
                Add to Cart
            </button>
        </li>
    );
}

export default withAddToCart(PizzaList);