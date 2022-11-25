
import {Route , Routes} from "react-router-dom";
import React from "react";
import Homepage from "./homepage";
import {Register} from "./Register";
import LoginPage from "./LoginPage";
import ProductList from "./ProductList";
import CartView from "./Cart";

function App() {
    return(
        <Routes>
            <Route exact path = "/" element = {<Homepage/>}/>
            <Route path = "/register" element = {<Register/>}/>
            <Route path= "/login" element={<LoginPage/>}/>
            <Route path= "/allItems" element={<ProductList/>}/>
            <Route path = "/cart" element = {<CartView/>}/>
        </Routes>
    )
}



export default App;