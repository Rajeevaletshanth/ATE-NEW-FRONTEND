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
          <p className="text-xs text-gray-700 dark:text-gray-400 text-left hidden md:flex">
            Order No : {data.order_number}
          </p>
          <div className="text-sm font-semibold text-primary-500 cursor-pointer hover:underline" onClick={()=>setShowData(!showData)}>{showData? "Hide Details": "View Details"}</div>
          <div className="flex flex-col rounded-2xl space-x-2 md:space-x-4 p-2 md:p-3 border border-gray-200 dark:border-gray-700">
            {data.items.map((prod:any, key:number) => {
                return(
                    <div className="flex flex-row space-x-2 md:space-x-4">
                        <Avatar
                            sizeClass="w-20 h-20"
                            radius="rounded-2xl"
                            imgUrl={prod.product.avatar}
                        />
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
                        </div>
                        
                    </div>
                )
            })}
{/* {item.addons && item.addons.length > 0 && (
            <>
              <div className="flex flex-row flex-wrap text-xs">
                Addons :
                {item.addons.map((addon: any) => {
                  itemPrice += addon.price * item.quantity;
                  return (
                    <p className="text-xs bg-primary-400 rounded px-1 text-white ml-1 mr-1 mb-1">
                      {" "}
                      {addon.label}
                    </p>
                  );
                })}
              </div>
            </>
          )}
          <p className="text-xs font-medium text-gray-900 dark:text-gray-200 mb-1 text-left">
            Quantity : {item.quantity}
          </p>
        </div>
        <div className="text-lg ml-4">
          €<span className="">{itemPrice}</span>
        </div> */}
          </div>
          
      </div>
    </div>
    </div>
  );
};

export default OrderCard;
