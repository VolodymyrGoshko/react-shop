import React, {useContext, useEffect, useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSearch} from "@fortawesome/free-solid-svg-icons"
import {useDebounce} from "../../hooks/debounce"
import {useGetProductByIdQuery, useGetProductsAllQuery} from "../../redux/products/products.api"
import {Link} from "react-router-dom"
import {Context} from "../../context/context"
import {useDispatch, useSelector} from "react-redux"
import {setSearchFilterProducts, toggleSearchForm} from "../../redux/products/products.slice"

export function Search() {
    const filtersProducts = []
    const [search, setSearch] = useState('')
    const [dropdown, setDropdown] = useState(false)

    const contextId = useContext(Context)
    const debounced = useDebounce(search)
    const dispatch = useDispatch()

    const searchField = useSelector(state => state.product.search)

    const {refetch} = useGetProductByIdQuery(contextId.id)

    const {data} = useGetProductsAllQuery(debounced, {
        skip: debounced.length < 2,
        // refetchOnFocus: true
    })

    const clickHandler = (productId) => {
        setDropdown(false)
        dispatch(toggleSearchForm(false))
        contextId.id = productId
        refetch()
    }

    const toggleForm = () => dispatch(toggleSearchForm(false))

    useEffect(() => {
        setDropdown(debounced.length >= 3 && data?.length > 0)
    }, [debounced, data])

    const products = () => {
        if (debounced.length >= 2 && data?.length > 0) {
            return data?.filter(product => {
                if (product.title.toLowerCase().includes(search.toLowerCase())) {
                    filtersProducts.push(product)
                    return product
                }
            }).map((product,index) => {
                return <Link to={`/products/${product.id}`} onClick={() => clickHandler(product.id)}
                             className='text-black flex items-center max-h-[80px] mb-4 border-b pb-2 last:border-0 last:mb-0 hover:opacity-50 transition'
                             key={index}>
                    <img className='w-[50px] mr-4 max-h-[75px]' src={product.image} alt={product.title}/>
                    <div>
                        <p className='text-base'>{product.title}</p>
                        <p className='text-md font-medium'>$ {product.price}</p>
                    </div>
                </Link>
            })
        }
    }

    const submitSearchForm = event => {
        event.preventDefault()
        if (search !== '') {
            dispatch(setSearchFilterProducts(filtersProducts))
            dispatch(toggleSearchForm(false))
        }
        setDropdown(false)
    }

    return (
        <>
            { searchField && <div className='absolute left-0 right-0 top-0 bottom-0 w-full h-[100vh] z-10 bg-gray-300/50' onClick={toggleForm}/> }

            <form
                className={`${searchField ? 'absolute top-3 left-0 mx-auto right-0 w-[90%] bg-white z-20 rounded shadow-md flex items-center justify-between' : 'bg-white rounded rounded-r-md hidden items-center relative w-[390px] md:flex md:justify-between'}`}
                onSubmit={submitSearchForm}
            >
                <FontAwesomeIcon icon={faSearch} className='text-black pr-1 pl-2'/>
                <input
                    type="text"
                    placeholder='Search products...'
                    className='px-1 text-lg text-black outline-0 h-[35px] w-full focus:outline-none'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <input
                    className='bg-black h-[35px] px-3 rounded-r hover:bg-gray-700 transition cursor-pointer'
                    type='submit'
                    value='Find'
                />

                {dropdown &&
                    <div className='absolute left-0 top-[36px] right-0 bg-white p-2 border border-black rounded max-h-[500px] overflow-y-auto search-box'>
                        { products() }
                    </div>
                }

            </form>
        </>
    )
}
