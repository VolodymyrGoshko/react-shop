import React, {useContext} from "react"
import {useDispatch, useSelector} from "react-redux"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {addProductToCart} from "../../redux/products/products.slice"
import {faCartShopping,faCircleCheck} from "@fortawesome/free-solid-svg-icons"
import {Link} from "react-router-dom"
import {Context} from "../../context/context"

export function ProductItem({product}) {
    const {cart} = useSelector(state => state.product)
    const contextId = useContext(Context)
    const isCart = !!cart.find(el => el.id === product.id)
    const dispatch = useDispatch()

    const addToCart = (event) => {
        event.preventDefault()
        dispatch(addProductToCart(product))
    }

    const clickHandler = (productId) => {
        contextId.id = productId
    }

    return (
        <Link to={`/products/${product.id}`} onClick={() => clickHandler(product.id)} className='w-[300px] h-[400px] shadow-md mt-[10px] border relative rounded-lg productItem transition-all duration-300 sm:mr-[5px] sm:ml-[5px]'>
            <img className='w-[100px] m-auto mt-[50px]' src={product.image} alt={product.title}/>
            <div className='absolute left-0 right-0 top-[250px] text-center'>{product.title}</div>
            <div className='absolute left-0 right-0 bottom-[45px] flex justify-between items-center'>
                <span className='ml-4 text-xl'>${product.price}</span>
                <button onClick={addToCart} disabled={isCart}>
                    {isCart
                        ? <div className='relative'>
                            <FontAwesomeIcon icon={faCartShopping} className='text-2xl mr-6'/>
                            <sup><FontAwesomeIcon icon={faCircleCheck} className='absolute right-[18px] text-[#00a046] bg-white rounded-full'/></sup>
                        </div>
                        : <FontAwesomeIcon icon={faCartShopping} className='mr-6 text-2xl'/>
                    }
                </button>
            </div>
        </Link>
    )
}
