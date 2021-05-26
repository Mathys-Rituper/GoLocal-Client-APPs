import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useState} from 'react';
import "./Sidebar.css"
import { PanelMenu } from 'primereact/panelmenu';
import {BrowserRouter, BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "../../Pages/Home/Home";
import AccountPage from "../../Pages/Account/Account";
import ConfirmAccountPage from "../../Pages/ConfirmAccount/ConfirmAccountPage";
import ResetPasswordPage from "../../Pages/ResetPassword/ResetPasswordPage";
import ConfirmPasswordPage from "../../Pages/ConfirmPassword/ConfirmPasswordPage";
import Login from "../../Pages/Login/Login";
import NoMatch from "../NoMatch/NotFound";
import Test1 from "../Account/sub-components/Test1";
import Test2 from "../Account/sub-components/Test2";

export default function Sidebar(){
    const [component, setComponent] = useState(<div>Default</div>)
    const [displayGlobal, setDisplayGlobal] = useState(false)
    const [displaySecurityInfo, setDisplaySecurityInfo] = useState(false)
    const items = [
        {
            label:'Mes Informations',
            icon:'pi pi-user',
            command : () => {displayInformation()},
            items:[
                {
                    label:'Changer Avatar',
                    icon:'pi pi-fw pi-user-edit',
                    command : () => {changeAvatar()}
                },
                {
                    label:'Changer Téléphone',
                    icon:'pi pi-fw pi-phone',
                    command : () => {changePhone()}
                }
            ]
        },
        {
            label:'Sécurité',
            icon:'pi pi-shield',
            command : () => {displaySecurity()},
            items:[
                {
                    label:'Changer adresse mail',
                    icon:'pi pi-envelope',
                    command : () => {changeEmail()}
                },
                {
                    label:'Changer mot de passe',
                    icon:'pi pi-lock',
                    command : () => {changePassword()}
                },
                {
                    label:'Double authentification',
                    icon:'pi pi-lock',
                    command : () => {changeA2F()}
                },
            ]
        },

    ];

    function displayInformation(){
        if (!displayGlobal){
            setComponent(<div>Global </div>)
            setDisplayGlobal(true);
            setDisplaySecurityInfo(false);
        }
    }
    function changeAvatar(){
        setComponent(<div>Global Avatar</div>)
    }
    function changePhone(){
        setComponent(<div>Global Phone</div>)
    }
    function displaySecurity(){
        if (!displaySecurityInfo){
            setComponent(<div>Security</div>)
            setDisplaySecurityInfo(true);
            setDisplayGlobal(false);
        }
    }
    function changeEmail(){
        setComponent(<div>Security Email</div>)
    }
    function changePassword(){
        setComponent(<div>Security Password</div>)
    }
    function changeA2F(){
        setComponent(<div>A2F</div>)
    }


    function RenderSidebar(){
        return(
            <div style={{display:"flex", flexDirection:"row", minHeight:"830px"}}>
                <div style={{width:'18%', backgroundColor:"#f8f9fa", borderRight:"2px solid rgb(170, 179, 179)"}}>
                    <div style={{fontFamily:"Lato, sans-serif", fontSize:"150%", marginLeft:"3%", paddingTop:"5%", marginBottom:"5%", fontWeight:"bold"}}>Panel Client</div>
                    <PanelMenu model={items} multiple={true} />
                </div>
                <div style={{padding:"2%"}}>
                    {component}
                </div>
            </div>
        )
    }

    return RenderSidebar();
}
