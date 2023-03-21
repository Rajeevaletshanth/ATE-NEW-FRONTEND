import { Tab } from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { FC, Fragment, useEffect, useState } from "react";
import visaPng from "images/vis.png";
import mastercardPng from "images/mastercard.svg";
import Input from "shared/Input/Input";
import Label from "components/Label/Label";
import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import StartRating from "components/StartRating/StartRating";
import NcModal from "shared/NcModal/NcModal";
import ModalSelectDate from "components/ModalSelectDate";
import moment from "moment";
import { DateRage } from "components/HeroSearchForm/StaySearchForm";
import converSelectedDateToString from "utils/converSelectedDateToString";
import ModalSelectGuests from "components/ModalSelectGuests";
import { GuestsObject } from "components/HeroSearchForm2Mobile/GuestsInput";
import Avatar from "shared/Avatar/Avatar";
import NumberInput from "../Restaurant/components/NumberInput/NumberInput";
import AddToCart from "components/AddToCart/AddToCart";
import { useDispatch, useSelector } from 'react-redux';
import { increaseProductQuantity, decreaseProductQuantity, removeFromCart } from "store/cart/itemsSlice";
import Heading from "components/Heading/Heading";
import Authenticate from "../Authenticate/Authenticate";
import PaymentCardModal from "../PaymentCard/PaymentCardModal";
import ListCard from "../PaymentCard/ListCard";

export interface CheckOutPageProps {
  className?: string;
}

