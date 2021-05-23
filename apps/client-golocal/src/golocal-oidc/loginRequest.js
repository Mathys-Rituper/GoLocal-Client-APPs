import React from 'react';

import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import axios from "axios";
import querystring from 'querystring'




export default function LoginRequest({userName, Password, setLoading, setResponse, setError}) {
    const instance = axios.create({
        baseURL: 'https://localhost:5000/',
        timeout: 1000,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
    const username = userName.replace(" ", "%20")
    // "grant_type=password&username=Alex&password=Alex19112001*&client_id=golocal&scope=artisan.api%20client.api"
    const password = Password;

        return(
        <div>
            <Request
                instance={instance}
                method="post"
                url="https://localhost:5000/connect/token"
                data={`grant_type=password&username=${username}&password=${password}&client_id=golocal&scope=artisan.api%20client.api`}
                debounce={200}
                debounceImmediate={true}
                isReady={true}
                onSuccess={(response)=>{
                    setLoading(false)
                    setResponse(response);
                }}
                onLoading={()=>{
                    setLoading(true)
                }}
                onError={(error) => {
                    setError(error);
                }}
            />
        </div>
    );
}
