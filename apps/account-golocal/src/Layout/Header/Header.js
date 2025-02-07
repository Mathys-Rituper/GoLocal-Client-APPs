import React, {useState, useRef, useEffect} from 'react';
import { InputText } from 'primereact/inputtext'
import { Avatar } from 'primereact/avatar';
import {Button} from "primereact/button";
import { Sidebar } from 'primereact/sidebar';
import {TieredMenu} from "primereact/tieredmenu";
import Logo from './../../assets/goLocal.png'
import AvatarDefault from './../../assets/avatarDef.jpg'
import {goLocalGetUserInfo, goLocalLogout, oidcLogin} from "../../golocal-oidc/functions";
import "./Header.css"


function goHome(){
    window.location.href="https://localhost:3001/";
}
function goCart(){
    window.location.href="https://localhost:3001/cart";
}
export default function Header() {
    const [oidcUser, setOidcUser] = useState(null);
    const [value3, setValue3] = useState('');
    const [visible, setVisible] = useState(false);
    if (oidcUser === null ){
        goLocalGetUserInfo().then(data => setOidcUser(data));
    }
    let avatar;
    if(oidcUser){
        if (!oidcUser.avatar){
            avatar = AvatarDefault;
        }else{
            avatar = `data:image/jpeg;base64,${oidcUser.avatar}`;
        }
    }
    const menu = useRef(null);
    const items = [
        {
            label:'Panier',
            icon:'pi pi-fw pi-shopping-cart',
            command: () => {window.location.href="https://localhost:3001/cart"}
        },
        {
            label:'Commandes',
            icon:'pi pi-fw pi-euro',
            command: () => {window.location.href="https://localhost:3001/orders"}
        },
        {
            label:'Messagerie',
            icon:'pi pi-fw pi-send',
            command: () => {window.location.href="https://localhost:3001/messages"}
        },
        {
            label:'Artisan',
            icon:'pi pi-fw pi-user-plus',
            items:[
                {
                    label:'Panel',
                    icon:'pi pi-fw pi-table',
                    command: () => {window.location.href="https://localhost:3002/artisan/"}
                },
                {
                    label:'Informations',
                    icon:'pi pi-fw pi-info-circle',
                    command: () => {window.location.href="https://localhost:3001/artisan/become-artisan"}
                }
            ]
        },
        {
            separator:true
        },
        {
            label:'Déconnexion',
            icon:'pi pi-fw pi-power-off',
            command: () => {goLocalLogout()}
        }
    ];
    const sidebarItems = [
        {
            label:'Messagerie',
            icon:'pi pi-fw pi-send',
            command: () => {window.location.href="https://localhost:3001/messages"}
        },
        {
            separator:true
        },
        {
            label:'Panier',
            icon:'pi pi-shopping-cart',
            command: () => {window.location.href="https://localhost:3001/cart"}
        },
        {
            label:'Commandes',
            icon:'pi pi-fw pi-euro',
            command: () => {window.location.href="https://localhost:3001/orders"}
        },
        {
            separator:true
        },
        {
            label:'Panel Artisan',
            icon:'pi pi-fw pi-table',
            command: () => {window.location.href="https://localhost:3002/artisan/"}
        },
        {
            label:'Infos Artisan',
            icon:'pi pi-fw pi-info-circle',
            command: () => {window.location.href="https://localhost:3001/artisan/become-artisan"}
        },
        {
            separator:true
        },
        {
            label:'Déconnexion',
            icon:'pi pi-fw pi-power-off',
            command: () => {goLocalLogout()}
        }
    ];



    return(
        <div style={{width:"100%"}}>
            <Sidebar visible={visible} className="customSidebarHeader" fullScreen onHide={() => setVisible(false)}>
                <div className="sidebar-container">
                    <span className="sidebar-title">Mon Compte</span>
                    <TieredMenu style={{width:"100%"}} model={sidebarItems} />
                </div>
            </Sidebar>
            <div style={{display:"flex", flexDirection:"row",  alignContent:"center", alignItems:"center", marginRight:"5%", borderBottom:"2px solid #AAB3B3", width:"100%", paddingBottom:"0.5%", paddingTop:"0.5%", justifyContent:"space-between"}}>
                <img onClick={() => {goHome()}} className="responsive-logo" src={Logo} style={{marginLeft:"5%", cursor:"pointer"}}/>
                <div className="myaccount-text">MON COMPTE</div>
                {oidcUser ? (
                    <div className="account-cart">
                        <TieredMenu model={items} popup ref={menu} style={{width:"12%"}}/>
                        <Avatar onClick={() => {window.location.replace("https://localhost:3001/account")}} src={avatar} style={{cursor:"pointer"}} className="p-mr-2" size="large" shape="circle" />
                        <a style={{fontSize:"100%"}}>
                            Bonjour {oidcUser.userName} <br/> <b><span onClick={(event) => menu.current.toggle(event)}  style={{cursor:"pointer"}}>Mon Compte ▾</span></b>
                        </a>
                    </div>
                ) : (
                    <div style={{width:"15%", marginLeft:"13%"}}>
                        <Button onClick={oidcLogin} className="p-button-outlined" style={{borderRadius:"50px", borderColor:"#5988ff", color:"#5988ff"}}>Connexion</Button>
                    </div>
                )}
                {oidcUser ? (
                    <button className="hiddenButton" onClick={() =>{setVisible(true)}}><i className="pi pi-bars"/></button>
                ) : (
                    <div/>
                )

                }
            </div>
        </div>
    );
}
