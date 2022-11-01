import React from "react"
import {Context} from "./context/context"
import {Route, Routes} from "react-router-dom"
import {HomePage} from "./pages/HomePage"
import {ProductOverView} from "./pages/ProductOverView"
import {Header} from "./components/header/Header"

function App() {
    const productId = {id: 0}

    return (
        <>
            <Context.Provider value={productId}>
                <Header />
                <Routes>
                    <Route path='/' element={ <HomePage /> }/>
                    <Route path='/products/:id' element={ <ProductOverView /> }/>
                </Routes>
            </Context.Provider>
        </>
    )
}

export default App
