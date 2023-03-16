import React, {FC, useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addToCart, editProductAddonsById } from "store/cart/itemsSlice";
import { AddToCartType } from 'data/types';
import Button from 'shared/Button/Button';
import Swal, { SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../../app/css/main.css'
import Checkbox from './Checkbox';
import Heading from 'components/Heading/Heading';
import { getAddonsByIds } from 'services/apiServices'

interface Option {
    label: string;
    value: string;
}

const MySwal = withReactContent(Swal);

export interface AddToCartProps {
    data: AddToCartType;
}

const AddToCart: FC<AddToCartProps> =  ({
    data
}) =>{
    const dispatch = useDispatch();
    const { products } = useSelector((state:any) => state.cart.items)
    const [added, setAdded] = useState<boolean>(false)

    const checkProduct = () => {
        products?.map((item:any) => {
            if(data.id == item.id && data.type == item.type){
                setAdded(true)
            }
        })
    }

    const getAddons = async () => {
        const ids: any = data.available_addons;
        const response = await getAddonsByIds({ids : ids.replace(/[\[\]']+/g,'').split(',').map(Number)})
        if(response.data.response === "success"){
            handleAddons(response.data.addons)
        }
    }

    const handleAddons = (addonArray: any) => {
        let selectedArray: any = [];
        let tempArray: any = [];
        MySwal.fire<Option[]>({
          title: <Heading children="Addons" className='text-neutral-900 text-xl' isCenter={true} />,
          html: (
            <div className='p-5'> 
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {addonArray.map((item:any, index: number) => {
                    return (
                        <Checkbox
                          key={index}
                          name={item.name}
                          label={item.name}
                          subLabel={item.price}
                          onChange={(e:any) => {
                            if (e) { 
                                tempArray = [...selectedArray, { id: item.id, label: item.name, price: item.price, value: e }]
                                selectedArray = tempArray
                            } else {
                                selectedArray = selectedArray.filter((option: any) => option.value !== e);
                            }
                          }}
                        />
                    )
                })}
              
            </div>
            <p className='mt-4 text-neutral-400' style={{fontSize:"13px"}}>If you do not require any addons, simply leave the checkboxes blank and proceed to add to cart.</p>
            </div>
          ),
          showCancelButton: true,
          confirmButtonText: 'Add To Cart',
          confirmButtonColor: 'rgba(218, 0, 0, 1)',
          preConfirm: () => {
            return selectedArray;
          }
        }).then((result: SweetAlertResult<Option[]>) => {
          if (result.isConfirmed) {
            setAdded(true)
            dispatch(addToCart({
                id: data.id,
                type: data.type,
                name: data.name,
                restaurant_id: data.restaurant_id,
                addons: selectedArray,
                available_addons: data.available_addons,
                vegetarian: data.vegetarian,
                avatar: data.avatar,
                price: data.price,
                description: data.description
            }));
            MySwal.fire({
              icon: 'success',
              title: 'Product added to cart.',
              showCloseButton: true,
              confirmButtonText: 'Close',
              confirmButtonColor: 'rgba(218, 0, 0, 1)',
            })
          }
        });
    };

    const handleNormalAddToCart = () => {
        dispatch(addToCart(data))
        MySwal.fire({
            icon: 'success',
            title: 'Product added to cart.',
            showCloseButton: true,
            confirmButtonText: 'Close',
            confirmButtonColor: 'rgba(218, 0, 0, 1)',
        }).then((res) => {
            setAdded(true)
        })
    }


    

    const addProduct = () => {
        if(data.available_addons)
            getAddons();
        else
            handleNormalAddToCart();
    };

    useEffect(() => {
        setAdded(false)
        checkProduct();
    },[products])

  return (
    <Button disabled={added? true: false} className="bg-primary-400 disabled:bg-neutral-500 text-gray-100 hover:bg-primary-500" fontSize="text-xs sm:text-sm font-medium" sizeClass="px-8 py-2 sm:px-8" onClick={addProduct}>{added? "In Cart" : "Add to Cart"}</Button> 
  )
}

export default AddToCart