import React, { FC, useState, useEffect } from "react";
import AnyReactComponent from "components/AnyReactComponent/AnyReactComponent";
import ProductCard from "./components/StayCardH/ProductCard";
import GoogleMapReact from "google-map-react";
import { DEMO_STAY_LISTINGS } from "data/listings";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Checkbox from "shared/Checkbox/Checkbox";
import Pagination from "shared/Pagination/Pagination";
import TabFilters from "./TabFilters";
import Heading from "components/Heading/Heading";
import NcImage from "shared/NcImage/NcImage";
import StartRating from "components/StartRating/StartRating";
import NumberInput from "./components/NumberInput/NumberInput";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import CartList from "components/CartList/CartList";
import Avatar from "shared/Avatar/Avatar";
import { RiShoppingCartLine } from 'react-icons/ri';
import { BsCartX } from 'react-icons/bs';
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useDispatch, useSelector } from 'react-redux';
import { increaseProductQuantity, decreaseProductQuantity, removeFromCart } from "store/cart/itemsSlice";
import AddToCart from "components/AddToCart/AddToCart";
import { Link } from "react-router-dom";



const DEMO_STAYS = DEMO_STAY_LISTINGS.filter((_, i) => i < 12);

export interface RestaurantProductsProps { 
  categoryList: any[];
  allProducts: any[];
  allCombo: any[];
  restaurant_id: number;
  restaurantData: any;
}

