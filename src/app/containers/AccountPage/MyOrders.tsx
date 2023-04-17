import Heading from "components/Heading/Heading";
import CommonLayout from "./CommonLayout";
import { myOrdersApi } from "services/orderServices";
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import OrderCard from "./Components/OrderCards/OrderCard";

const MyOrders = () => {
  const { id } = useSelector((state:any) => state.auth.user)

  const [orders,setOrders] = useState<any>([])

  const getMyOrders = async() => {
    const response = await myOrdersApi(id)
    if(response.data.response === "success"){
      setOrders(response.data.data)
    }
  }

  useEffect(() => {
    getMyOrders()
  },[])

  return (
    <div>
      <CommonLayout>
      <div className="pt-1 pb-1  rounded-2xl">
          <div className="relative space-y-4 mb-24 mt-4 lg:space-y-4 lg:mb-28">
            <div className="space-y-6 sm:space-y-8">
              {/* <h2 className="text-3xl font-semibold">Payments & payouts</h2> */}
              
              {/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}
              <div className="w-full sm:px-20">
                  <Heading children="My Orders" isCenter={false} />
                  <div className="grid grid-cols-1 gap-3">
                    {orders.length > 0 && orders.map((item:any, key:number) => {
                      return(
                        <OrderCard data={item}/>
                      )
                    })}
                    {/* <ListCard refresh={refresh} setRefresh={setRefresh} setCardList={setCardList}/> */}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default MyOrders;
