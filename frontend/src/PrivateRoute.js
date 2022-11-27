import React from "react";
import {Navigate} from "react-router-dom";
import {Cookies} from "react-cookie";

const PrivateRoute = ({children}) => {
    let token = new Cookies().get("jwt")
    return token ? children : <Navigate to= "/login"/>
}

export default PrivateRoute