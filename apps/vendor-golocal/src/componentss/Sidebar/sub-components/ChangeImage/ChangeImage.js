import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useRef, useState} from 'react';
import {Avatar} from "primereact/avatar";
import {FileUpload} from "primereact/fileupload";
import {ProgressBar} from "primereact/progressbar";
import {Tag} from "primereact/tag";
import {Button} from "primereact/button";
import { Toast } from 'primereact/toast';
import {patchImageShop} from "../../../../golocal-oidc/functions";

function emptyTemplate() {
    return (
        <div className="p-d-flex p-ai-center p-dir-col">
            <i className="pi pi-image p-mt-3 p-p-5" style={{'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)'}}/>
            <span style={{'fontSize': '1.2em', color: 'var(--text-color-secondary)'}} className="p-my-5">Glissez et déposez votre image ici</span>
        </div>
    )
}

export default function ChangeImage(){
    const [totalSize, setTotalSize] = useState(0);
    const toast = useRef(null);
    const fileUploadRef = useRef(null);
    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    }
    const itemTemplate = (file, props) => {
        return (
            <div className="p-d-flex p-ai-center p-flex-wrap">
                <div className="p-d-flex p-ai-center" style={{width: '40%'}}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="p-d-flex p-dir-col p-text-left p-ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="p-px-3 p-py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger p-ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        )
    }
    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        _totalSize += e.files[0].size;
        setTotalSize(_totalSize);
    }
    const onTemplateUpload = (e) => {
        let _totalSize = 0;
        _totalSize += (e.files[0].size || 0);

        setTotalSize(_totalSize);
        console.log(e);
        const reader = new FileReader();
        reader.readAsDataURL(e.files[0]);
        let base64Image;
        reader.onloadend = function() {
            base64Image = reader.result;
            console.log(base64Image);

            patchImageShop(base64Image).then(data => {
                if (data.status === 1){
                    toast.current.show({severity: 'error', summary: 'Erreur', detail: data.message});
                }else{
                    toast.current.show({severity: 'info', summary: 'Success', detail: data.message});
                }
            })
        }
    }
    const onTemplateClear = () => {
        setTotalSize(0);
    }
    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize/10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';
        return (
            <div className={className} style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <ProgressBar value={value} displayValueTemplate={() => `${formatedValue} / 1 MB`} style={{width: '300px', height: '20px', marginLeft: 'auto'}}/>
            </div>
        );
    }
    const chooseOptions = {icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined'};
    const uploadOptions = {icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined'};
    const cancelOptions = {icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'};

    return (
        <div className="container">
            <div className="title">CHANGEMENT AVATAR</div>
            <Toast ref={toast}/>
            <FileUpload ref={fileUploadRef} name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php" accept="image/jpeg,image/png" maxFileSize={1000000}
                        onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                        headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                        chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />

        </div>
    )
}
