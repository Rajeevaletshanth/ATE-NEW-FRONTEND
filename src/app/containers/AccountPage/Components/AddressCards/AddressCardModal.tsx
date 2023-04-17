import Heading from "components/Heading/Heading";
import React, { FC, useState } from "react";
import { addPaymentCardAPi } from 'services/paymentServices'
import { useSelector, useDispatch } from 'react-redux';
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from "shared/Select/Select";
import swal from 'sweetalert';
import { editUserApi } from "services/authServices";
import { setUser } from 'store/auth/userSlice'

const createUID = (len: number) => {
  const buf = []
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charlen = chars.length
  const length =  len || 5

  buf[0] = 'addr-';
          
  for (let i = 1; i < length; i++) {
      buf[i] = chars.charAt(Math.floor(Math.random() * charlen))
  }

  const timestamp = '-' + Date.now().toString();
  buf.push(timestamp);

  return buf.join('')
}

export interface AddressCardModalProps {
  className?: string;
  refresh:boolean;
  address: any;
  buttonText?: string;
  setRefresh(refresh:boolean): void;
}


const AddressCardModal:FC <AddressCardModalProps> = ({className, refresh, buttonText = "Add New Address", setRefresh}) => {

   const dispatch = useDispatch();
    const { id, username, email, address, phone, avatar, authority } = useSelector((state:any) => state.auth.user)
    const { token } = useSelector((state:any) => state.auth.session)
    const [showModal, setShowModal] = React.useState(false);

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const [type,setType] = useState<string>("Home")
    const [newAddress,setAddress] = useState<string>("")

    const addAddressApi = async() => {
      setLoading(true)
      setError("")
      if(newAddress.length < 3){
        setError("Address should be more than 3 characters!")
        setLoading(false)
      }else{
        var tempAddress: any = []
        if(address){
          const prevAddresses = JSON.parse(address)
          tempAddress = [...prevAddresses, {uid: createUID(5), type: type, address: newAddress}]
        }else{
          tempAddress = [{uid: createUID(5), type: type, address: newAddress}]
        }
        const data = {
          address : tempAddress,
        }
        const response = await editUserApi(id, data, token)
        if(response.data.response === "success"){
          swal("Success", "Address updated successfully", "success")
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
          setLoading(false)
          setShowModal(false)
        }else{
          swal("Sorry", "Sorry address not updated!", "error");
          setLoading(false)
        }
      }
    }

    return (
        <>
        <ToastContainer />
        <ButtonPrimary className={`${className}`} onClick={() => setShowModal(true)}>{buttonText}</ButtonPrimary>
        {showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-2xl shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-800 outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5  rounded-t">
                    <Heading children="Add New Address" className='text-xl ml-6 mr-6' isCenter={true} />
                    <button
                      className="p-1 ml-auto border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-gray-800 dark:text-gray-100 opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    {error && <div className="bg-primary-100 text-primary-500 rounded-xl p-3 mx-2">{error}</div>}

                  <div className="flex flex-row items-center space-x-4 md:space-x-12 p-2 text-left">
                  <label className='ml-3 font-semibold  text-sm'>Type</label>
                    <Select value={type} onChange={(e) => setType(e.target.value)}>
                      <option value={"Home"}>Home</option>
                      <option value={"Work"}>Work</option>
                      <option value={"Other"}>Other</option>
                    </Select>
                  </div>
                  <div className='p-2 text-left space-y-1'>
                    <label  className='ml-3 font-semibold text-sm'>Address</label>
                    <Input type="text" placeholder="Address" value={newAddress} onChange={(e) => setAddress(e.target.value)} />
                  </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-center p-6 space-x-2  rounded-b">
                    <ButtonSecondary className="rounded-2xl" onClick={() => setShowModal(false)}>Close</ButtonSecondary>
                    <ButtonPrimary loading={loading} className="rounded-2xl" onClick={addAddressApi}>Save Address</ButtonPrimary>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    )
}

export default AddressCardModal;