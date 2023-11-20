import React from "react";
import AppCSS from "./App.modules.css";
import PizzaList from "./PizzaList";
import {AppStateContext} from "./AppState";

class Menu extends React.Component {
    render() {
        return (
            <AppStateContext.Consumer>
                {(state) => {
                    return (
                        <ul className={AppCSS.pizzaList}>
                            {state.pizzas.map((pizza) => {
                                return <PizzaList key={pizza.id} pizza={pizza} />;
                            })}
                        </ul>
                    );
                }}
            </AppStateContext.Consumer>
        )
    }
}

export default Menu;