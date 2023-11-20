import React from "react";
import AppCSS from './App.modules.css';
import {useStateDispatch} from "./AppState";
import {Pizza} from "../types";

interface Props {
    pizza: Pizza;
}

const PizzaList: React.FC<Props> = ({ pizza}) => {

    const dispatch = useStateDispatch();

    // It is critical to create a new object when returning state to make sure the state change is registered
    // in order to rerender anything dependent on those changes.
    const handleAddToCartClick = () => {
        dispatch({type: 'ADD_TO_CART', payload: {...pizza,quantity: 1 }})
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

export default PizzaList;