
import {Route , Routes} from "react-router-dom";
import React from "react";
import Homepage from "./homepage";
import {Register} from "./Register";
import LoginPage from "./LoginPage";

function App() {
    return(
        <Routes>
            <Route exact path = "/" element = {<Homepage/>}/>
            <Route path = "/register" element = {<Register/>}/>
            <Route path= "/login" element={<LoginPage/>}/>
        </Routes>

    )
}



export default App;