import axios from "axios";
import config from "../config/config.json"


export const loginApi = (data) => {
    return new Promise((resolve,reject)=>{
        axios.post(`${config.SERVER_URL}/user/login`,data)
        .then((res) =>{
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const userRegister = (data) => {
    return new Promise((resolve,reject)=>{
        axios.post(`${config.SERVER_URL}/user/register`,data).then((res) =>{
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const editUserApi = (id,data,token) => {
    return new Promise((resolve,reject)=>{
        axios.put(`${config.SERVER_URL}/user/edit/${id}`,data,{
            headers: { 'Authorization':`Bearer ${token}` }
        }).then((res) =>{
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const logoutApi = () => {
    return new Promise((resolve,reject)=>{
        axios.get(`${config.SERVER_URL}/user/logout`)
        .then((res) =>{  
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const forgotPasswordApi = (email) => {
    return new Promise((resolve,reject)=>{
        axios.post(`${config.SERVER_URL}/user/forgot_password`,email)
        .then((res) =>{  
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const resetPasswordApi = (id,token,data) => {
    return new Promise((resolve,reject)=>{
        axios.post(`${config.SERVER_URL}/user/reset_password/${id}/${token}`,data)
        .then((res) =>{  
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

