import React from "react";
import logo from "./logo.jpg";
import {Typography} from "@mui/material";
import {Cookies} from "react-cookie";

class Payment extends React.Component{
    initialState = {
        address: "",
        paymentMethod : "",
        amount : 0,
        no_items : 0,
        order_id : ""
    }

    state = this.initialState

    render() {
        return (
            <div>
                <img src={logo} className={"logo"}/>
                <Typography variant={"h2"} align={"center"}>Payment Portal</Typography>
                <Typography variant={"h4"} gutterBottom paddingLeft={10}> Hello, {new Cookies().get("full_name")}</Typography>
                <Typography variant={"h5"} paddingLeft={10}>Address</Typography>

            </div>
        );
    }
}

export default Payment