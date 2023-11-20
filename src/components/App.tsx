import React from "react";
import Cart from "./Cart";
import AppCSS from './App.modules.css';
import PizzaSVG from '../svg/pizza.svg';
import AppStateProvider from './AppState';
import Menu from './Menu';

const App = () => {
    return (
        <AppStateProvider>
            <div className={AppCSS.container}>
                <div className={AppCSS.header}>
                    <PizzaSVG/>
                    <div className={AppCSS.siteTitle}>Delicious Pizza</div>
                    <Cart/>
                </div>
                <Menu/>
            </div>
        </AppStateProvider>
    );
}

export default App;