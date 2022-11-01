import {createSlice} from "@reduxjs/toolkit"

const productsSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        btnCart: null
    },
    reducers: {
        clearCart(state, action) {
            state.cart = state.cart.slice(0, action.payload)
        },
        addProductToCart(state, action) {
            state.cart.push({...action.payload, quantity: 1})
        },
        incrementProductInCart(state, action) {
            const item = state.cart.find(item => item.id === action.payload)
            item.quantity++
        },
        decrementProductInCart(state, action) {
            const item = state.cart.find(item => item.id === action.payload)
            if (item.quantity === 1) {
                item.quantity = 1
            } else {
                item.quantity--
            }
        },
        toggleBtnCart(state, action) {
            state.btnCart = action.payload
        },
        removeItemFromCart(state, action) {
            state.cart = state.cart.filter(el => el.id !== action.payload)
        }
    },
})

export const productReducer = productsSlice.reducer
export const {
    clearCart,
    addProductToCart,
    incrementProductInCart,
    decrementProductInCart,
    toggleBtnCart,
    removeItemFromCart
} = productsSlice.actions
