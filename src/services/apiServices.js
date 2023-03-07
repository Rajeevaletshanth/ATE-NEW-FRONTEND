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

export const getAvatar = (avatar) => {
    return new Promise((resole, reject) => {
        axios({
            url : `${config.SERVER_URL}/getAvatar/${avatar}`,
            method : "GET",
            responseType : "blob"
        }).then((res) => {                     
            let blobfile = new File([res.data], "Profile")
            resole({response:"success", file: blobfile})
        }).catch((err) => {
            resole({response:"error", file: avatar})
        })
    }) 
}

//Top Brands
export const getTopBrandsApi = () => {
    return new Promise((resolve,reject) =>{
        axios.get(`${config.SERVER_URL}/top_brands/list`).then((res) => {
            resolve(res)
        }).catch ((res) => {
            reject(res)
        })
    })
}

//Top Offers
export const getTopOfferssApi = () => {
    return new Promise((resolve,reject) =>{
        axios.get(`${config.SERVER_URL}/top_offers/list`).then((res) => {
            resolve(res)
        }).catch ((res) => {
            reject(res)
        })
    })
}

//All Products
export const getAllProductsApi = () => {
    return new Promise((resolve,reject) =>{
        axios.get(`${config.SERVER_URL}/product/list`).then((res) => {
            resolve(res)
        }).catch ((res) => {
            reject(res)
        })
    })
}

//All Combo
export const getAllCombosApi = () => {
    return new Promise((resolve,reject) =>{
        axios.get(`${config.SERVER_URL}/combo_menu/list`).then((res) => {
            resolve(res)
        }).catch ((res) => {
            reject(res)
        })
    })
}

//All Restaurant
export const getAllRestaurantApi = () => {
    return new Promise((resolve,reject) =>{
        axios.get(`${config.SERVER_URL}/restaurant/list/all_kitchen`).then((res) => {
            resolve(res)
        }).catch ((res) => {
            reject(res)
        })
    })
}

//Top Offers
export const getCuisinesApi = () => {
    return new Promise((resolve,reject) =>{
        axios.get(`${config.SERVER_URL}/cuisines/list`).then((res) => {
            resolve(res)
        }).catch ((res) => {
            reject(res)
        })
    })
}

