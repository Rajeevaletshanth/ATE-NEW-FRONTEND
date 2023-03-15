import { Popover, Transition } from "@headlessui/react";
import React, { FC, Fragment, useEffect } from "react";
import Avatar from "shared/Avatar/Avatar";
import { RiShoppingCartLine } from 'react-icons/ri';
import { BsCartX } from 'react-icons/bs';
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NumberInput from "./NumberInput/NumberInput";
import { useDispatch, useSelector } from 'react-redux';
import { increaseProductQuantity, decreaseProductQuantity, removeFromCart } from "store/cart/itemsSlice";

interface Props {
  className?: string;
}

const NotifyDropdown: FC<Props> = ({ className = "" }) => {
  const { products } = useSelector((state: any) => state.cart.items)
  const dispatch = useDispatch();

  const addQuantity = (id:number, type:string) => {
    dispatch(increaseProductQuantity({id: id, type: type}));
  }

  const minusQuantity = (id:number, type:string) => {
    dispatch(decreaseProductQuantity({id: id, type: type}));
  }

  const removeProduct = (id:number, type:string) => {
    dispatch(removeFromCart({id: id, type: type}));
  }

  // const 
  return (
    <div className={className}>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={` ${
                open ? "" : "text-opacity-90"
              } group p-3 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full inline-flex products-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative`}
            >
              {products.length > 0 && 
              <span className="w-4 h-4 bg-primary-500 text-gray-50 absolute top-1 right-1 rounded-full text-xs flex justify-center items-center">
                {products.length}
              </span>
              }
              <RiShoppingCartLine size={23} />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-xs sm:max-w-sm px-4 mt-3 -right-28 sm:right-0 sm:px-0">
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 ">
                
                  <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-3" >                 
                    <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-4 overflow:p-7 overflow-x-hidden overflow-y-auto" style={{ maxHeight:"500px" }}>
                    {products.length === 0 && <div className="flex justify-center items-center"><BsCartX size={20} className="w-12 h-12 mr-2 text-primary-500"/>Cart is empty!</div>}
                    {products?.map((item: any, index: number) => (
                      <a
                        key={index}
                        style={{cursor:"context-menu"}}
                        className="flex p-2 pr-8 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 relative"
                      >
                        <Avatar sizeClass="w-24 h-24 sm:w-24 sm:h-24" radius="rounded" imgUrl={item.avatar}/>
  
                            <div className="ml-3 sm:ml-4 space-y-1 w-full">
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                {item.name}
                              </p>
                              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                {item.description}
                              </p>
                              <span className="text-xs bg-green-100 text-green-900 rounded px-1 text-center mr-3">€ {item.price}</span>

                              <NumberInput label="Quantity" defaultValue={item.quantity} min={1} id={item.id} type={item.type} addQuantity={addQuantity} minusQuantity={minusQuantity}/>

                              
                            </div>
                              <span style={{cursor:"pointer"}} className="w-5 h-5 bg-gray-50 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900 absolute top-2 right-2 rounded-full text-xs flex justify-center items-center" onClick={() => removeProduct(item.id, item.type)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 8.586L6.707 5.293a1 1 0 1 0-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 1 0 1.414 1.414L10 11.414l3.293 3.293a1 1 0 0 0 1.414-1.414L11.414 10l3.293-3.293a1 1 0 0 0-1.414-1.414L10 8.586z" clipRule="evenodd" />
                                </svg>
                              </span>
                      </a>
                    ))}
                    </div>
                    {products.length > 0 && <ButtonPrimary sizeClass="p-2 rounded-xl" >Checkout</ButtonPrimary>}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default NotifyDropdown;
