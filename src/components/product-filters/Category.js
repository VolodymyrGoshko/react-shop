import React, {useState} from "react"
import {inputsCategory} from "../../constants/constants"
import {filtersProductsByCategory} from "../../redux/products/products.slice"
import {useDispatch, useSelector} from "react-redux"

export function Category() {
    const [filterIndex, setFilterIndex] = useState(0)
    const {filters} = useSelector(state => state.product)
    const dispatch = useDispatch()

    const changeCategory = (event, index) => {
        setFilterIndex(index)
        if (event.target.checked) {
            dispatch(filtersProductsByCategory({category: event.target.id}))
            return
        }
        dispatch(filtersProductsByCategory({}))
    }
    return (
        <>
            {
                inputsCategory.map((option, index) => (
                    <div key={index} className='py-1 flex'>
                        <input
                            className='outline-0 cursor-pointer w-[15px]'
                            type="checkbox"
                            id={option.id}
                            checked={filters.category !== undefined && filterIndex === index}
                            onChange={(event) => changeCategory(event, index)}
                        />
                        <label htmlFor={option.id} className='pl-1 cursor-pointer'>{option.textContext}</label>
                    </div>
                ))
            }
        </>
    )
}
