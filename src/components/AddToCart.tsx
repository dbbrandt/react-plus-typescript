import React from 'react';
import { useStateDispatch } from './AppState';
import {Pizza} from "../types";

export interface AddToCartProps {
  addToCart: (item: Pizza) => void;
}

export function withAddToCart<OriginalProps extends AddToCartProps>(
  ChildComponent: React.ComponentType<OriginalProps>
) {
  return (props: Omit<OriginalProps, keyof AddToCartProps>) => { //Omit needed because the  component this
                                  // is wrapping will not have AddToCartProps as this is the whole purpoase of the hOC.
    const dispatch = useStateDispatch();
    const handleAddToCartClick: AddToCartProps['addToCart'] = (item) => {
      dispatch({
        type: 'ADD_TO_CART',
        payload: {...item, quantity: 1}
      });
    };
    return (
      <ChildComponent
        {...(props as OriginalProps)} // assert as OriginalProps is needed because of the Omit above
        addToCart={handleAddToCartClick}
      />
    );
  };
}
