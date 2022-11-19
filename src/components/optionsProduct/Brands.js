import React, {useState} from "react"
import {optionsProducts} from "../../constants/constants"

export function Brands() {
    const [selectedBrand, setSelectedBrand] = useState(0)
    const {brands} = optionsProducts

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
}
