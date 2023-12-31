import React from 'react';
import { Pizza } from '../types';
import SpecialOfferCSS from './SpecialOffer.module.css';
import { withAddToCart, AddToCartProps } from './AddToCart';

interface Props extends AddToCartProps { //The interface extends the HOC props
  pizza: Pizza;
}

const SpecialOffer: React.FC<Props> = ({ pizza, addToCart}) => { // withAddToCard wraps and adds the addToCart method
    const handleAddToCartClick = () => {
        addToCart(pizza);
    };

    return (
        <div className={SpecialOfferCSS.container}>
            <h2>{pizza.name}</h2>
            <p>{pizza.description}</p>
            <p>{pizza.price}</p>
            <button type="button" onClick={handleAddToCartClick}>
                Add to Cart
            </button>
        </div>
    );
};

// export default withAddToCart(SpecialOffer);
export default withAddToCart(SpecialOffer);