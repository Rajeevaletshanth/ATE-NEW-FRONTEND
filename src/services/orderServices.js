import axios from "axios";
import config from "../config/config.json"

const header=()=>{
    const token=localStorage.getItem("access-token");
    return {
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }
}

export const bulkOrderApi = (data) => {
    return new Promise((resolve,reject) =>{
        axios.post(`${config.SERVER_URL}/orders/create_bulk`, { orders : data }).then((res) => {
            resolve(res)
        }).catch ((res) => {
            reject(res)
        })
    })
}


export const cancelOrderApi = (id) => {
    return new Promise((resolve,reject) =>{
        axios.delete(`${config.SERVER_URL}/orders/delete/${id}`).then((res) => {
            resolve(res)
        }).catch ((res) => {
            reject(res)
        })
    })
}


export const trackOrderApi = (order_number) => {
    return new Promise((resolve,reject) =>{
        axios.post(`${config.SERVER_URL}/orders/track`, { order_number:order_number }).then((res) => {
            resolve(res)
        }).catch ((res) => {
            reject(res)
        })
    })
}

export const myOrdersApi = (id) => {
    return new Promise((resolve,reject) =>{
        axios.get(`${config.SERVER_URL}/orders/all_orders/${id}`).then((res) => {
            resolve(res)
        }).catch ((res) => {
            reject(res)
        })
    })
}