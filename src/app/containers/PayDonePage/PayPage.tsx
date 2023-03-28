import StartRating from "components/StartRating/StartRating";
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import { Link, useLocation } from 'react-router-dom';
import Lottie from "lottie-react";
import greenTick from './green-tick.json'
import Avatar from "shared/Avatar/Avatar";
import { getRestaurantApi } from 'services/apiServices'

export interface PayPageProps {
  className?: string;
}

const PayPage: FC<PayPageProps> = ({ className = "" }) => {
  const location = useLocation();

  const products = location.state?.products || [];
  const delivery_fee = location.state?.delivery_fee || 0;
  const order_details = location.state?.order_details || [];

  const [restaurants, setRestaurants] = useState<any>([])
  
  const getRestaurantData = () => {
    order_details?.map(async(item:any) => {
      const response = await getRestaurantApi(item.restaurant_id)
      if(response.data.response === "success"){
        setRestaurants((s:any) => {
          return [
            ...s, response.data.restaurant[0]
          ]
        })
      }
    })
  }

  useEffect(() => {
    getRestaurantData()
  },[order_details])

  const getRestaurantDet = (id:any) => {
    const data = restaurants.find((r:any) => r.id === id);
    return data
  }


  const renderOrders = () => {
    return(
      products && products.length > 0 && products.map((product: any, productKey: number) => {
          let total = 0
          const restaurantData: any = getRestaurantDet(order_details[productKey].restaurant_id)
          const timeString = order_details[productKey].order_time;
          const date = new Date();
          date.setHours(timeString.split(':')[0]);
          date.setMinutes(timeString.split(':')[1]);
          date.setSeconds(timeString.split(':')[2]);
          const formattedTime = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(date)
          return(
            
            <div className="m-2 md:m-6">
        <div className="w-full flex flex-col rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-lg space-y-6 sm:space-y-8 p-2 py-8 sm:p-8 xl:p-8">
        <div className="py-2 text-center"> 
          <div className="flex justify-center">
                    <Lottie className='w-1/6 h-1/6' animationData={greenTick} />
                  </div>
                  <h2 className="text-xl md:text-3xl font-semibold mt-4 text-gray-600 dark:text-gray-300">Thanks for your order</h2>
                  
                  {/* <div className="flex flex-row justify-center mt-4">
                    <span className="flex flex-row justify-center rounded-full px-4 py-1 text-gray-900 text-xs md:text-sm bg-primary-500" style={{backgroundColor:"#8fe5ba"}}>
                      <span className="mr-1 md:flex hidden">Order No : </span>
                      {order_details[productKey].order_number}
                    </span>
                  </div> */}
                  
            </div>

            <div className="flex flex-grow justify-center">
              <div className="max-w-full bg-gray-50 dark:bg-gray-800 p-4 px-6 rounded-xl">
                {/* <p className=" text-lg font-medium text-primary-500 text-center">{restaurantData?.name}</p> */}
                <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm text-center">Restaurant : {restaurantData?.name}</p>
                <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm  text-center">Order Number : {order_details[productKey].order_number}</p>
                <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm  text-center">Order Date : {order_details[productKey].order_date}</p>
                <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm  text-center">Order Time : {formattedTime}</p>
                <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm  text-center">Payment Method : Credit Card</p>
                <div className="flex flex-row justify-center mt-4">
                    <Link to={`/order-tracking?id=${order_details[productKey].order_number}`} target="_blank">
                      <ButtonPrimary className="px-3 py-1 rounded-xl">Track Order</ButtonPrimary>
                    </Link>
                  </div>
              </div>
            </div>

            
            
            <div className="overflow-hidden ">                   
                <div className="relative grid" >         
                  <div className="relative grid gap-8 bg-white dark:bg-neutral-900 p-4 overflow:p-7 overflow-x-hidden overflow-y-auto" style={{ maxHeight:"500px" }}>                   
                  <p className="font-semibold">Products</p>
                  {product.products.map((item: any, key: number) => { 
                      let itemPrice = 0;
                      itemPrice +=  item.price * item.quantity
                      return(
                    <a
                      key={key}
                      style={{cursor:"context-menu"}}
                      className="flex p-2 pr-8 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 relative"
                    >

                          <Avatar sizeClass="w-20 h-20 " radius="rounded" imgUrl={item.avatar}/>

                          <div className="flex flex-col ml-3 sm:ml-4 space-y-1 w-full">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-1 text-left">
                              {item.name}
                            </p>
                            {/* <span className="text-sm bg-green-100 text-green-900 rounded px-1 text-center mr-3">Unit Price : € {item.price}</span> */}
                            {item.addons && item.addons.length > 0 && <>
                              <div className="flex flex-row flex-wrap text-xs">
                                Addons : 
                                {item.addons.map((addon:any) => {
                                  itemPrice += addon.price * item.quantity;
                                  return(
                                    <p className="text-xs bg-primary-400 rounded px-1 text-white ml-1 mr-1 mb-1"> {addon.label}</p>
                                  )
                                })} 
                              </div>
                              </>
                            }
                            <p className="text-xs font-medium text-gray-900 dark:text-gray-200 mb-1 text-left">
                              Quantity : {item.quantity}
                            </p>
                            {/* <p className="text-xs font-medium text-gray-900 dark:text-gray-200 mb-1 text-left">
                              unit Price : {item.price}
                            </p> */}
                          </div>
                          <div className="text-lg ml-4">€<span className="">{itemPrice}</span></div>
                    </a>
                  )})}
                  </div>

                  {products.length > 0 && <>
                    <div className="flex flex-col space-y-4 mx-6">
                      
                      <div className="border-b border-dashed border-neutral-200 dark:border-neutral-700 mt-4 mb-4" style={{borderWidth: '0 0 2px 2px', borderStyle: 'dashed', }}></div>
                      <div className="flex justify-between text-neutral-6000 dark:text-neutral-300" >
                        <span>Delivery Charge</span>
                        <span>{order_details[productKey].delivery_fee? `€ ${order_details[productKey].delivery_fee}` : "€ 0"}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-xl">Total</span>
                        <span className="text-xl font-bold text-primary-500">€ {order_details[productKey].total_amount}</span>
                      </div>
                    </div>
                  </>
                  }
                </div>
              </div>
        </div>
      </div>
            // <div className="border border-neutral-100 dark:border-neutral-800 rounded-xl p-2 md:m-4">
            //   hello
            // </div>
          )
        })   
    )
  }

  const renderContent = () => {
    return (
            // <div className="w-full flex flex-col rounded-2xl border border-neutral-100 dark:border-neutral-800  shadow-xl">
            //     <h1 className="text-white text-xs md:text-lg md:font-medium text-center py-4 px-6 bg-primary-500 rounded-t-2xl">dfd</h1>
            //     <div className="py-8 text-center"> 
            //       <div className="flex justify-center">
            //         <Lottie className='w-1/6 h-1/6' animationData={greenTick} />
            //       </div>
            //       <h2 className="text-xl md:text-3xl font-semibold mt-4 text-gray-600 dark:text-gray-300">Thanks for your order</h2>
                  <div className="mt-6">{renderOrders()}</div>
            //     </div>
            // </div>
    );
  };

  return (
    <div className={`nc-PayPage ${className}`} data-nc-id="PayPage">
      <main className="container mt-11 mb-24 lg:mb-32 ">
        <div className="max-w-4xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  );
};

export default PayPage;
