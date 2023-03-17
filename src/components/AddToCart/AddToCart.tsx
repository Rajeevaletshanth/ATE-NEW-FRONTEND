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
import NcImage from 'shared/NcImage/NcImage';
import StartRating from 'components/StartRating/StartRating';
import Badge from 'shared/Badge/Badge';

interface Option {
    label: string;
    value: string;
}

const MySwal = withReactContent(Swal);

export interface AddToCartProps {
    data: AddToCartType;
    editAddon?: boolean;
}

const AddToCart: FC<AddToCartProps> =  ({
    data,
    editAddon = false
}) =>{
    const dispatch = useDispatch();
    const { products } = useSelector((state:any) => state.cart.items)
    const [added, setAdded] = useState<boolean>(false)
    const [selectedAddon, setSelectedAddon] = useState<any>([])
    const [inCart, setInCart] = useState<boolean>(false)

    const checkProduct = () => {
        products?.map((item:any) => {
            if(data.id === item.id && data.type === item.type){
                setSelectedAddon(item.addons)
                setAdded(true)
                setInCart(true)
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

      const renderContent = () => {
        return (
          <div className="flex-grow flex flex-col">          
            <div className="space-y-0">
            <div className="aspect-w-4 aspect-h-3 mb-4">
              <NcImage src={data.avatar}  />
            </div>
            <div className="flex items-center justify-center space-x-2">
                <h2 className="text-lg font-medium capitalize">
                    <span className="line-clamp-1">{data.name}</span>
                </h2>
                {data.vegetarian ? <Badge name="VEG" color="green" /> : <Badge name="NON VEG" color="red" />}
                <br/>
                
            </div>
            <span className="flex items-center justify-center text-sm text-neutral-500 dark:text-neutral-400">
                    ({data.description})
            </span>

            </div>
            
          </div>
        );
      };

    const handleAddons = (addonArray: any) => {
        let selectedArray: any = selectedAddon;
        let tempArray: any = [];
        let uniqueArray: any = [];
        MySwal.fire<Option[]>({
          title: <Heading children="Addons" className='text-neutral-900 text-xl' isCenter={true} />,
          html: (
            <div className='p-5'> 
            <div className="mb-3">
            {renderContent()}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {addonArray.map((item:any, index: number) => {                   
                    let isChecked = false;
                    if(inCart){
                        selectedAddon.map((addon:any) => {
                            if(addon.id === item.id){
                                isChecked = true
                            }
                        })
                    }
                    return (
                        <Checkbox
                          key={index}
                          name={item.name}
                          label={item.name}
                          subLabel={item.price}
                          defaultChecked={isChecked}
                          onChange={(e:any) => {
                            if (e) { 
                                tempArray = [...selectedArray, { id: item.id, label: item.name, price: item.price, value: e }]
                                selectedArray = tempArray
                            } else {
                                selectedArray = selectedArray.filter((option: any) => option.id !== item.id);
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
          confirmButtonText: `${editAddon? "Save" : "Add To Cart"}`,
          confirmButtonColor: 'rgba(218, 0, 0, 1)',
          preConfirm: () => {
            return selectedArray;
          }
        }).then((result: SweetAlertResult<Option[]>) => {
          if (result.isConfirmed) {
            // uniqueArray = Array.from(new Set(selectedArray.map((item:any) => item.id))).map((id) => {
            //     return selectedArray.find((item:any) => item.id === id)
            // });
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
              title: "Success",
              icon: 'success',
              text: `${editAddon? "Addon saved successfully" : data.name +" added to cart."}`,
              showCloseButton: true,
              confirmButtonText: 'Close',
              confirmButtonColor: 'rgba(218, 0, 0, 1)',
            })
          }
        });
    };

    const handleNormalAddToCart = () => {
        // MySwal.fire<Option[]>({
        //     title: <Heading children="Add To Cart" className='text-neutral-900 text-xl' isCenter={true} />,
        //     html: (
        //       <div className='p-5'> 
        //         {renderContent()}
        //       </div>
        //     ),
        //     showCancelButton: true,
        //     confirmButtonText: `${editAddon? "Save" : "Add To Cart"}`,
        //     confirmButtonColor: 'rgba(218, 0, 0, 1)',
        //   })
        dispatch(addToCart(data))
        setAdded(true)
        MySwal.fire({
            title: "Success",
            icon: 'success',
            text: `${data.name} added to cart.`,
            showCloseButton: true,
            confirmButtonText: 'Close',
            confirmButtonColor: 'rgba(218, 0, 0, 1)',
        })
    }


    

    const addProduct = () => {
        if(data.available_addons)
            getAddons();
        else
            handleNormalAddToCart();
    };

    useEffect(() => {
        setInCart(false)
        setAdded(false)
        checkProduct();
    },[products])

    

  return (
    <>
    {!editAddon?
        <Button disabled={added? true: false} className="bg-primary-400 disabled:bg-neutral-500 text-gray-100 hover:bg-primary-500" fontSize="text-xs sm:text-sm font-medium" sizeClass="px-8 py-2 sm:px-8" onClick={addProduct}>{added? "In Cart" : "Add to Cart"}</Button> 
        :
        <Button className="bg-neutral-400 disabled:bg-neutral-500 text-gray-100 hover:bg-neutral-500 rounded-sm" fontSize="text-xs sm:text-xs font-small" sizeClass="px-2 py-0 sm:px-2" onClick={getAddons}>Edit Addons</Button> 
    }
    </>
    )
}

export default AddToCart