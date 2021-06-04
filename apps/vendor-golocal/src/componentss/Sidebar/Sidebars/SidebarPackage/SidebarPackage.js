import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useRef, useState} from 'react';
import "./SidebarPackage.css"
import { PanelMenu } from 'primereact/panelmenu';
import {useLocation} from "react-router-dom";
import {confirmDialog} from "primereact/components/confirmdialog/ConfirmDialog";
import {Toast} from "primereact/toast";
import {deleteItemWithToken, deleteShopWithToken} from "../../../../golocal-oidc/functions";
import ItemInfos from "../../sub-components/ItemInfos/ItemInfos";
import ChangePackageStock from "../../sub-components/ChangePackageStock/ChangePackageStock";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export default function SidebarPackage(){
    const params = useQuery();
    const shopID = params.get("shopID");
    const shopName = params.get("shopName");
    const itemID = params.get("item");
    const itemName = params.get("itemName");
    const visibility = params.get("visibility");
    const [component, setComponent] = useState(<ChangePackageStock/>)
    const [displayGlobal, setDisplayGlobal] = useState(true)
    const [displayPackagesPage, setDisplayPackagesPage] = useState(false)
    const toast = useRef(null);
    const confirm2 = () => {
        confirmDialog({
            message: 'Voulez-vous supprimer votre package?',
            header: 'Cette action est irréversible',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            rejectLabel: "Annuler",
            acceptLabel: "Supprimer",
            accept,
            reject
        });
    };
    const accept = () => {
        deleteItemWithToken(shopID, itemID, itemName).then(data =>{
            // console.log(data)
            if (data.status === 1){
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: data.message, life: 5000 });
            }else{
                toast.current.show({ severity: 'success', summary: 'Succès', detail: data, life: 5000 });
                setTimeout(()=> {
                    window.location.replace("https://localhost:3002/artisan")
                }, 2000)
            }
        })
    }
    const reject = () => {
        toast.current.show({ severity: 'info', summary: 'Annulation', detail: 'Vous avez annulé la suppression', life: 3000 });
    }
    const items = [
        {
            label:'Modifier Stocks',
            icon:'pi pi-pencil',
            command : () => {displayItem()},
        }
    ];
    function displayItem(){
        if (!displayGlobal){
            setComponent(<ChangePackageStock/>)
            setDisplayGlobal(true);
            setDisplayPackagesPage(false);
        }
    }




    function RenderSidebar(){
        return(
            <div style={{display:"flex", flexDirection:"row", minHeight:"830px"}}>
                <Toast ref={toast} />
                <div style={{width:'18%', backgroundColor:"#f8f9fa", borderRight:"2px solid rgb(170, 179, 179)"}}>
                    <div style={{fontFamily:"Lato, sans-serif", fontSize:"150%", marginLeft:"3%", paddingTop:"5%", marginBottom:"5%", fontWeight:"bold", cursor:"pointer"}} onClick={() =>{window.location.href=`https://localhost:3002/artisan/shop/item?shopID=${shopID}&shopName=${shopName}&visibility=${visibility}&item=${itemID}&itemName=${itemName}`}}>{"<"} Retour Item</div>
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

