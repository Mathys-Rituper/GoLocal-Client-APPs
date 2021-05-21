import React, {useState , useRef} from 'react';
import { AuthenticationContext } from '@axa-fr/react-oidc-context';
import { useReactOidc } from '@axa-fr/react-oidc-context';
import { decode } from "jsonwebtoken"
import { Avatar } from 'primereact/avatar';
import {Button} from "primereact/button";
import {TieredMenu} from "primereact/tieredmenu";
import Logo from './../../assets/goLocal.png'
import AvatarDefault from './../../assets/avatarDef.jpg'
import "./Header.css"
import {Sidebar} from "primereact/sidebar";
import { PanelMenu } from 'primereact/panelmenu';

export default function Header() {
    const { oidcUser, logout } = useReactOidc();
    const [visibleFullScreen, setVisibleFullScreen] = useState(false);
    let decodedToken;
    if (oidcUser){decodedToken = decode(oidcUser.access_token)}
    const menu = useRef(null);
    const [value3, setValue3] = useState('');
    const items = [
        {
            label:'Sécurité',
            icon:'pi pi-fw pi-shield',
            command: () => {window.location.href="./security"}
        },
        {
            label:'Profile',
            icon:'pi pi-fw pi-user',
            command: () => {window.location.href="./profile"}
        },
        {
            label:'Go Local',
            icon:'pi pi-fw pi-home',
            command: () => {window.location.replace("https://localhost:3001/")}
        },
        {
            separator:true
        },
        {
            label:'Déconnexion',
            icon:'pi pi-fw pi-power-off',
            command: () => {logout()}
        }
    ];
    const items2 = [
        {
            label:'Sécurité',
            icon:'pi pi-fw pi-shield',
            command: () => {window.location.href="./security"}
        },
        {
            label:'Profil',
            icon:'pi pi-fw pi-user',
            command: () => {window.location.href="./profile"}
        },
        {
            label:'Go Local',
            icon:'pi pi-fw pi-home',
            command: () => {window.location.replace("https://localhost:3001/")}
        },
        {
            label:'Déconnexion',
            icon:'pi pi-fw pi-power-off',
            command: () => {logout()}
        }
    ];
    function goHome(){
        window.location.href="https://localhost:3001/";
    }
    return(
        <div style={{width:"100%"}}>
            <AuthenticationContext.Consumer>
                {props => {
                    return (
                        <div className="container">
                            <img onClick={() => {goHome()}} src={Logo} className="img" alt="."/>
                            {props.oidcUser ? (
                                <div className="menu-wrapper menu" >
                                    <Sidebar visible={visibleFullScreen} fullScreen onHide={() => setVisibleFullScreen(false)}>
                                        <h1 style={{ fontWeight: 'normal' }}>Menu</h1>
                                        <PanelMenu model={items2} style={{width:'100%'}}/>
                                    </Sidebar>

                                    <Button icon="pi pi-list" onClick={() => setVisibleFullScreen(true)} className="p-mr-0 burger"/>
                                    <TieredMenu className="menu-wrapper menu-to-shrink" model={items} popup ref={menu} style={{width:"8%"}}/>
                                    <Avatar className="menu-wrapper menu-to-shrink" onClick={() => {window.location.href="/account"}} image={AvatarDefault} style={{cursor:"pointer"}} className="p-mr-2" size="large" shape="circle" />
                                    <a className="menu-wrapper menu-to-shrink" style={{fontSize:"100%", fontFamily:"Lato"}}>
                                        Bonjour {decodedToken.name} <br/> <b><span onClick={(event) => menu.current.toggle(event)}  style={{cursor:"pointer"}}>Mon Compte ▾</span></b>
                                    </a>
                                </div>
                            ) : (
                                <div style={{width:"15%", marginLeft:"13%"}} className="menu-wrapper">
                                    <Button className="menu-wrapper" onClick={() => {window.location.href="https://localhost:5000/account/register"}} className="p-button-outlined" style={{borderRadius:"50px", marginRight:"7%", borderColor:"#5988ff", color:"#5988ff"}}>Inscription</Button>
                                    <Button className="menu-wrapper" onClick={props.login} className="p-button-outlined" style={{borderRadius:"50px", borderColor:"#5988ff", color:"#5988ff"}}>Connexion</Button>
                                </div>
                            )}
                        </div>
                    );
                }}
            </AuthenticationContext.Consumer>
        </div>
    );
}
