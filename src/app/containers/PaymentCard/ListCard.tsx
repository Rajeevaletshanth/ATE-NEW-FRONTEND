import React, {FC, useState, useEffect } from 'react'
import { getPaymentCardAPi } from 'services/paymentServices'
import { useSelector } from 'react-redux';
import CardCategory from './CardCategories';

export interface ListCardProps {
    refresh:boolean;
    setRefresh(refresh:boolean): void;
}

const ListCard: FC<ListCardProps> = ({ refresh, setRefresh }) => {

  const {id, email, username} = useSelector((state:any) => state.auth.user)
  const [cards, setCards] = useState<any>([])

  const getCards = async() => {
    const response = await getPaymentCardAPi(id)
    if(response.data.response === "success"){
        console.log(response.data.cards)
        setCards(response.data.cards)
    }
  }

  useEffect(() => {
    getCards()
  },[refresh])
  
  return (
    // <div>ListCard</div>
    <>{cards?.length > 0 ? 
        cards.map((item:any, index:number) => {
            return(
                <CardCategory
                    className="p-4 xl:p-5 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    key={index}
                    taxonomy={item}
                    size="normal"
                />
                // <div className='bg-'>
                //     <span>•••• •••• •••• {item.last_four_digits}</span>

                //     {item.card_holder_name}
                // </div>
            )
        })
        :
    <span className="text-neutral-700 dark:text-neutral-300 block">
        You don't have any payment methods added yet.
    </span> 
    }
    </>
  )
}

export default ListCard