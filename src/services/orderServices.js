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

//Add card
export const bulkOrderApi = (data) => {
    return new Promise((resolve,reject) =>{
        axios.post(`${config.SERVER_URL}/orders/create_bulk`, { orders : data }).then((res) => {
            resolve(res)
        }).catch ((res) => {
            reject(res)
        })
    })
}

//Add card
export const cancelOrderApi = (id) => {
    return new Promise((resolve,reject) =>{
        axios.put(`${config.SERVER_URL}/orders/edit/${id}`, { status : "cancelled" }).then((res) => {
            resolve(res)
        }).catch ((res) => {
            reject(res)
        })
    })
}