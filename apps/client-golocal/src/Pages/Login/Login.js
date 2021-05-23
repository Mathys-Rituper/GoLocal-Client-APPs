import React, {useState} from 'react';

import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import axios from "axios";
import querystring from 'querystring'
import LoginRequest from "../../golocal-oidc/loginRequest";




export default function Login() {
    const instance = axios.create({
        baseURL: 'https://localhost:5000/',
        timeout: 1000,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
    const [response, setResponse] = useState({})
    console.log(response);
    const userName = 'Alex'
    const password = "Alex19112001*"
        return(
        <div>
            <LoginRequest userName={userName} Password={password} setResponse={setResponse}/>
        </div>
    );
}
