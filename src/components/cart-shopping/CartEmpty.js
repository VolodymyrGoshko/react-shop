import React from "react"
import images from "../../assets/cart/cart-empty.jpg"

export function CartEmpty() {
    return (
        <div className='text-center'>
            <img className='w-[300px] h-auto m-auto sm:h-[300px]' src={images} alt='cart empty'/>
            <p className='text-2xl'>Shopping cart is empty!</p>
            <p className='text-base my-2 text-gray-500'>But it's never too late to fix it :)</p>
        </div>
    )
}
