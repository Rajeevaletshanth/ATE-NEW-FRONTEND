import Heading from "components/Heading/Heading";
import React, { FC, useState } from "react";
import { addPaymentCardAPi } from 'services/paymentServices'
import { useSelector } from 'react-redux';
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const createUID = (len: number) => {
    const buf = []
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charlen = chars.length
    const length =  len || 10

    buf[0] = 'cc-';
            
    for (let i = 1; i < length; i++) {
        buf[i] = chars.charAt(Math.floor(Math.random() * charlen))
    }

    const timestamp = '-' + Date.now().toString();
    buf.push(timestamp);

    return buf.join('')
}

export interface PaymentCardProps {
  className?: string;
  refresh:boolean;
  cards: any;
  buttonText?: string;
  setRefresh(refresh:boolean): void;
}


const PaymentCardModal:FC <PaymentCardProps> = ({className, refresh, cards, buttonText = "Add payment method", setRefresh}) => {
    const [showModal, setShowModal] = React.useState(false);
    const {id, email, username} = useSelector((state:any) => state.auth.user)

    const [name, setName] = useState<string>("");
    const [cardNumber, setCardNumber] = useState<string>()
    const [expiryDate, setExpiryDate] = useState<string>("");
    const [cvv, setCvv] = useState<string>("")

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const getCurrentMonth = () => {
      const today = new Date();
      return today.toISOString().slice(0, 7);
    }

    const [minMonth, setMinMonth] = useState(getCurrentMonth());

    const checkDuplicate = (card_no:any, exp_month:string, exp_year:string) => {
      let test = false
      if(cards?.length > 0){
        cards.map((item:any) => {
          if(item.last_four_digits == card_no.substr(card_no.length - 4) && item.exp_month === exp_month && item.exp_year === exp_year){
            test = true
          }
        })
      }
      return test
    }

    const addCardApi = async () => {
        setLoading(true)
        setError("")
        const [year, month] = expiryDate.split("-");
        const ifExists = checkDuplicate(cardNumber,month,year.slice(2))
        
        if(ifExists){
          setLoading(false)
          setError('This card is already exists!')
        }else{
          const data = {
            customer_name: username,
            name: name, 
            email: email,
            type: "card",
            card_no: cardNumber,
            exp_month: month,
            exp_year: year.slice(2),
            cvc: cvv,
            cardId: createUID(8),
            primary_card: "false"
          }
          const response = await addPaymentCardAPi(id,data)
          if(response.data.response === "success"){
            setLoading(false)
            toast.success("Card added successfully.")
            setRefresh(!refresh)
            setShowModal(false)
          }else{
            setLoading(false)
            setError(response.data.message)
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
                    <Heading children="Payment Method" className=' text-xl' isCenter={true} />
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
                  <div className='p-2 text-left'>
                    <label className='ml-3 font-semibold  text-sm'>Cardholder's Name</label>
                    <Input onChange={(e) => setName(e.target.value)} type="text" placeholder="Eg. John Doe"/>
                </div>
                <div className='p-2 text-left'>
                    <label  className='ml-3 font-semibold text-sm'>Credit Card Number</label>
                    <Input type="text"  onChange={(e) => setCardNumber(e.target.value)} minLength={16} maxLength={20} placeholder="•••• •••• •••• 4242"/>
                </div>
                <div className="flex flex-row">
                    <div className='p-2 text-left'>
                        <label  className='ml-3 font-semibold text-sm'>Expiry Date</label>
                        <Input onChange={(e) => setExpiryDate(e.target.value)} type="month" min={minMonth} placeholder="Month/Year"/>
                    </div>
                    <div className='p-2 text-left'>
                        <label  className='ml-3 font-semibold text-sm'>CVV</label>
                        <Input onChange={(e) => setCvv(e.target.value)} minLength={3} maxLength={4} placeholder="•••"/>
                     </div>
                </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-center p-6 space-x-2  rounded-b">
                    <ButtonSecondary className="rounded-2xl" onClick={() => setShowModal(false)}>Close</ButtonSecondary>
                    <ButtonPrimary loading={loading} className="rounded-2xl" onClick={addCardApi}>Save Card</ButtonPrimary>
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

export default PaymentCardModal;