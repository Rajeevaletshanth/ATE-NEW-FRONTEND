import React, {FC, useState, useEffect } from 'react'
import { getPaymentCardAPi, removePaymentCardAPi } from 'services/paymentServices'
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import SelectableCardCategories from './SelectableCardCategories';

export interface SelectableCardProps {
    refresh:boolean;
    selectedCard: string;
    setRefresh(refresh:boolean): void;
    setCardList(cards:any):void;
    setSelectedCard(payment_method_id:string): void;
}

const SelectableCard: FC<SelectableCardProps> = ({ refresh, setRefresh, setCardList, selectedCard, setSelectedCard }) => {

  const {id, email, username} = useSelector((state:any) => state.auth.user)
  const [cards, setCards] = useState<any>([])

  const getCards = async() => {
    const response = await getPaymentCardAPi(id)
    if(response.data.response === "success"){
        setCards(response.data.cards)
        setCardList(response.data.cards)
    }
  }

  useEffect(() => {
    getCards()
  },[refresh])
  
  return (
    // <div>SelectableCard</div>
    <>
    {cards?.length > 0 ? 
        cards.map((item:any, index:number) => {
            return(
                <SelectableCardCategories
                    className="p-4 xl:p-5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl"
                    key={index}
                    taxonomy={item}
                    size="normal"
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                />
                // <div className='bg-'>
                //     <span>•••• •••• •••• {item.last_four_digits}</span>

                //     {item.card_holder_name}
                // </div>
            )
        })
        :
    <span className="p-4 xl:p-5 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl">
        You don't have any payment methods added yet.
    </span> 
    }
    <ToastContainer />
    </>
  )
}

export default SelectableCard