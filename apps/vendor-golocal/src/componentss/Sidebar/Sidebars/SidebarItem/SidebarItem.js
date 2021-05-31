import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useRef, useState} from 'react';
import "./SidebarItem.css"
import { PanelMenu } from 'primereact/panelmenu';
import MyShops from "../../sub-components/MyShops/MyShops";
import ShopInfos from "../../sub-components/ShopInfos/ShopInfos";
import MyProducts from "../../sub-components/MyProducts/MyProducts";
import CreateProduct from "../../sub-components/CreateProduct/CreateProduct";
import {useLocation} from "react-router-dom";
import {confirmDialog} from "primereact/components/confirmdialog/ConfirmDialog";
import {Toast} from "primereact/toast";
import {deleteItemWithToken, deleteShopWithToken} from "../../../../golocal-oidc/functions";
import CreateService from "../../sub-components/CreateService/CreateService";
import ChangeImage from "../../sub-components/ChangeImage/ChangeImage";
import MyServices from "../../sub-components/MyServices/MyServices";
import ModifyContact from "../../sub-components/ModifyContact/ModifyContact";
import ModifyLocation from "../../sub-components/ModifyLocation/ModifyLocation";
import ChangeShopName from "../../sub-components/ChangeShopName/ChangeShopName";
import ChangeOpenings from "../../sub-components/ChangeOpenings/ChangeOpenings";
import ItemInfos from "../../sub-components/ItemInfos/ItemInfos";
import CreatePackage from "../../sub-components/CreatePackage/CreatePackage";
import ChangeItemImage from "../../sub-components/ChangeItemImage/ChangeItemImage";
import ChangeItemName from "../../sub-components/ChangeItemName/ChangeItemName";
import ChangeItemDescription from "../../sub-components/ChangeItemDescription/ChangeItemDescription";
import MyPackages from "../../sub-components/MyPackages/MyPackages";
import ChangeItemVisibility from "../../sub-components/ChangeItemVisibility/ChangeItemVisibility";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export default function SidebarItem(){
    const params = useQuery();
    const shopID = params.get("shopID");
    const shopName = params.get("shopName");
    const itemID = params.get("item");
    const itemName = params.get("itemName");
    const visibility = params.get("visibility");
    const [component, setComponent] = useState(<ItemInfos/>)
    const [displayGlobal, setDisplayGlobal] = useState(true)
    const [displayPackagesPage, setDisplayPackagesPage] = useState(false)
    const toast = useRef(null);
    const confirm2 = () => {
        confirmDialog({
            message: 'Voulez-vous supprimer votre item?',
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
            console.log(data)
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
            label:'Mon Item',
            icon:'pi pi-info-circle',
            command : () => {displayItem()},
            items:[
                {
                    label:'Modifier Nom',
                    icon:'pi pi-fw pi-pencil',
                    command : () => {modifyName()}
                },
                {
                    label:'Modifier Description',
                    icon:'pi pi-fw pi-pencil',
                    command : () => {modifyDescription()}
                },
                {
                    label:'Ajouter / Modifier Image',
                    icon:'pi pi-fw pi-image',
                    command : () => {modifyImage()}
                },
                // {
                //     label:'Modifier Visibilité',
                //     icon:'pi pi-fw pi-eye',
                //     command : () => {modifyVisibility()}
                //},
                {
                    label:'Supprimer Item',
                    icon:'pi pi-exclamation-triangle',
                    command : () => {confirm2()},
                }
            ]
        },
        {
            label:'Mes Packages',
            icon:'pi pi-table',
            command : () => {displayPackages()},
            items:[
                {
                    label:'Créer un package',
                    icon:'pi pi-fw pi-plus-circle',
                    command : () => {createPackage()}
                }
            ]
        }
    ];
    function displayItem(){
        if (!displayGlobal){
            setComponent(<ItemInfos/>)
            setDisplayGlobal(true);
            setDisplayPackagesPage(false);
        }
    }
    function displayPackages(){
        if (!displayPackagesPage){
            setComponent(<MyPackages/>)
            setDisplayPackagesPage(true);
            setDisplayGlobal(false);
        }
    }
    function modifyName(){
        setComponent(<ChangeItemName/>)
        setDisplayGlobal(false);
        setDisplayPackagesPage(false);
    }
    function modifyImage(){
        setComponent(<ChangeItemImage/>)
        setDisplayGlobal(false);
        setDisplayPackagesPage(false);
    }
    function modifyDescription(){
        setComponent(<ChangeItemDescription/>)
        setDisplayGlobal(false);
        setDisplayPackagesPage(false);
    }
    function createPackage(){
        setComponent(<CreatePackage/>)
        setDisplayGlobal(false);
        setDisplayPackagesPage(false);
    }
    function modifyVisibility(){
        setComponent(<ChangeItemVisibility/>)
        setDisplayGlobal(false);
        setDisplayPackagesPage(false);
    }


    function RenderSidebar(){
        return(
            <div style={{display:"flex", flexDirection:"row", minHeight:"830px"}}>
                <Toast ref={toast} />
                <div style={{width:'18%', backgroundColor:"#f8f9fa", borderRight:"2px solid rgb(170, 179, 179)"}}>
                    <div style={{fontFamily:"Lato, sans-serif", fontSize:"150%", marginLeft:"3%", paddingTop:"5%", marginBottom:"5%", fontWeight:"bold", cursor:"pointer"}} onClick={() =>{window.location.href=`https://localhost:3002/artisan/shop?shopID=${shopID}&shopName=${shopName}&visibility=${visibility}`}}>{"<"} Retour Boutique</div>
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
