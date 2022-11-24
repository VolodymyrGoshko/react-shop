import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMinus} from "@fortawesome/free-solid-svg-icons"
import {filtersProductsByCategory} from "../../redux/products/products.slice"
import {useDispatch} from "react-redux"

export function Price() {
    const dispatch = useDispatch()

    const submitHandler = (event) => {
        event.preventDefault()
        const arr = []
        const inputs = event.target.querySelectorAll('input[type=number]')
        inputs.forEach(item => arr.push(item.value))
        if (!arr.includes('')) {
            dispatch(filtersProductsByCategory({price: arr}))
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <input
                type="number"
                className='border w-[50px] outline-0 text-center rounded h-[30px]'
                placeholder='min'
                required
            />
            <FontAwesomeIcon icon={faMinus} className='mx-2'/>
            <input
                type="number"
                className='border w-[50px] outline-0 text-center rounded h-[30px]'
                placeholder='max'
                required
            />
            <input
                type='submit'
                value='ok'
                className='border px-2 ml-4 uppercase rounded h-[30px] bg-black text-white hover:bg-gray-600 transition cursor-pointer'
            />
        </form>
    )
}
