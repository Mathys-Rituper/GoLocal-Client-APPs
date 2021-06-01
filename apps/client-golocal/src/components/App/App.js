import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { AuthenticationProvider, oidcLog } from '@axa-fr/react-oidc-context';
import oidcConfiguration from './config.json';
import NoMatch from './../NoMatch/NotFound'
import Header from "../../Layout/Header/Header";
import Home from "../../Pages/Home/Home";
import Account from "../../Pages/Account/Account";
import Faq from "../Faq/Faq";
import Shop from "../../Pages/Shop/ShopByID";
import ShopWithFilter from "../../Pages/Shop/ShopWithFilter";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import BecomeVendor from "../../Pages/BecomeVendor/BecomeVendor";
import Cart from "../Cart/Cart";
import ItemPage from "../../Pages/Item/ItemPage";
import ConfirmedOrder from "../../components/Cart/ConfirmedOrder";
import ConfirmedOrderPage from "../../Pages/ConfirmedOrder/ConfirmedOrderPage";
import CartPage from "../../Pages/Cart/Cart";


function App() {

  return (
    <div>
        <Router>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/shop">
                        <Shop/>
                    </Route>
                    <Route exact path="/shop/filtered">
                        <ShopWithFilter/>
                    </Route>
                    <Route exact path="/account">
                        <Account/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/register">
                        <Register/>
                    </Route>
                    <Route exact path="/shop/item">
                        <ItemPage/>
                    </Route>
                    <Route path="/artisan/become-artisan">
                        <BecomeVendor/>
                    </Route>
                    <Route path="/header">
                        <Header/>
                    </Route>
                    <Route path="/faq">
                        <Faq/>
                    </Route>
                    <Route exact path="/cart">
                        <CartPage/>
                    </Route>
                    <Route path={"/confirmedOrder"}>
                        <ConfirmedOrderPage/>
                    </Route>
                    <Route path="*">
                        <NoMatch/>
                    </Route>

                </Switch>
        </Router>
    </div>
  );
}

export default App;
