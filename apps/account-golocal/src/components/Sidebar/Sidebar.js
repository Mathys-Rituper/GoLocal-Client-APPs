import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useState} from 'react';
import "./Sidebar.css"
import { PanelMenu } from 'primereact/panelmenu';
import ChangeA2F from "./sub-components/ChangeA2F/ChangeA2F";
import GlobalInformation from "./sub-components/GlobalInformation/GlobalInformation";
import ChangeAvatar from "./sub-components/ChangeAvatar/ChangeAvatar";
import ChangePhone from "./sub-components/ChangePhone/ChangePhone";
import ChangeEmail from "./sub-components/ChangeEmail/ChangeEmail";
import ChangePassword from "./sub-components/ChangePassword/ChangePassword";


export default function Sidebar(){
    const [component, setComponent] = useState(<GlobalInformation/>)
    const [displayGlobal, setDisplayGlobal] = useState(true)
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
            setComponent(<GlobalInformation/>)
            setDisplayGlobal(true);
            setDisplaySecurityInfo(false);
        }
    }
    function changeAvatar(){
        setComponent(<ChangeAvatar/>)
        setDisplayGlobal(false);
    }
    function changePhone(){
        setComponent(<ChangePhone/>)
        setDisplayGlobal(false);
    }
    function displaySecurity(){
        if (!displaySecurityInfo){
            setDisplaySecurityInfo(true);
            setDisplayGlobal(false);
        }
    }
    function changeEmail(){
        setComponent(<ChangeEmail/>)
        setDisplayGlobal(false);
    }
    function changePassword(){
        setComponent(<ChangePassword/>)
        setDisplayGlobal(false);
    }
    function changeA2F(){
        setComponent(<ChangeA2F/>)
        setDisplayGlobal(false);
    }


    function RenderSidebar(){
        return(
            <div style={{display:"flex", flexDirection:"row", minHeight:"830px"}}>
                <div style={{width:'18%', backgroundColor:"#f8f9fa", borderRight:"2px solid rgb(170, 179, 179)"}}>
                    <div style={{fontFamily:"Lato, sans-serif", fontSize:"150%", marginLeft:"3%", paddingTop:"5%", marginBottom:"5%", fontWeight:"bold"}}>Panel Client</div>
                    <PanelMenu model={items} multiple={true} />
                </div>
                <div style={{padding:"3%", width:"82%"}}>
                    {component}
                </div>
            </div>
        )
    }

    return RenderSidebar();
}
