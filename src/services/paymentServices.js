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
export const addPaymentCardAPi = (user_id, data) => {
    return new Promise((resolve,reject) =>{
        axios.post(`${config.SERVER_URL}/user_payment_card/add_card/${user_id}`, data).then((res) => {
            resolve(res)
        }).catch ((res) => {
            reject(res)
        })
    })
}

//get cards
export const getPaymentCardAPi = (user_id) => {
    return new Promise((resolve,reject) =>{
        axios.get(`${config.SERVER_URL}/user_payment_card/get_allcards/${user_id}`).then((res) => {
            resolve(res)
        }).catch ((res) => {
            reject(res)
        })
    })
}