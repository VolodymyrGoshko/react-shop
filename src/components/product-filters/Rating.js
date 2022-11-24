import React, {useState} from "react"
import {inputsRating} from "../../constants/constants"
import {filtersProductsByCategory} from "../../redux/products/products.slice"
import {useDispatch, useSelector} from "react-redux"

export function Rating() {
    const [filterIndex, setFilterIndex] = useState(0)
    const {filters} = useSelector(state => state.product)
    const dispatch = useDispatch()

    const changeRating = (event, index) => {
        setFilterIndex(index)
        if (event.target.checked) {
            dispatch(filtersProductsByCategory({rating: event.target.id}))
            return
        }
        dispatch(filtersProductsByCategory({}))
    }

    return (
        <>
            {
                inputsRating.map((option, index) => (
                    <div className={option.classDiv} key={index}>
                        <input
                            type={option.type}
                            id={option.id}
                            className={option.classInput}
                            checked={filters.rating !== undefined && filterIndex === index}
                            onChange={(event) => changeRating(event, index)}
                        />
                        <label htmlFor={option.id} className={option.classLabel}>{option.textContent}</label>
                    </div>
                ))
            }
        </>
    )
}
