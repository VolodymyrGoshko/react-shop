import {configureStore} from "@reduxjs/toolkit"
import {productsApi} from "./products/products.api"
import {productReducer} from "./products/products.slice"
import {setupListeners} from "@reduxjs/toolkit/query"

export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        product: productReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(productsApi.middleware)
})

setupListeners(store.dispatch)