const RestaurantProducts: FC<RestaurantProductsProps> = ({
  categoryList,
  allProducts,
  allCombo,
  restaurant_id,
  restaurantData
}) => {

  const { products } = useSelector((state: any) => state.cart.items)
  const dispatch = useDispatch();

  const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1);
  const [showCart, setShowCart] = useState(false);
  const [ refresh, setRefresh] = useState(false)
  const [filteredArray, setFilteredArray] = useState<any>([]);
  const [restaurantProducts, setRestaurantProducts] = useState<any>(products?products:[])
  const [selectedType, setSelectedType] = useState<any>({label: "Products", name: "product"})
  const [selectedItem, setSelectedItem] = useState<any>({id: categoryList[0].id, name: categoryList[0].name})

  const [subTotal, setSubTotal] = useState<any>(0)

  const handleSelected = (item: any) => {
    setSelectedItem({id: item.id, name:item.name})
  }

  

  const addQuantity = (id:number, type:string) => {
    dispatch(increaseProductQuantity({id: id, type: type}));
  }

  const minusQuantity = (id:number, type:string) => {
    dispatch(decreaseProductQuantity({id: id, type: type}));
  }

  const removeProduct = (id:number, type:string) => {
    dispatch(removeFromCart({id: id, type: type}));
    setRefresh(!refresh)
  }

  useEffect(() => {
    
    let items = [];
    if(selectedType.name == "product"){
      if(selectedItem.id == -1)
        items = allProducts
      else{      
        items = allProducts.filter(item => item.category_id == selectedItem.id)
      }
    }

    setFilteredArray(items)

    if(restaurant_id && products?.length > 0){
      setRestaurantProducts(products.filter((item: any) => item.restaurant_id === restaurant_id))
      let tempPrice = 0;
      products.map((item:any) => { 
        if(item.restaurant_id === restaurant_id){
          let itemPrice = 0;
          let addonPrice = 0;         
          itemPrice = item.price;
          if(item.addons && item.addons.length > 0){
            item.addons.map((addon:any) => {
              addonPrice += addon.price
            })
          }
          tempPrice += (itemPrice + addonPrice)*item.quantity
        }
      })
      setSubTotal(tempPrice)
    }else{
      setRestaurantProducts([])
    }
  },[selectedType, selectedItem, restaurant_id, products, refresh])

  return (
    <div>
      <div className="relative flex min-h-screen">
        <div className="min-h-screen w-full xl:w-[780px] 2xl:w-[800px] flex-shrink-0 xl:px-8 ">
          <Heading 
            isCenter={true} 
            children={selectedType.name === "combo" ? "Combo Menu" : selectedItem.name} 
            // desc={filteredArray.length === 1? `1 item` :`${filteredArray.length} items`} 
          />
          <div className="mb-4 lg:mb-4">
            <TabFilters categoryList={categoryList} selectedItem={selectedItem.name} selectedType={selectedType.label} setSelectedType={setSelectedType} handleSelected={handleSelected}/>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {selectedType.name == "product" && filteredArray.map((item:any) => { 
              return (
                <div key={item.id} >
                  <ProductCard data={item}/>
                </div>
              )})
            }
            {selectedType.name == "combo" && allCombo.map((item:any) => { 
              return (
                <div key={item.id} >
                  <ProductCard data={item}/>
                </div>
              )})
            }
          </div>
        </div>

        {/* Cart */}
        <div
          className={`xl:flex-grow xl:static xl:block  w-full ${showCart ? "fixed inset-0 z-50" : "hidden"
            }`}
        >

          <div className="fixed xl:sticky top-10 xl:top-[88px]  left-0 w-full h-full xl:h-[calc(100vh-88px)] rounded-md overflow-hidden py-3 ">
            
              <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 ">     
                
                  <div className="relative grid bg-white dark:bg-neutral-800 p-3" >  
                    
                    <div className="ml-4 mb-5 mt-3">
                      <h2 className={`text-3xl md:text-3xl font-medium`}> Cart </h2>  
                      <span className="text-base text-neutral-500 dark:text-neutral-400">{restaurantData.name}</span>    
                    </div>      
                    
                    <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-4 overflow:p-7 overflow-x-hidden overflow-y-auto" style={{ maxHeight:"500px" }}>                   
                    {restaurantProducts.length === 0 && <div className="flex justify-center items-center"><BsCartX size={20} className="w-12 h-12 mr-2 text-primary-500"/>Cart is empty!</div>}
                    {restaurantProducts?.map((item: any, index: number) => { 
                        return(
                      <a
                        key={index}
                        style={{cursor:"context-menu"}}
                        className="flex p-2 pr-8 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 relative"
                      >
                        <Avatar sizeClass="w-32 h-32 sm:w-32 sm:h-32" radius="rounded" imgUrl={item.avatar}/>
  
                            <div className="ml-3 sm:ml-4 space-y-1 w-full">
                              <p className="text-lg font-medium text-gray-900 dark:text-gray-200 mb-1">
                                {item.name}
                              </p>
                              {/* <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                {item.description}
                              </p> */}
                              <span className="text-sm bg-green-100 text-green-900 rounded px-1 text-center mr-3">Unit Price : € {item.price}</span>

                              
                              {item.addons && item.addons.length > 0 && <>
                                <div className="flex flex-row flex-wrap text-xs">
                                  Addons : 
                                  {item.addons.map((addon:any) => {
                                    return(
                                      <p className="text-xs bg-primary-400 rounded px-1 text-white ml-1 mr-1 mb-1"> {addon.label}</p>
                                    )
                                  })} 
                                </div>
                                </>
                              }
                              <NumberInput label="Quantity" defaultValue={item.quantity} min={1} id={item.id} type={item.type} addQuantity={addQuantity} minusQuantity={minusQuantity}/>
                              {item.available_addons && item.available_addons.length > 0 && <AddToCart data={item} editAddon={true}/>}
                            </div>
                              <span style={{cursor:"pointer"}} className="w-5 h-5 bg-gray-50 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900 absolute top-2 right-2 rounded-full text-xs flex justify-center items-center" onClick={() => removeProduct(item.id, item.type)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 8.586L6.707 5.293a1 1 0 1 0-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 1 0 1.414 1.414L10 11.414l3.293 3.293a1 1 0 0 0 1.414-1.414L11.414 10l3.293-3.293a1 1 0 0 0-1.414-1.414L10 8.586z" clipRule="evenodd" />
                                </svg>
                              </span>
                      </a>
                    )})}
                    </div>
                    {restaurantProducts.length > 0 && <>
                      <p className="text-xl font-light text-center px-3 mt-4"><b>Sub Total : € {subTotal}</b></p>
                      <hr className=" small-hr"/>
                      <ButtonPrimary href={`/checkout`} sizeClass="p-2 rounded-xl mt-4">Checkout</ButtonPrimary>
                    </>
                    }
                  </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantProducts;
