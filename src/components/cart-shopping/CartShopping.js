import React from "react"
import {useDispatch} from "react-redux"
import {clearCart, toggleBtnCart} from "../../redux/products/products.slice"
import {CartEmpty} from "./CartEmpty"
import {CartItem} from "./CartItem"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faX} from '@fortawesome/free-solid-svg-icons'

export function CartShopping({cart}) {
    const dispatch = useDispatch()

    const totalPrice = () => {
        let price = 0
        cart.forEach(item => price += item.price * item.quantity)
        return price.toFixed(2)
    }

    const toggleClose = () => {
        dispatch(toggleBtnCart(false))
    }

    const closeCartOnBg = (e) => {
        if (e.target.getAttribute('dataset')) {
            toggleClose()
        }
    }

    const clearCartBtn = cart => {
        dispatch(clearCart(cart))
    }

    return (
        <>
            <div onClick={closeCartOnBg} dataset='box-cart' style={{backgroundColor: 'rgba(107, 114, 128, 0.5)'}} className='fixed left-0 top-0 right-0 bottom-0 z-[1] flex flex-col items-center justify-center shadow-2xl'>
                <div className='bg-white mx-4 rounded-lg w-[95%] sm:w-[500px] sm:mx-0 md:w-[700px] lg:w-[900px]'>
                    <div className='flex justify-between items-center p-3 border-b'>
                        <span className='text-lg sm:text-xl'>Shopping cart</span>
                        <button onClick={toggleClose}>
                            <FontAwesomeIcon className='text-gray-500 hover:text-gray-600 transition' icon={faX} />
                        </button>
                    </div>
                    {
                        cart.length === 0
                            ?   <div className='py-4 px-6'>
                                <CartEmpty/>
                            </div>
                            :   <>
                                <div className='flex justify-end'>
                                    <button className='text-[#3e77aa] hover:text-red-500 transition p-2 sm:p-3' onClick={() => clearCartBtn(cart)}>Delete All</button>
                                </div>
                                <div className={`px-1 py-2 sm:py-4 sm:px-6 ${cart.length > 2 ? 'box-item' : ''}`}>
                                    {cart.map(item => <CartItem key={item.id} item={item}/>)}
                                </div>
                                <div className='flex justify-center pr-0 py-3 sm:py-4 sm:pr-6 sm:justify-end'>
                                    <div className='bg-gray-200 w-fit py-3 px-2 rounded-xl border border-gray-500 flex flex-col justify-between items-center sm:flex-row sm:py-6 sm:px-4'>
                                        <div className='mr-0 sm:mr-4'>
                                            <span className='mr-2 text-base sm:text-xl'>Order total:</span>
                                            <span className='text-base sm:text-xl'>{totalPrice()} $</span>
                                        </div>
                                        <button className='text-sm sm:text-lg uppercase bg-black text-white py-1 px-4 rounded hover:bg-gray-500 transition mt-1 sm:mt-0'>buy now</button>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </div>
        </>
    )
}
