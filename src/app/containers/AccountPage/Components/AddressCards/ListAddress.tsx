import React, {FC, useState, useEffect } from 'react'
import { getPaymentCardAPi, removePaymentCardAPi } from 'services/paymentServices'
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import CardCategory from './CardCategories';
import { AiFillHome } from 'react-icons/ai';
import { HiOfficeBuilding } from 'react-icons/hi';
import { IoLocationSharp } from 'react-icons/io5';
import { RiDeleteBin6Line } from 'react-icons/ri';
import swal from 'sweetalert';
import { editUserApi } from "services/authServices";
import { setUser } from 'store/auth/userSlice'

export interface ListCardProps {
    refresh:boolean;
    setRefresh(refresh:boolean): void;
    setAddressList(address:any):void;
}

const ListCard: FC<ListCardProps> = ({ refresh, setRefresh, setAddressList }) => {
  const dispatch = useDispatch();
  const { id, username, email, address, phone, avatar, authority } = useSelector((state:any) => state.auth.user)
  const { token } = useSelector((state:any) => state.auth.session)
  const [newAddress, setAddress] = useState<any>([])

  const getAddresses = async() => {
    if(address){
      const tempAddr = JSON.parse(address)
      setAddress(tempAddr)
    }
  }

  const addAddressApi = async(uid:string) => {
    var tempAddress: any = []
    setAddress((prevAddress:any) => {
      const newAddress = prevAddress.filter((item:any) => item.uid !== uid);
      tempAddress = newAddress;
      return newAddress;
    });

      const data = {
        address : tempAddress,
      }
      const response = await editUserApi(id, data, token)
      if(response.data.response === "success"){
        swal("Success", "Address removed successfully", "success")
        dispatch(setUser({
          id: id,
          avatar: avatar, 
          username: username, 
          authority: authority, 
          address: JSON.stringify(tempAddress),
          email: email,
          phone: phone,
        }))
        setRefresh(!refresh)
      }else{
        swal("Sorry", "Sorry address not updated!", "error");
      }
  }

  useEffect(() => {
    getAddresses()
  },[refresh])
  
  return (
    <>
    {newAddress?.length > 0 ? 
        newAddress.map((item:any, index:number) => {
            return(
              <div className={`flex-1 flex relative  rounded-xl items-center cursor-pointer space-x-4 pl-8 py-4 border  dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800`}>
              <div
                className={`flex-1 flex text-left items-center  space-x-3`}
                onClick={() => document.querySelector("html")?.click()}
              >
                <div className={`text-neutral-300 dark:text-neutral-400 `}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="nc-icon-field"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="red"
                  >
                    { item.type === "Home" ?
                        <AiFillHome size={20} className="text-primary-500"/>:
                        item.type === "Work" ?
                        <HiOfficeBuilding size={20} className="text-primary-500"/>:
                        <IoLocationSharp size={20} className="text-primary-500"/>
                    }
                    
                  </svg>
                </div>
                <div className={`flex-grow text-left `}>
                  <span className="block mt-1 text-sm text-primary-500 leading-none font-medium">
                    {item.type}
                  </span>
                  <span className="block xl:text-lg font-semibold">
                    {item.address} 
                  </span>
                </div>
              </div>
              <button className="ml-auto flex-shrink-0 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 text-white rounded-full p-2">
                <RiDeleteBin6Line size={23} className='mr-4' onClick={() => addAddressApi(item.uid)}/>
              </button>
            </div>
            )
        })
        :
    <span className="p-4 xl:p-5 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl">
        You don't have any addresses added yet.
    </span> 
    }
    <ToastContainer />
    </>
  )
}

export default ListCard