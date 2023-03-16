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

import Avatar from "shared/Avatar/Avatar";
import { RiShoppingCartLine } from 'react-icons/ri';
import { BsCartX } from 'react-icons/bs';
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useDispatch, useSelector } from 'react-redux';
import { increaseProductQuantity, decreaseProductQuantity, removeFromCart } from "store/cart/itemsSlice";



const DEMO_STAYS = DEMO_STAY_LISTINGS.filter((_, i) => i < 12);

export interface RestaurantProductsProps { 
  categoryList: any[];
  allProducts: any[];
  allCombo: any[];
}

const RestaurantProducts: FC<RestaurantProductsProps> = ({
  categoryList,
  allProducts,
  allCombo
}) => {

  const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1);
  const [showCart, setShowCart] = useState(false);

  const [filteredArray, setFilteredArray] = useState<any>([]);

  const [selectedType, setSelectedType] = useState<any>({label: "Products", name: "product"})
  const [selectedItem, setSelectedItem] = useState<any>({id: categoryList[0].id, name: categoryList[0].name})

  const handleSelected = (item: any) => {
    setSelectedItem({id: item.id, name:item.name})
  }

  const { products } = useSelector((state: any) => state.cart.items)
  const dispatch = useDispatch();

  const addQuantity = (id:number, type:string) => {
    dispatch(increaseProductQuantity({id: id, type: type}));
  }

  const minusQuantity = (id:number, type:string) => {
    dispatch(decreaseProductQuantity({id: id, type: type}));
  }

  const removeProduct = (id:number, type:string) => {
    dispatch(removeFromCart({id: id, type: type}));
  }

  useEffect(() => {
    let items;
    if(selectedType.name == "product"){
      if(selectedItem.id == -1)
        items = allProducts
      else
        items = allProducts.filter(item => item.category_id == selectedItem.id)
    }else{
      items = allCombo
    }  
    setFilteredArray(items)
  },[selectedType, selectedItem])

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
            {filteredArray.map((item:any) => (
                <div
                  key={item.id}
                  // onMouseEnter={() => setCurrentHoverID((_) => item.id)}
                  // onMouseLeave={() => setCurrentHoverID((_) => -1)}
                >
                  <ProductCard data={item}/>
                </div>
              ))
            }
          </div>
        </div>

        {/* Cart */}
        <div
          className={`xl:flex-grow xl:static xl:block w-full ${showCart ? "fixed inset-0 z-50" : "hidden"
            }`}
        >

          <div className="fixed xl:sticky top-10 xl:top-[88px] left-0 w-full h-full xl:h-[calc(100vh-88px)] rounded-md overflow-hidden py-3 ">
            {/* <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-2 sm:space-y-2 px-0 sm:p-6 xl:p-4 "> */}
              {/*  */}
              <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 ">
                
                  <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-3" >                 
                    <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-4 overflow:p-7 overflow-x-hidden overflow-y-auto" style={{ maxHeight:"500px" }}>
                    {products.length === 0 && <div className="flex justify-center items-center"><BsCartX size={20} className="w-12 h-12 mr-2 text-primary-500"/>Cart is empty!</div>}
                    {products?.map((item: any, index: number) => (
                      <a
                        key={index}
                        style={{cursor:"context-menu"}}
                        className="flex p-2 pr-8 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 relative"
                      >
                        <Avatar sizeClass="w-24 h-24 sm:w-24 sm:h-24" radius="rounded" imgUrl={item.avatar}/>
  
                            <div className="ml-3 sm:ml-4 space-y-1 w-full">
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                {item.name}
                              </p>
                              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                {item.description}
                              </p>
                              <span className="text-xs bg-green-100 text-green-900 rounded px-1 text-center mr-3">€ {item.price}</span>

                              <NumberInput label="Quantity" defaultValue={item.quantity} min={1} id={item.id} type={item.type} addQuantity={addQuantity} minusQuantity={minusQuantity}/>

                              
                            </div>
                              <span style={{cursor:"pointer"}} className="w-5 h-5 bg-gray-50 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900 absolute top-2 right-2 rounded-full text-xs flex justify-center items-center" onClick={() => removeProduct(item.id, item.type)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 8.586L6.707 5.293a1 1 0 1 0-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 1 0 1.414 1.414L10 11.414l3.293 3.293a1 1 0 0 0 1.414-1.414L11.414 10l3.293-3.293a1 1 0 0 0-1.414-1.414L10 8.586z" clipRule="evenodd" />
                                </svg>
                              </span>
                      </a>
                    ))}
                    </div>
                    {products.length > 0 && <ButtonPrimary sizeClass="p-2 rounded-xl" >Checkout</ButtonPrimary>}
                  </div>
                </div>
              {/*  */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantProducts;
