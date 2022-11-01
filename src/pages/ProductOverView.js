import React, {useContext} from "react"
import {Context} from "../context/context"
import {useGetProductByIdQuery} from "../redux/products/products.api"
import {Loader} from "../components/loader/Loader"
import {ProductDetailItem} from "../components/product-detail-item/ProductDetailItem"
import {Footer} from "../components/footer/Footer"

export function ProductOverView() {
    const {id} = useContext(Context)

    const {data:product, error, isLoading, refetch, status} = useGetProductByIdQuery(id)

    return (
        <>
            <div className='container max-w-[1240px] mx-auto mt-[70px]'>
                { error && <p className='text-center pt-4'>{error.error}</p> }
                { isLoading && <Loader/> }
                {
                    product && <ProductDetailItem product={product} refetch={refetch} status={status}/>
                }
            </div>
            { status === 'fulfilled' && <Footer /> }
        </>
    )
}
