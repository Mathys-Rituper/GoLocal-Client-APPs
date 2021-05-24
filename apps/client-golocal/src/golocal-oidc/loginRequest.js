import React from 'react';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import axios from "axios";


export default function LoginRequest({userName, Password, setLoading, setResponse, setError}) {
    console.log("Log Request")
    const instance = axios.create({
        baseURL: 'https://localhost:5000/',
        timeout: 1000,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
    const username = userName;
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
                    localStorage.setItem("access_token", response.data.access_token)
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
