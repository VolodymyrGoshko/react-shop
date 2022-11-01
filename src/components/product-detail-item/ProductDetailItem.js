import React, {useContext, useState} from "react"
import {useGetProductByCategoryQuery} from "../../redux/products/products.api"
import {Link} from "react-router-dom"
import {faCartShopping, faCheck, faStar} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Loader} from "../loader/Loader"
import {useDispatch, useSelector} from "react-redux"
import {addProductToCart} from "../../redux/products/products.slice"
import {Context} from "../../context/context"

export function ProductDetailItem({product, refetch, status}) {
    const [selectedColor, setSelectedColor] = useState(0)
    const [selectedSize, setSelectedSize] = useState(0)
    const [selectedBrand, setSelectedBrand] = useState(0)
    const contextId = useContext(Context)
    const {cart} = useSelector(state => state.product)

    const {data, isLoading, error} = useGetProductByCategoryQuery(product.category)
    const filterProductFooter = data?.filter(item => item.id !== product.id)

    const isCart = !!cart.find(el => el.id === product.id)
    const dispatch = useDispatch()

    const addProduct = () => {
        dispatch(addProductToCart(product))
    }

    const countStar = rating => {
        const arr = []
        const ratingRound = Math.round(rating)
        for (let i = 0; i < ratingRound; i++) {
            arr.push(i)
        }
        return arr.map(star => <FontAwesomeIcon key={star} className='text-yellow-500' icon={faStar} />)
    }

    const optionsProduct = category => {
        const colors = [
            { class: 'bg-white', selectedClass: 'ring-gray-400' },
            { class: 'bg-blue-500', selectedClass: 'ring-gray-400' },
            { class: 'bg-black', selectedClass: 'ring-gray-400' },
            { class: 'bg-yellow-500', selectedClass: 'ring-gray-400' }
        ]

        const size = [
            { content: 'xs', selectedClass: 'ring-indigo-600' },
            { content: 's', selectedClass: 'ring-indigo-600' },
            { content: 'm', selectedClass: 'ring-indigo-600' },
            { content: 'l', selectedClass: 'ring-indigo-600' },
            { content: 'xl', selectedClass: 'ring-indigo-600' },
            { content: '2xl', selectedClass: 'ring-indigo-600' }
        ]

        const brands = [
            { content: 'samsung', selectedClass: 'ring-indigo-600' },
            { content: 'asus', selectedClass: 'ring-indigo-600' },
            { content: 'lg', selectedClass: 'ring-indigo-600' },
            { content: 'apple', selectedClass: 'ring-indigo-600' },
            { content: 'xiaomi', selectedClass: 'ring-indigo-600' },
            { content: 'lenovo', selectedClass: 'ring-indigo-600' }
        ]

        const renderSize = () => {
            return (
                <div className='pt-6 w-fit lg:w-[320px]'>
                    <div className='flex justify-between'>
                        <span className='text-base'>Size</span>
                        <button className='text-indigo-600 font-medium hover:text-indigo-500 transition'>Size guide</button>
                    </div>
                    <div className='flex justify-start flex-wrap lg:justify-between'>
                        {
                            size.map((item, index) => (
                                <button
                                    key={index}
                                    className={`py-4 bg-white text-black mt-4 mr-2 text-md uppercase rounded border ring-offset-1 w-[60px] sm:w-[75px] lg:w-[95px] ${selectedSize === index && item.selectedClass + ' ring-2'} focus:text-indigo-600`}
                                    onClick={() => setSelectedSize(index)}
                                >
                                    {item.content}
                                </button>
                            ))
                        }
                    </div>
                </div>
            )
        }

        switch (category) {
            case "men's clothing":
            case "women's clothing":
                return (
                    <>
                        <>
                            <span className='text-lg'>Color</span>
                            <div className='flex items-center my-4'>
                                {
                                    colors.map((item, index) => (
                                        <button
                                            key={index}
                                            className={`${item.class} ${selectedColor === index && item.selectedClass + ' ring-2'}  ring-offset-1 w-[40px] h-[40px] border mr-2 rounded-full`}
                                            onClick={() => setSelectedColor(index)}
                                        ></button>
                                    ))
                                }
                            </div>
                        </>
                        {renderSize()}
                    </>
                )
            case "jewelery":
                return renderSize()
            case "electronics":
                return (
                    <div className='pt-6 w-fit lg:w-[320px]'>
                        <div className='capitalize'>
                            compatibility with the brand
                        </div>
                        <div className='flex justify-start flex-wrap lg:justify-between'>
                            {
                                brands.map((item, index) => (
                                    <button
                                        key={index}
                                        className={`py-4 bg-white text-black mt-4 mr-2 text-sm uppercase rounded border ring-offset-1 w-[75px] lg:w-[95px] sm:text-base ${selectedBrand === index && item.selectedClass + ' ring-2'} focus:text-indigo-600`}
                                        onClick={() => setSelectedBrand(index)}
                                    >
                                        {item.content}
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                )
            default:
                return
        }
    }


    const clickHandler = (productId) => {
        contextId.id = productId
        refetch()
        if (status === "fulfilled") {
            document.body.scrollIntoView()
        }
        setSelectedColor(0)
        setSelectedSize(0)
    }

    return (
        <>
            <div className='px-2 pb-6'>
                <p className='capitalize text-gray-500 mb-6 text-sm font-semibold sm:text-base'>
                    <Link to='/' className='transition hover:border-b-2 border-b-gray-500'>
                        Home
                    </Link>
                    <span className='px-2'>\</span>
                    {product.category}
                    <span className='pl-2'>\</span>
                </p>
                <div className='flex flex-col justify-center items-center lg:flex lg:flex-row lg:justify-between lg:items-start'>
                    <div className='w-full shadow-lg rounded-md flex justify-center items-center lg:w-2/4 sm:w-3/4'>
                        <img className='w-2/4 lg:w-3/4' src={product.image} alt={product.title}/>
                    </div>
                    <div className='w-full pl-0 sm:w-3/4 lg:w-2/4 lg:pl-[30px]'>
                        <div>
                            <p className='font-medium text-xl mt-5 lg:mt-0 md:text-2xl'>{product.title}</p>
                            <p className='my-4 text-xl sm:text-2xl'>${product.price}</p>
                            <div className='flex justify-start'>
                                <div className='mr-4'>
                                    <span className='mr-2 text-base font-semibold'>{product.rating.rate}</span>
                                    {countStar(product.rating.rate)}
                                </div>
                                <span className='cursor-pointer text-indigo-600 text-base font-medium hover:text-indigo-500 transition'>{product.rating.count} reviews</span>
                            </div>
                            <p className='text-base mt-4 sm:text-lg'>{product.description}</p>
                            <div className='my-4'>
                                {optionsProduct(product.category)}
                            </div>
                            <button
                                onClick={addProduct}
                                disabled={isCart}
                                className={`w-full bg-black mt-8 text-md rounded-md text-white transition px-[80px] py-[15px] sm:text-lg md:w-fit ${isCart ? 'border px-[40px] py-[10px]' : 'hover:bg-gray-800'}`}
                            >
                                {
                                    isCart
                                        ? <FontAwesomeIcon className='text-[25px] sm:text-[30px]' icon={faCheck} />
                                        : <> Add to bag
                                            <span className='ml-2'><FontAwesomeIcon icon={faCartShopping} /></span>
                                        </>
                                }
                            </button>
                        </div>
                    </div>
                </div>
                <div className='mt-[100px]'>
                    <p className='text-xl font-medium w-fit border-b-2 border-b-gray-500 mx-auto lg:mx-0'>You may also be interested</p>
                    <div className={`flex justify-start mt-8 overflow-x-auto lg:overflow-x-hidden ${filterProductFooter?.length > 3 ? 'lg:justify-center' : 'sm:justify-center'}`}>
                        {error && <div>{error.error}</div>}
                        {isLoading && <Loader />}
                        {
                            filterProductFooter?.map(product => (
                                <Link to={`/products/${product.id}`}
                                      onClick={() => clickHandler(product.id)}
                                      key={product.id}
                                      className='flex flex-col justify-evenly items-center border mx-1 py-1 rounded-lg shadow-lg productItem'
                                >
                                    <img className='w-[100px]' src={product.image} alt={product.title}/>
                                    <div>
                                        <p className='w-[200px] text-center'>{product.title}</p>
                                        <p className='font-medium text-center'>${product.price}</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
