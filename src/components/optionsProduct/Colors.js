import React, {useState} from "react"
import {optionsProducts} from "../../constants/constants"
import {Sizes} from "./Sizes"

export function Colors() {
    const [selectedColor, setSelectedColor] = useState(0)
    const {colors} = optionsProducts

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
            <Sizes />
        </>
    )
}
