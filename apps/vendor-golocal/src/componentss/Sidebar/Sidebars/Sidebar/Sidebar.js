import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useState} from 'react';
import "./Sidebar.css"
import { PanelMenu } from 'primereact/panelmenu';
import MyShops from "../../sub-components/MyShops/MyShops";
import CreateShop from "../../sub-components/CreateShop/CreateShop";


export default function Sidebar(){
    const [component, setComponent] = useState(<MyShops/>)
    const [displayGlobal, setDisplayGlobal] = useState(true)
    const [displayMessagePage, setDisplayMessagesPage] = useState(false)
    const [displayInvoicesInfo, setDisplayInvoicesInfo] = useState(false)
    const items = [
        {
            label:'Mes Boutiques',
            icon:'pi pi-th-large',
            command : () => {displayShops()},
            items:[
                {
                    label:'Créer une boutique',
                    icon:'pi pi-fw pi-plus-circle',
                    command : () => {createShop()}
                }
            ]
        },
        {
            label:'Commandes',
            icon:'pi pi-shopping-cart',
            command : () => {displayInvoices()},
        },
        {
            label:'Messagerie',
            icon:'pi pi-envelope',
            command : () => {displayMessages()},
        },

    ];

    function displayShops(){
        if (!displayGlobal){
            setComponent(<MyShops/>)
            setDisplayGlobal(true);
            setDisplayInvoicesInfo(false);
            setDisplayMessagesPage(false)
        }
    }
    function createShop(){
        setComponent(<CreateShop/>)
        setDisplayGlobal(false);
        setDisplayMessagesPage(true)
        setDisplayInvoicesInfo(false);
    }
    function displayInvoices(){
        if (!displayInvoicesInfo){
            setComponent(<div style={{textAlign:"center", fontFamily:"Lato, sans-serif", fontSize:"150%", marginTop:"10%"}}>En développement</div>)
            setDisplayInvoicesInfo(true);
            setDisplayGlobal(false);
            setDisplayMessagesPage(false)
        }
    }
    function displayMessages(){
        if (!displayMessagePage){
            setComponent(<div style={{textAlign:"center", fontFamily:"Lato, sans-serif", fontSize:"150%", marginTop:"10%"}}>En développement</div>)
            setDisplayMessagesPage(true)
            setDisplayGlobal(false);
            setDisplayInvoicesInfo(false);
        }
    }



    function RenderSidebar(){
        return(
            <div style={{display:"flex", flexDirection:"row", minHeight:"830px"}}>
                <div style={{width:'18%', backgroundColor:"#f8f9fa", borderRight:"2px solid rgb(170, 179, 179)"}}>
                    <div style={{fontFamily:"Lato, sans-serif", fontSize:"150%", marginLeft:"3%", paddingTop:"5%", marginBottom:"5%", fontWeight:"bold"}}>Panel Artisan</div>
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
