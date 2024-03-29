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

//Get image
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

//Upload image
export async function uploadFile(data) {
    return new Promise((resolve, reject) => {
        const formdata = new FormData(); 
        formdata.append('file', data[0]);
        axios.post(`${config.SERVER_URL}/uploadSingle`, formdata,{
          headers: { "Content-Type": "multipart/form-data" }
        }).then((res) => {
            resolve(res.data.filename)    
        }).catch((err) => {
            reject(err)
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

//Restaurant by ID
export const getRestaurantApi = (id) => {
    return new Promise((resolve,reject) =>{
        axios.get(`${config.SERVER_URL}/restaurant/${id}`).then((res) => {
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

//Category
export const getCategoriesApi = (restaurant_id) => {
    return new Promise((resolve,reject) =>{
        axios.get(`${config.SERVER_URL}/category/restaurant/${restaurant_id}`).then((res) => {
            resolve(res)
        }).catch ((res) => {
            reject(res)
        })
    })
}

//Get Addons by multiple ids
export const getAddonsByIds = (data) => {
    return new Promise((resolve,reject) =>{
        axios.post(`${config.SERVER_URL}/addons/multiple`, data).then((res) => {
            resolve(res)
        }).catch ((res) => {
            reject(res)
        })
    })
}
