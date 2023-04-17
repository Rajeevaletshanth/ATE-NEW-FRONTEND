import React, {FC, useState, useEffect } from 'react'
import { getPaymentCardAPi, removePaymentCardAPi } from 'services/paymentServices'
import { useSelector } from 'react-redux';
import CardCategory from './CardCategories';
import { ToastContainer, toast } from 'react-toastify';

export interface ListCardProps {
    refresh:boolean;
    setRefresh(refresh:boolean): void;
    setCardList(cards:any):void;
}

const ListCard: FC<ListCardProps> = ({ refresh, setRefresh, setCardList }) => {

  const {id, email, username} = useSelector((state:any) => state.auth.user)
  const [cards, setCards] = useState<any>([])
  const [selectedCard, setSelectedCard] = useState<any>([])

  const getCards = async() => {
    const response = await getPaymentCardAPi(id)
    if(response.data.response === "success"){
        setCards(response.data.cards)
        setCardList(response.data.cards)
    }
  }

  const removeCard = async(card_id:string) => {
    const response = await removePaymentCardAPi(id,card_id)
    if(response.data.response === "success"){
      setRefresh(!refresh)
      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    getCards()
  },[refresh])
  
  return (
    // <div>ListCard</div>
    <>
    {cards?.length > 0 ? 
        cards.map((item:any, index:number) => {
            return(
                <CardCategory
                    className="p-4 xl:p-5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl"
                    key={index}
                    taxonomy={item}
                    size="normal"
                    removeCard={removeCard}
                />
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

export default ListCard