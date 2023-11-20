import React, {createContext, useContext, useReducer, useEffect} from 'react';
import pizzaData from '../data/pizzas.json';
import {Pizza} from "../types";

export interface CartItem extends Pizza {
  quantity: number;
}

export interface AppStateValue {
  cart: {
    items: CartItem[];
  },
  pizzas: Pizza[];
}

const defaultStateValue: AppStateValue = {
  cart: {
    items: [],
  },
  pizzas: [...pizzaData]
};

interface AppStateProviderProps {
  children: React.ReactNode;
}

export const AppStateContext = createContext(defaultStateValue);

export const AppDispatchContext = createContext<
    React.Dispatch<AddToCartAction> | undefined
>(undefined);

export const useStateDispatch = () => {
  const dispatch = useContext(AppDispatchContext);
  if (!dispatch) {
    throw new Error(
      'useStateDispatch was called outside of the AppDispatchContext provider'
    );
  }
  return dispatch;
};

interface Action<T> {
  type: T;
}

interface AddToCartAction extends Action<'ADD_TO_CART'> {
  payload: CartItem;
}

interface InitializeCartAction extends Action<'INITIALIZE_CART'> {
  payload: { cart: AppStateValue['cart'] };
}

type CartAction = AddToCartAction | InitializeCartAction;

export const reducer = (state: AppStateValue, action: CartAction) => {
    if (action.type === 'ADD_TO_CART') {
        const itemToAdd: CartItem = action.payload;
        const existingItem: CartItem | undefined = state.cart.items.find(
            (p) => p.id === itemToAdd.id
        );
        let updatedItems: CartItem[];
        if (existingItem) {
            updatedItems = state.cart.items.map((item) =>
                item.id === itemToAdd.id ? {...item, quantity: item.quantity + 1} : item
            );
        } else {
            updatedItems = [...state.cart.items, {...itemToAdd}];
        }

        return {...state, cart: {items: updatedItems}};
    } else if (action.type === 'INITIALIZE_CART') {
        return {...state, cart: action.payload.cart};
    }
    return state;
}

  const AppStateProvider = ({ children }: AppStateProviderProps) => {
    const [state, dispatch] = useReducer(reducer,  defaultStateValue);

      useEffect(() => {
          const cart = window.localStorage.getItem('cart');
          if (cart) {
              dispatch({
                  type: 'INITIALIZE_CART',
                  payload: { cart: JSON.parse(cart) },
              });
          }
      }, []);

      useEffect(() => {
          window.localStorage.setItem('cart', JSON.stringify(state.cart));
      }, [state.cart]);

      return (
      <AppStateContext.Provider value={state}>
        <AppDispatchContext.Provider value={dispatch}>
          {children}
        </AppDispatchContext.Provider>
      </AppStateContext.Provider>
    );
  };

export default AppStateProvider;
