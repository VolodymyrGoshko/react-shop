import React, {useState} from "react"
import {optionsProducts} from "../../constants/constants"

export function Sizes() {
    const [selectedSize, setSelectedSize] = useState(0)
    const {sizes} = optionsProducts

    return (
        <div className='pt-6 w-fit lg:w-[320px]'>
            <div className='flex justify-between'>
                <span className='text-base'>Size</span>
                <button className='text-indigo-600 font-medium hover:text-indigo-500 transition'>Size guide</button>
            </div>
            <div className='flex justify-start flex-wrap lg:justify-between'>
                {
                    sizes.map((item, index) => (
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