const CheckOutPage: FC<CheckOutPageProps> = ({ className = "" }) => {

  const dispatch = useDispatch();
  const { products } = useSelector((state: any) => state.cart.items)
  const [deliveryCharge, setDeliveryCharge] = useState<any>(10);
  const [refresh, setRefresh] = useState<boolean>(false)
  const [total, setTotal] = useState<any>(0)
  const [rangeDates, setRangeDates] = useState<DateRage>({
    startDate: moment().add(1, "day"),
    endDate: moment().add(5, "days"),
  });
  const [guests, setGuests] = useState<GuestsObject>({
    guestAdults: 2,
    guestChildren: 1,
    guestInfants: 1,
  });

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

  //Cards
  const [cardRefresh, setCardRefresh] = useState<boolean>(false)
  const [cards, setCardList] = useState<any>([])

  useEffect(() => {
  
    let items = [];

    if(products?.length > 0){
      let tempPrice = 0;
      products.map((item:any) => { 
          let itemPrice = 0;
          let addonPrice = 0;         
          itemPrice = item.price;
          if(item.addons && item.addons.length > 0){
            item.addons.map((addon:any) => {
              addonPrice += addon.price
            })
          }
          tempPrice += (itemPrice + addonPrice)*item.quantity
      })
      setTotal(tempPrice)
    }
  },[products, refresh])

  const [selectedOption, setSelectedOption] = useState('delivery');


  const renderSidebar = () => {
    return (
      <div className="">
        <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
            
            <div className="overflow-hidden ">     
              
                <div className="relative grid" >  
                  
                  {/* <div className="ml-4 mb-5 mt-3">
                    <h2 className={`text-3xl md:text-3xl font-medium`}> View Cart </h2>  
                  </div>  */}
                  <Heading children="View Cart" className="text-xs" isCenter={true}/>
                  <div className="text-center mt-5 mb-4">
                    <p className={`text-sm md:text-sm font-medium`}>No delivery charge for self pickup</p> 
                    <div className="flex w-1/2 mx-auto rounded-lg border border-5 border-primary-500 overflow-hidden mt-3">
                      <button 
                        className={`flex-1 text-sm font-medium px-2 py-2 ${selectedOption === 'pickup' ? 'bg-primary-500 text-white' : 'bg-white dark:bg-neutral-900'}`} 
                        onClick={() => setSelectedOption('pickup')}
                      >
                        Pickup
                      </button>
                      <button 
                        className={`flex-1 text-sm font-medium px-2 py-2 ${selectedOption === 'delivery' ? 'bg-primary-500 text-white' : 'bg-white dark:bg-neutral-900'}`} 
                        onClick={() => setSelectedOption('delivery')}
                      >
                        Delivery
                      </button>
                    </div>
                  </div> 
                  <div className="text-center mb-4" hidden={selectedOption === "delivery"? false: true}>
                    <p className="text-sm font-medium">Delivered to</p>
                    <div className="border-b border-neutral-200 dark:border-neutral-700 w-1/12 mx-auto border-primary-500 mb-2"></div> 
                    <p  className="text-xs">Michael rd, mannar</p>
                    <p  className="text-xs">0712345672</p>
                  </div>  

                  <div className="border-b border-neutral-200 dark:border-neutral-700 mb-4"></div> 

                  <div className="relative grid gap-8 bg-white dark:bg-neutral-900 p-4 overflow:p-7 overflow-x-hidden overflow-y-auto" style={{ maxHeight:"500px" }}>                   
                  {products?.map((item: any, index: number) => { 
                      return(
                    <a
                      key={index}
                      style={{cursor:"context-menu"}}
                      className="flex p-2 pr-8 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 relative"
                    >
                      <Avatar sizeClass="w-28 h-28 sm:w-28 sm:h-28" radius="rounded" imgUrl={item.avatar}/>

                          <div className="ml-3 sm:ml-4 space-y-1 w-full">
                            <p className="text-lg font-medium text-gray-900 dark:text-gray-200 mb-1">
                              {item.name}
                            </p>
                            {/* <span className="text-sm bg-green-100 text-green-900 rounded px-1 text-center mr-3">Unit Price : € {item.price}</span> */}
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
                  {products.length > 0 && <>
                    <div className="flex flex-col space-y-4">
                      <h3 className="text-2xl font-semibold mt-3">Price detail</h3>
            
                      <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                        <span>Subtotal</span>
                        <span>€ {total}</span>
                      </div>
                      <div className="flex justify-between text-neutral-6000 dark:text-neutral-300" >
                        <span>Delivery Charge</span>
                        <span>€ {selectedOption === "delivery"?deliveryCharge : 0}</span>
                      </div>

                      <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-2xl font-bold text-primary-500">€ {total + (selectedOption === "delivery"? deliveryCharge: 0)}</span>
                      </div>
                    </div>
                    <ButtonPrimary  sizeClass="p-2 rounded-xl mt-6">Make Payment</ButtonPrimary>
                  </>
                  }
                </div>
              </div>
        </div>
      </div>
    );
  };

  const renderMain = () => {
    return (
      <>
      {/* Contact Details */}
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <Heading children="Contact Details" className="text-xs" isCenter={true}/>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="mt-6">
                  <div className="space-y-1">
                    <Label>Address </Label>
                    <Input placeholder="Delivery Address" />
                  </div>
                  <div className="space-y-1 mt-4">
                    <Label>Phone Number </Label>
                    <Input placeholder="Eg. 0123456789" />
                  </div>
            <div className="pt-8 flex justify-center">
              <ButtonPrimary className="rounded-xl">Confirm</ButtonPrimary>
            </div>
          </div>
        </div>
      </div>

      {/* Card Details */}
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8 mt-6 mb-6">
        <Heading children="Choose Payment Method" className="text-xs" isCenter={true}/>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <div className="flex flex-grow">
            
            <h3 className="text-lg font-semibold ">Credit/Debit Cards</h3>
            <PaymentCardModal className="flex ml-auto px-0 py-1 rounded-xl bg-neutral-500 dark:bg-gray-800 hover:bg-primary-700 dark:hover:bg-primary-700" buttonText="Add New Card" refresh={cardRefresh} setRefresh={setCardRefresh} cards={cards}/>
          </div>
          
            <div className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ListCard refresh={refresh} setRefresh={setRefresh} setCardList={setCardList}/>
              </div>
              <div className="pt-8 flex justify-center">
                <ButtonPrimary className="rounded-xl">Confirm</ButtonPrimary>
              </div>
          </div>
        </div>
      </div>
      </>
    );
  };

  return (
    <div className={`nc-CheckOutPage ${className}`} data-nc-id="CheckOutPage">
      <Authenticate/>
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className="block lg:block flex-grow mb-6">{renderSidebar()}</div>
      </main>
    </div>
  );
};

export default CheckOutPage;
