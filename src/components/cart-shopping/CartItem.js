import React from "react"
import {useDispatch} from "react-redux"
import {decrementProductInCart, incrementProductInCart, removeItemFromCart} from "../../redux/products/products.slice"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlus, faMinus, faTrashCan} from "@fortawesome/free-solid-svg-icons"

export function CartItem({item}) {
    const dispatch = useDispatch()

    const incrementProduct = id => dispatch(incrementProductInCart(id))
    const decrementProduct = id => dispatch(decrementProductInCart(id))
    const removeProduct = id => dispatch(removeItemFromCart(id))

    const sum = item.price * item.quantity

    return (
        <div className='py-4 px-2 sm:px-4 border-b'>
            <div className='flex justify-between'>
                <div className='flex'>
                    <img className='w-[60px]' src={item.image} alt={item.title}/>
                    <span className='pl-3 pt-2 text-sm sm:text-lg'>{item.title}</span>
                </div>
                <button className='h-fit pt-2 cursor-pointer' onClick={() => removeProduct(item.id)}>
                    <FontAwesomeIcon icon={faTrashCan} className='text-xl text-[#3e77aa] hover:text-red-500 transition'/>
                </button>
            </div>
            <div className='flex justify-between items-center relative mt-4 sm:mt-2 sm:justify-end'>
                <div className='relative bottom-0 right-0 text-lg sm:absolute sm:right-[300px]'>${item.price}</div>
                <div className='relative right-0 bottom-0 sm:right-[140px] sm:absolute'>
                    <button
                        className={item.quantity > 1 ? 'text-[#3e77aa]' : 'text-black'}
                        disabled={item.quantity <= 1}
                        onClick={() => decrementProduct(item.id)}
                    >
                        <FontAwesomeIcon  icon={faMinus}/>
                    </button>
                    <span className='mx-2 border px-2 py-1 rounded-md sm:px-4 sm:py-2'>{item.quantity}</span>
                    <button
                        className='text-[#3e77aa]'
                        onClick={() => incrementProduct(item.id)}
                    >
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                </div>
                <span className='text-lg'>${sum}</span>
            </div>
        </div>
    )
}
