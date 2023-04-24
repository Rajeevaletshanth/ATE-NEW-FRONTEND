import Label from 'components/Label/Label';
import React, {FC, useState, useEffect} from 'react'
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import Input from 'shared/Input/Input';
import Stepper from './Stepper';
import { useParams } from "react-router-dom";
import { HiSearch } from 'react-icons/hi';
import { trackOrderApi } from 'services/orderServices';
import { BsCartX } from 'react-icons/bs';
import Lottie from "lottie-react";
import trackMyOrder from "./lottiAnimations/71216-delivery-guy.json";
import greenTick from "./lottiAnimations/green-tick.json";
import TwoEndPoint from '../GoogleMap/TwoEndPoint';

import config from '../../../config/config.json'

const socket = require("socket.io-client")(config.SOCKET_URL, {
	rejectUnauthorized: true 
});

export interface OrderTrackerProps {
    className?: string;
}

const OrderTracker:FC <OrderTrackerProps> = ({className}) => {

    const searchParams = new URLSearchParams(window.location.search);
    const order_number = searchParams.get("id");
  
    const [trackingNo, setTrackingNo] = useState<string>(order_number?order_number:"");
    const [activeStep, setActiveStep] = useState<number>(0)
    const [orderDetails, setOrderDetails] = useState<any>({})
    const [search,setSearch] = useState<boolean>(false)
    const [error,setError] = useState<string>("")
    const [selectedAnimation, setSelectedAnimation] = useState<any>({animation:greenTick,desc:"Your order is dispatched"})

    const [showAnimation, setShowAnimation] = useState<boolean>(false)


    const getActiveStep = (status:string) => {
      if(status === "pending"){
        setActiveStep(1)
      }else if(status === "accepted"){
        setActiveStep(2)
      }else if(status === "ongoing"){
        setActiveStep(3)
      }else if(status === "delivered"){
        setActiveStep(4)
      }
    }

    const trackOrder = async(order_number:string) => {
        
        const response = await trackOrderApi(order_number);
        if(response.data.response === "success"){
            setError("")
            getActiveStep(response.data.order[0].status)
            setOrderDetails(response.data.order[0])
        }else{
            setError(response.data.message)
        }
    }

    useEffect(() => {
        if(search || order_number){
            trackOrder(trackingNo)
            setSearch(false)
            setShowAnimation(false)
            joinRoom()
        }
    },[search])

    const joinRoom = () => {
		socket.emit("join_room", trackingNo); 
	};

    useEffect(() => {
        if(!search && order_number == null){
            setShowAnimation(true)
        }
    },[])

    useEffect(() => {
		const handleUpdateStatus = (data:any) => {
		  console.log('Received new status:', data);
		  if (data.room === trackingNo) {
            setSearch(true)
		  }
		};
	  
		socket.on('get_order_status', handleUpdateStatus);
	  
		return () => {
		  socket.off('get_order_status', handleUpdateStatus);
		};
	}, [search, socket]);

    const renderWelcomeAnimation = () => {
        return(
            <div className='relative mt-6 mb-6'>
                <Lottie className='w-2/4 h-2/4' animationData={trackMyOrder} />
                <div className='absolute top-1/2 left-2/4 md:left-2/4 transform -translate-x-1/10 -translate-y-3/4 text-center'>
                    <p className='text-sm md:text-4xl font-semibold'>Track <span className='bg-primary-500 text-white px-2 py-1 rounded'>My</span> Order</p>
                </div>
            </div>
        )
    }

    const renderAnimation = () => {
        const timeString = orderDetails.order_time;
        const date = new Date();
        date.setHours(timeString.split(':')[0]);
        date.setMinutes(timeString.split(':')[1]);
        date.setSeconds(timeString.split(':')[2]);
        const formattedTime = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(date)
      return(
        <>
        {/* <div className='flex md:hidden justify-center pt-3'>
            <Lottie className='w-1/3 h-1/3' animationData={selectedAnimation.animation} />
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            <div className="rounded-md p-1 text-sm">
                <p className='text-center text-lg md:text-2xl lg:text-2xl font-semibold pt-1 md:pt-6 '>Order Details</p>
                <hr className={`flex justify-center mt-2 pb-4`}/>
                <div className="flex flex-row px-4 mt-4">
                    <p className='w-5/12 text-gray-900 dark:text-white font-semibold'>Order No : </p>
                    <p className='w-7/12 text-gray-600 dark:text-gray-300'>{orderDetails.order_number}</p>
                </div>
                <div className="flex flex-row px-4 mt-4">
                    <p className='w-5/12 text-gray-900 dark:text-white font-semibold '>Restaurant : </p>
                    <p className='w-7/12 text-gray-600 dark:text-gray-300'>{orderDetails.restaurant_name}</p>
                </div>
                <div className="flex flex-row px-4 mt-4">
                    <p className='w-5/12 text-gray-900 dark:text-white font-semibold'>Date : </p>
                    <p className='w-7/12 text-gray-600 dark:text-gray-300'>{orderDetails.order_date}</p>
                </div>
                <div className="flex flex-row px-4 mt-4">
                    <p className='w-5/12 text-gray-900 dark:text-white font-semibold '>Time : </p>
                    <p className='w-7/12 text-gray-600 dark:text-gray-300'>{formattedTime}</p>
                </div>
                <div className="flex flex-row px-4 mt-4">
                    <p className='w-5/12 text-gray-900 dark:text-white font-semibold '>Order Type : </p>
                    <p className='w-7/12 text-gray-600 dark:text-gray-300'>{orderDetails.order_type}</p>
                </div>
                <div className="flex flex-row px-4 mt-4">
                    <p className='w-5/12 text-gray-900 dark:text-white font-semibold '>Address : </p>
                    <p className='w-7/12 text-gray-600 dark:text-gray-300'>{orderDetails.delivery_address}</p>
                </div>
                <div className="flex flex-row px-4 mt-4">
                    <p className='w-5/12 text-gray-900 dark:text-white font-semibold '>Status : </p>
                    <p className='w-7/12 text-gray-600 dark:text-gray-300'>{orderDetails.status}</p>
                </div>
                <div className="flex flex-row px-4 mt-4">
                    <p className='w-5/12 text-gray-900 dark:text-white font-semibold '>Total : </p>
                    <p className='w-7/12 text-gray-600 dark:text-gray-300'>€ {Math.round((orderDetails.total_amount) * 100) / 100}</p>
                </div>
            </div>
            <div className="bg-white rounded-2xl md:mt-6 p-0  max-h-xs">
                <TwoEndPoint  defaultOptions={{
                    destination: '149 Thalvupadu - Mannar Rd Mannar Sri Lanka',
                    origin: 'Cargills Food City Express - Mannar',
                    travelMode: "DRIVING",
                }}/>
            </div>
            
        </div>
        </>
      )
    }

    const renderContent = () => {
        return (
            <div className="w-full flex flex-col rounded-2xl  shadow-xl">
                <h1 className="text-white text-xs md:text-lg md:font-medium text-center py-4 px-6 bg-primary-500 rounded-t-2xl">{trackingNo ? `TRACKING ORDER NUMBER : ${trackingNo}` : "TRACK MY ORDER"}</h1>
                <div > 
                    {error && 
                    <div className="flex flex-col justify-center items-center text-2xl font-semibold py-8"><BsCartX size={100} className="text-primary-500 mb-3"/>Order not found!</div>
                    }
                    { Object.keys(orderDetails).length > 0 && error === "" &&
                    <><Stepper currentStep={activeStep} complete={false}/> 
                    {renderAnimation()}</>}

                    {showAnimation && <>{renderWelcomeAnimation()}</>}
                </div>
            </div>
        )
    }
  return (
      <div className="container mt-11 mb-24 lg:mb-32 ">
        <div className='flex flex-grow text-center md:text-right mb-4'>
            <div className=' md:w-7/12 mt-2'>
            </div>
            <div className='w-full md:w-5/12 ml-3'>
                <div className="relative ">
                    <Input rounded="rounded-4xl" placeholder='Tracking Number' onChange={(e) => setTrackingNo(e.target.value)}/>
                    <button disabled={trackingNo.length>0? false:true} className="absolute top-1 right-1 h-9 px-5 rounded-full bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-800 hover:bg-gray-300" onClick={() => setSearch(true)}>
                        <HiSearch size={22}/>
                    </button>
                </div>
            </div>
        </div>

        <div className="w-full mx-auto">    
            {renderContent()}
        </div>
      </div>
  )
}

export default OrderTracker