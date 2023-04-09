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

//Check Availability
export const checkTableAvailability = (restaurant_id, data) => {
    return new Promise((resolve,reject) =>{
        axios.post(`${config.SERVER_URL}/table_reservation/check_availability/${restaurant_id}`, data).then((res) => {
            resolve(res)
        }).catch ((res) => {
            reject(res)
        })
    })
}

//Reserve Table
export const reserveTable = (restaurant_id, data) => {
    return new Promise((resolve,reject) =>{
        axios.post(`${config.SERVER_URL}/table_reservation/create/${restaurant_id}`, data).then((res) => {
            resolve(res)
        }).catch ((res) => {
            reject(res)
        })
    })
}


