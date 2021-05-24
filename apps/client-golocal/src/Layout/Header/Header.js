import React, {useState, useRef, useEffect} from 'react';
import { AuthenticationContext } from '@axa-fr/react-oidc-context';
import { InputText } from 'primereact/inputtext'
import { Avatar } from 'primereact/avatar';
import {Button} from "primereact/button";
import {TieredMenu} from "primereact/tieredmenu";
import Logo from './../../assets/goLocal.png'
import AvatarDefault from './../../assets/avatarDef.jpg'
import {goLocalGetUserInfo, goLocalLogout, oidcLogin, oidcRegister} from "../../golocal-oidc/functions";





export default function Header() {
    let avatar;
    const [oidcUser, setOidcUser] = useState(null);
    if (oidcUser === null ){
        goLocalGetUserInfo().then(data => setOidcUser(data));
    }
    if(oidcUser){
        if (!oidcUser.avatar){
            avatar = AvatarDefault;
        }else{
            avatar = oidcUser.avatar;
        }
    }

    const menu = useRef(null);
    const [value3, setValue3] = useState('');
    const items = [
        {
            label:'Sécurité',
            icon:'pi pi-fw pi-shield',
            command: () => {window.open('https://localhost:3000/', '_blank');}
        },
        {
            label:'Commandes',
            icon:'pi pi-fw pi-shopping-cart',
            command: () => {window.location.href="./basket"}
        },
        {
            label:'Message',
            icon:'pi pi-fw pi-send',
            command: () => {window.location.href="./messages}"}
        },
        {
            label:'Artisan',
            icon:'pi pi-fw pi-user-plus',
            items:[
                {
                    label:'Panel',
                    icon:'pi pi-fw pi-table',
                    command: () => {window.location.href="./artisan/dashboard"}
                },
                {
                    label:'Informations',
                    icon:'pi pi-fw pi-info-circle',
                    command: () => {window.location.href="./artisan/become-artisan"}
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
    function goHome(){
        window.location.href="https://localhost:3001/";
    }
    return(
        <div style={{width:"100%", marginBottom:"0.4%"}}>
            <div style={{display:"flex", flexDirection:"row",  alignContent:"center", alignItems:"center", marginRight:"5%", borderBottom:"2px solid #AAB3B3", width:"100%", paddingBottom:"0.5%", paddingTop:"0.5%"}}>
                <img onClick={() => {goHome()}} src={Logo} style={{width:"15%", marginLeft:"5%", cursor:"pointer"}}/>
                <span className="p-input-icon-right" style={{width:"30%", marginLeft:"15%"}}>
                    <i className="pi pi-search" style={{color:"#5988ff"}}/>
                    <InputText value={value3} onChange={(e) => setValue3(e.target.value)} placeholder="Saisissez votre recherche" style={{width:"100%", borderRadius:"50px", borderColor:"#5988ff"}}/>
                </span>
                {oidcUser ? (
                    <div style={{width:"25%", display:"flex", flexDirection:"row", alignContent:"center", marginLeft:"8%"}}>
                        <TieredMenu model={items} popup ref={menu} style={{width:"8%"}}/>
                        <Avatar onClick={() => {window.location.href="/account"}} image={avatar} style={{cursor:"pointer"}} className="p-mr-2" size="large" shape="circle" />
                        <a style={{fontSize:"100%"}}>
                            Bonjour {oidcUser.userName} <br/> <b><span onClick={(event) => menu.current.toggle(event)}  style={{cursor:"pointer"}}>Mon Compte ▾</span></b>
                        </a>
                        <Button onClick={goLocalLogout} className="p-button-outlined"  style={{borderRadius:"50px", marginLeft:"15%", borderColor:"#5988ff", color:"#5988ff"}}>Déconnexion</Button>
                    </div>
                ) : (
                    <div style={{width:"15%", marginLeft:"13%"}}>
                        <Button onClick={oidcRegister} className="p-button-outlined" style={{borderRadius:"50px", marginRight:"7%", borderColor:"#5988ff", color:"#5988ff"}}>Inscription</Button>
                        <Button onClick={oidcLogin} className="p-button-outlined" style={{borderRadius:"50px", borderColor:"#5988ff", color:"#5988ff"}}>Connexion</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
