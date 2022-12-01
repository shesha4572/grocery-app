
import {Route , Routes} from "react-router-dom";
import React from "react";
import Homepage from "./homepage";
import {Register} from "./Register";
import LoginPage from "./LoginPage";
import ProductList from "./ProductList";
import CartView from "./Cart";
import PrivateRoute from "./PrivateRoute";
import Payment from "./Payment";

function App() {
    return(
        <Routes>
            <Route exact path = "/" element = {<Homepage/>}/>
            <Route path = "/register" element = {<Register/>}/>
            <Route path= "/login" element={<LoginPage/>}/>
            <Route path= "/allItems" element={<PrivateRoute><ProductList/></PrivateRoute>}/>
            <Route path = "/cart" element = {<PrivateRoute><CartView/></PrivateRoute>}/>
            <Route path={"/payment"} element={<Payment/>}/>
        </Routes>
    )
}



export default App;