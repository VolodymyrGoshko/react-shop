import React, {useContext} from "react"
import {useGetProductsAllQuery} from "../../redux/products/products.api"
import {ProductItem} from "../product-item/ProductItem"
import {Loader} from "../loader/Loader"
import {Footer} from "../footer/Footer"

export function ProductList() {
    const { data, error, isLoading, status } = useGetProductsAllQuery()

    return (
        <>
            <div className='container mb-[20px] mt-[60px] max-w-[1240px] mx-auto flex flex-wrap justify-center transition-all'>
                {isLoading && <Loader />}
                {error && <p className='text-center mt-4'>{error.error}</p>}
                {
                    data?.map(product => <ProductItem product={product} key={product.id} />)
                }
            </div>
            { status === 'fulfilled' && <Footer /> }
        </>
    )
}


















