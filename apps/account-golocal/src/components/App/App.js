import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NoMatch from '../NoMatch/NotFound'
import Home from "../../Pages/Home/Home";
import ConfirmAccountPage from "../../Pages/ConfirmAccount/ConfirmAccountPage";
import Login from "../../Pages/Login/Login";
import ConfirmPasswordPage from "../../Pages/ConfirmPassword/ConfirmPasswordPage"
import ResetPasswordPage from "../../Pages/ResetPassword/ResetPasswordPage";
import AccountPage from "../../Pages/Account/Account";
import ConfirmEmailChangePage from "../../Pages/ConfirmEmailChange/ConfirmEmailChangePage";


function App() {

    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/account">
                        <AccountPage/>
                    </Route>
                    <Route exact path="/account/register/confirmation">
                        <ConfirmAccountPage/>
                    </Route>
                    <Route exact path="/security/email/confirmation">
                        <ConfirmEmailChangePage/>
                    </Route>
                    <Route exact path="/forgotPassword">
                        <ResetPasswordPage/>
                    </Route>
                    <Route exact path="/account/password/confirmation">
                        <ConfirmPasswordPage/>
                    </Route>
                    <Route exact path="/login">
                        <Login/>
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
