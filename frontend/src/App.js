
import {Route , Routes} from "react-router-dom";
import React from "react";
import Homepage from "./homepage";
import {Register} from "./Register";
import LoginPage from "./LoginPage";
import ProductList from "./ProductList";

function App() {
    return(
        <Routes>
            <Route exact path = "/" element = {<Homepage/>}/>
            <Route path = "/register" element = {<Register/>}/>
            <Route path= "/login" element={<LoginPage/>}/>
            <Route path= "/allItems" element={<ProductList/>}/>
        </Routes>

    )
}



export default App;