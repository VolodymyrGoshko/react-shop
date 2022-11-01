import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {Provider} from "react-redux"
import {BrowserRouter} from "react-router-dom"
import {store} from "./redux"
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
