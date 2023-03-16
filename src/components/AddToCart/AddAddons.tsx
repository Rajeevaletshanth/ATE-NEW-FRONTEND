import React, {FC, useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addToCart, editProductAddonsById } from "store/cart/itemsSlice";
import { AddToCartType } from 'data/types';
import Button from 'shared/Button/Button';

export interface AddAddonsProps {
    data: AddToCartType;
}

const AddAddons: FC<AddAddonsProps> =  ({
    data
}) =>{
    const dispatch = useDispatch();

    const addProduct = () => {
        dispatch(addToCart(data));
    };

  return (
    <Button className="bg-primary-400 text-gray-100 hover:bg-primary-500" fontSize="text-xs sm:text-sm font-medium" sizeClass="px-8 py-2 sm:px-8" onClick={addProduct}>Add to Cart</Button> 
  )
}

export default AddAddons