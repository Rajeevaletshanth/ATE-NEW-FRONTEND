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
import SelectableCard from "../PaymentCard/SelectableCard";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { bulkOrderApi, cancelOrderApi } from 'services/orderServices';
import { capturePaymentAPi } from 'services/paymentServices';
import Swal, { SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from "react-router-dom";
import { emptyCart } from "store/cart/itemsSlice";

const MySwal = withReactContent(Swal);

export interface CheckOutPageProps {
  className?: string;
}

const CheckOutPage: FC<CheckOutPageProps> = ({ className = "" }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state: any) => state.cart.items)
  const { id } = useSelector((state: any) => state.auth.user)
  const [deliveryCharge, setDeliveryCharge] = useState<any>(10);
  const [refresh, setRefresh] = useState<boolean>(false)
  const [address, setAddress] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("")
  const [deliveryType, setDeliveryType] = useState<string>("delivery")
  const [addressLabel, setAddressLabel] = useState<string>("")
  const [deliverOption, setDeliverOption] = useState<string>("")
  const [selectedCard, setSelectedCard] = useState<string>("")
  const [isCardSelected, setIsCardSelected] = useState<boolean>(true)

  const [total, setTotal] = useState<any>(0)

  const [cardConfirm, setCardConfirm] = useState<boolean>(false);
  const [contactConfirm, setContactConfirm] = useState<boolean>(false);

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

    if(products?.length === 0){
      navigate('/')
    }
  
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

  


  const renderSidebar = () => {

    const handlePayment = async () => {
      let orders: any = [];
      const groupedProducts = Object.values(products.reduce((acc:any, product:any) => {
        const { restaurant_id } = product;
        if (!acc[restaurant_id]) {
          acc[restaurant_id] = {restaurant_id, products: []};
        }
        acc[restaurant_id].products.push(product);
        return acc;
      }, {}));

      groupedProducts?.forEach((restaurant:any, key:number) => {
        let tempPrice = 0;
        let productsArr: any = [] 
        restaurant.products.forEach((item:any, productKey: number) => {
          let itemPrice = 0;
          let addonPrice = 0;
          let addonsArr:any = [];
          itemPrice = item.price;
          if(item.addons){
            if(typeof item.addons === "object"){
              if(item.addons.length > 0){
                item.addons.forEach((addon:any, addonKey:number) => {
                  addonPrice += addon.price;
                  addonsArr[addonKey] = {
                    addon_id : addon.id,
                    addon_name : addon.label,
                    unit_price : addon.price,
                    quantity : 1
                  }
                })
              }
            }else{
              if(JSON.parse(item.addons).length > 0){
                JSON.parse(item.addons).forEach((addon:any, addonKey:number) => {
                  addonPrice += addon.price;
                  addonsArr[addonKey] = {
                    addon_id : addon.id,
                    addon_name : addon.label,
                    unit_price : addon.price,
                    quantity : 1
                  }
                })
              }
            }
          }
          tempPrice += (itemPrice + addonPrice)*item.quantity
          productsArr[productKey] = {
            product_id: item.id,
            quantity: item.quantity,
            addons: addonsArr
          }
        })
        orders[key] = {
          restaurant_id: restaurant.restaurant_id,
          user_id: id,
          products: productsArr,
          // delivery_fee : 0,
          total_amount : tempPrice,
          status : "pending",
          order_type : deliveryType,
          delivery_address : address,
          phone_no : phoneNo
        }
      })

      const response = await bulkOrderApi(orders);
      if(response.data.response === "success"){
        //Card Payment
        const paymentData = {
          user_id: id,
          amount: (total + (deliveryType === "delivery"? deliveryCharge: 0))*100, 
          paymentMethodId: selectedCard,
          currency: "eur"
        }
        const payment = await capturePaymentAPi(paymentData)
        if(payment.data.response === "success"){
          MySwal.fire({
            title:"Payment successful",
            text: "Order placed successful",
            icon: "success",
            confirmButtonText: "Track my order",
            confirmButtonColor: 'rgba(218, 0, 0, 1)',
          }).then(() => {
            const cartProducts = products;
            dispatch(emptyCart())
            navigate('/pay-done', { state: { products: cartProducts } });
          })
        }else{
          response.data.data.map(async(item:any) => {
            await cancelOrderApi(item[0].id)
          })
          MySwal.fire({
            title:"Oops",
            text: "Payment failure. Please try again.",
            icon: "error",
            confirmButtonColor: 'rgba(218, 0, 0, 1)',
          })
        }
      }else{
        MySwal.fire({
          title:"Oops",
          text: response.data.message,
          icon: "error",
          confirmButtonColor: 'rgba(218, 0, 0, 1)',
        })
      }
      
    }

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
                        className={`flex-1 text-sm font-medium px-2 py-2 ${deliveryType === 'pickup' ? 'bg-primary-500 text-white' : 'bg-white dark:bg-neutral-900'}`} 
                        onClick={() => setDeliveryType('pickup')}
                      >
                        Pickup
                      </button>
                      <button 
                        className={`flex-1 text-sm font-medium px-2 py-2 ${deliveryType === 'delivery' ? 'bg-primary-500 text-white' : 'bg-white dark:bg-neutral-900'}`} 
                        onClick={() => setDeliveryType('delivery')}
                      >
                        Delivery
                      </button>
                    </div>
                  </div> 
                  <div className="text-center mb-4" hidden={deliveryType === "delivery"? false: true}>
                    <p className="text-sm font-medium">Delivered to</p>
                    <div className="border-b border-neutral-200 dark:border-neutral-700 w-1/12 mx-auto border-primary-500 mb-2"></div> 
                    <p  className="text-xs">{address}</p>
                    <p  className="text-xs">{phoneNo}</p>
                  </div>  

                  <div className="border-b border-neutral-200 dark:border-neutral-700 mb-4"></div> 

                  <div className="relative grid gap-8 bg-white dark:bg-neutral-900 p-4 overflow:p-7 overflow-x-hidden overflow-y-auto" style={{ maxHeight:"500px" }}>                   
                  {products?.map((item: any, key: number) => { 
                      return(
                    <a
                      key={key}
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
                        <span>€ {deliveryType === "delivery"?deliveryCharge : 0}</span>
                      </div>

                      <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-2xl font-bold text-primary-500">€ {total + (deliveryType === "delivery"? deliveryCharge: 0)}</span>
                      </div>
                    </div>
                    {/* <ButtonPrimary  sizeClass="p-2 rounded-xl mt-6 disabled:bg-gray-800" onClick={handlePayment}>Make Payment</ButtonPrimary> */}
                    <ButtonPrimary  sizeClass="p-2 rounded-xl mt-6 disabled:bg-gray-800" disabled={cardConfirm && contactConfirm? false: true} onClick={handlePayment}>Make Payment</ButtonPrimary>
                  </>
                  }
                </div>
              </div>
        </div>
      </div>
    );
  };

  const renderMain = () => {
    const handleContactConfirm = (e:any) => {
      e.preventDefault();
      setContactConfirm(true);
    }

    const handleContactReset = () => {
      setAddress("")
      setPhoneNo("")
      setAddressLabel("")
      setDeliverOption("")
      setContactConfirm(false);
    }

    const handleCardConfirm = () => {
      if(selectedCard === ""){
        setIsCardSelected(false)
        setCardConfirm(false);
      }else{
        setIsCardSelected(true)
        setCardConfirm(true);
      }
      
    }

    const handleCardReset = () => {
      setSelectedCard("")
      setCardConfirm(false);
    }

    return (
      <>
      {/* Contact Details */}
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <Heading children="Contact Details" className="text-xs" isCenter={true}/>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <form onSubmit={handleContactConfirm}>
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="mt-6">
                  <div className="space-y-1">
                    <Label>Address </Label>
                    <Input required minLength={5} maxLength={100} placeholder="Delivery Address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                  </div>
                  <div className="space-y-1 mt-4">
                    <Label>Phone Number </Label>
                    <Input required minLength={9} maxLength={15} placeholder="Eg. 0123456789" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)}/>
                  </div>
            </div>

            <h3 className="text-lg font-semibold mt-6">Address Label (Optional)</h3>
            <div className="flex items-center mt-6">
              <label className="inline-flex items-center">
                <input type="radio" checked={addressLabel === 'home'} onChange={(e) => setAddressLabel(e.target.value)} className="focus:ring-action-primary h-6 w-6 text-primary-500 border-primary rounded border-neutral-500 bg-white dark:bg-neutral-700  dark:checked:bg-primary-500 focus:ring-primary-500" name="deliver" value="home" />
                <span className="ml-4">Home</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input type="radio" checked={addressLabel === 'work'} onChange={(e) => setAddressLabel(e.target.value)} className="focus:ring-action-primary h-6 w-6 text-primary-500 border-primary rounded border-neutral-500 bg-white dark:bg-neutral-700  dark:checked:bg-primary-500 focus:ring-primary-500" name="deliver" value="work"/>
                <span className="ml-4">Work</span>
              </label>
            </div>

            <h3 className="text-lg font-semibold mt-6">Deliver to (Optional)</h3>
            <div className="flex items-center mt-6">
              <label className="inline-flex items-center">
                <input type="radio" checked={deliverOption === 'door'} onChange={(e) => setDeliverOption(e.target.value)} className="focus:ring-action-primary h-6 w-6 text-primary-500 border-primary rounded border-neutral-500 bg-white dark:bg-neutral-700  dark:checked:bg-primary-500 focus:ring-primary-500" name="pickup" value="door" />
                <span className="ml-4">Deliver to door</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input type="radio" checked={deliverOption === 'outside'} onChange={(e) => setDeliverOption(e.target.value)} className="focus:ring-action-primary h-6 w-6 text-primary-500 border-primary rounded border-neutral-500 bg-white dark:bg-neutral-700  dark:checked:bg-primary-500 focus:ring-primary-500" name="pickup" value="outside"/>
                <span className="ml-4">Pickup outside</span>
              </label>
            </div>

            <div className="pt-8 flex justify-center space-x-2">
              <ButtonSecondary className="rounded-xl" onClick={handleContactReset}>Reset</ButtonSecondary>
              <ButtonPrimary type="submit" className="rounded-xl disabled:bg-gray-800" disabled={contactConfirm?true:false}>{contactConfirm? "Confirmed":"Confirm"}</ButtonPrimary>
            </div>
          </form>
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
            {!isCardSelected && <code className="flex border border-primary-500 py-2 text-lg font-bold text-primary-500 justify-center mb-4">Please select a card!</code>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectableCard refresh={refresh} setRefresh={setRefresh} setCardList={setCardList} selectedCard={selectedCard} setSelectedCard={setSelectedCard}/>
            </div>
              
              <div className="pt-8 flex justify-center space-x-2">
                <ButtonSecondary className="rounded-xl" onClick={handleCardReset}>Reset</ButtonSecondary>
                <ButtonPrimary className="rounded-xl disabled:bg-gray-800" onClick={handleCardConfirm} disabled={cardConfirm?true:false}>{cardConfirm? "Confirmed":"Confirm"}</ButtonPrimary>
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
