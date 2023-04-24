import React, { FC, useState, useEffect } from "react";
import { getRestaurantApi } from "services/apiServices";
import Avatar from "shared/Avatar/Avatar";
import Button from "shared/Button/Button";

interface OrderCardProps {
  data: any;
}

const OrderCard: FC<OrderCardProps> = ({ data }) => {
  const [restaurant, setRestaurant] = useState<any>({});
  const [statusColor, setStatusColor] = useState<any>("bg-orange-500");
  const [showData, setShowData] = useState<any>(false)

  const getRestaurantData = async () => {
    const response = await getRestaurantApi(data.restaurant_id);
    if (response.data.response === "success") {
      setRestaurant(response.data.restaurant[0]);
    }
  };

  useEffect(() => {
    getRestaurantData();
    if(data.status === "cancelled"){
        setStatusColor("bg-red-500")
    }else if(data.status === "accepted"){
        setStatusColor("bg-green-700")
    }else if(data.status === "ongoing"){
        setStatusColor("bg-yellow-500")
    }else if(data.status === "delivered"){
        setStatusColor("bg-green-500")
    }
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 md:p-6 rounded-3xl">
      <div className="flex flex-row space-x-4 md:space-x-8">
        <Avatar
          sizeClass="w-20 h-20 md:w-32 md:h-32"
          radius="rounded-2xl"
          imgUrl={restaurant.avatar}
        />
        <div className="flex flex-col ml-3 sm:ml-4 space-y-1 w-full">
          <p className="text-sm md:text-lg font-semibold text-gray-900 dark:text-gray-200 mb-1 text-left">
            {restaurant.name}
          </p>
          <p className="text-xs text-gray-700 dark:text-gray-400 text-left">
            Status : <span className={`${statusColor} text-white px-1 rounded-lg`}>{data.status.charAt(0).toUpperCase() + data.status.slice(1)}</span>
          </p>
          <p className="text-xs  text-gray-700 dark:text-gray-400 text-left">
            Delivery : {data.delivery_address}
          </p>
          <p className="text-xs  text-gray-700 dark:text-gray-400 text-left">
            Date : {data.order_date}
          </p>
          <p className="text-xs text-gray-700 dark:text-gray-400 text-left hidden md:flex">
            Order No : {data.order_number}
          </p>
          <div className="text-sm font-semibold text-primary-500 cursor-pointer hover:underline" onClick={()=>setShowData(!showData)}>{showData? "Hide Details": "View Details"}</div>
          {showData && <div className="flex flex-col">
            {data.items.map((prod:any, key:number) => {
                return(
                    <>
                    <div className="flex flex-col md:flex-row md:space-x-4 ml-2 my-1">
                        <div className="hidden md:flex">
                            <Avatar
                                sizeClass="w-20 h-20"
                                radius="rounded-2xl"
                                imgUrl={prod.product.avatar}
                            />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-gray-200 mb-1 text-left">
                                {prod.product.name}
                            </p>
                            {prod.addons && prod.addons.length > 0 && <>
                              <div className="flex flex-row flex-wrap text-xs">
                                Addons : 
                                {prod.addons.map((addon:any) => {
                                  return(
                                    <p className="text-xs bg-primary-400 rounded px-1 text-white ml-1 mr-1 mb-1"> {addon.addon_name}</p>
                                  )
                                })} 
                              </div>
                              </>
                            }
                            <p className="text-xs font-medium text-gray-900 dark:text-gray-200 mb-1 text-left">
                              Quantity : {prod.quantity}
                            </p>
                        </div> 
                    </div>
                    <div className="border-b border-dashed border-neutral-200 dark:border-neutral-700 mt-4 mb-4" style={{borderWidth: '0 0 2px 2px', borderStyle: 'dashed', }}></div>
                    </>
                )
            })}
            <div className="flex flex-col space-y-4 mx-6">
                      
                <div className="flex justify-between text-neutral-6000 dark:text-neutral-300" >
                        <span>Delivery Charge</span>
                        <span>{data.delivery_fee}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                          <span className="text-xl">Total</span>
                          <span className="text-xl font-bold text-primary-500">€ {Math.round((data.total_amount) * 100) / 100}</span>
                    </div>
                </div>
          </div>}
          
      </div>
    </div>
    </div>
  );
};

export default OrderCard;
