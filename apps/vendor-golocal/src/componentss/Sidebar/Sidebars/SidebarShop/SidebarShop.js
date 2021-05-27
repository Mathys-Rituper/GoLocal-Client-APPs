import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useState} from 'react';
import "./SidebarShop.css"
import { PanelMenu } from 'primereact/panelmenu';
import MyShops from "../../sub-components/MyShops/MyShops";


export default function SidebarShop(){
    const [component, setComponent] = useState(<MyShops/>)
    const [displayGlobal, setDisplayGlobal] = useState(true)
    const [displayMessagePage, setDisplayMessagesPage] = useState(false)
    const [displayInvoicesInfo, setDisplayInvoicesInfo] = useState(false)
    const items = [
        {
            label:'Mes Produits',
            icon:'pi pi-th-large',
            command : () => {displayShops()},
            items:[
                {
                    label:'Créer un produit',
                    icon:'pi pi-fw pi-plus-circle',
                    command : () => {createShop()}
                }
            ]
        },
        {
            label:'Mes Services',
            icon:'pi pi-th-large',
            command : () => {displayShops()},
            items:[
                {
                    label:'Créer un service',
                    icon:'pi pi-fw pi-plus-circle',
                    command : () => {createShop()}
                }
            ]
        },
        {
            label:'Ma boutique',
            icon:'pi pi-info-circle',
            command : () => {displayShops()}
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
        setComponent(<div>Create shop</div>)
        setDisplayGlobal(false);
        setDisplayMessagesPage(true)
        setDisplayInvoicesInfo(false);
    }
    function displayProducts(){
        if (!displayInvoicesInfo){
            setComponent(<div>Display Invoices</div>)
            setDisplayInvoicesInfo(true);
            setDisplayGlobal(false);
            setDisplayMessagesPage(false)
        }
    }
    function displayServices(){
        if (!displayMessagePage){
            setComponent(<div>Display Messages</div>)
            setDisplayMessagesPage(true)
            setDisplayGlobal(false);
            setDisplayInvoicesInfo(false);
        }
    }



    function RenderSidebar(){
        return(
            <div style={{display:"flex", flexDirection:"row", minHeight:"830px"}}>
                <div style={{width:'18%', backgroundColor:"#f8f9fa", borderRight:"2px solid rgb(170, 179, 179)"}}>
                    <div style={{fontFamily:"Lato, sans-serif", fontSize:"150%", marginLeft:"3%", paddingTop:"5%", marginBottom:"5%", fontWeight:"bold", cursor:"pointer"}} onClick={() =>{window.location.href="https://localhost:3002/artisan"}}>{"<"} Retour Panel</div>
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
