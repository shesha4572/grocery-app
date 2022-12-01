import React from "react";
import logo from "./logo.jpg";
import {Button, MenuItem, TextField, Typography} from "@mui/material";
import {Cookies} from "react-cookie";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PaymentsIcon from '@mui/icons-material/Payments';
import axios from "axios";
import {Navigate} from "react-router-dom";
class Payment extends React.Component{
    initialState = {
        address: "",
        paymentMethod : "Cash On Delivery",
        amount : 0,
        no_items : 0,
        order_id : ""
    }

    state = this.initialState

    handlePayClick = () => {
        const cookie = new Cookies()
        const form = new FormData()
        form.set("user_token" , cookie.get("jwt"))
        form.set("address" , document.getElementById("address").value)
        form.set("payment_method" , this.state.paymentMethod)
        form.set("amount" , cookie.get("amount"))
        axios.post("http://localhost:8000/checkout" , form).then(res => {if(res.status === 200){this.setState({order_id : res.data}); console.log(res.data); alert(`Order #${res.data} placed successfully. Redirecting to items page`)}})
    }


    render() {
        if(this.state.order_id !== ""){
            return(
            <Navigate to={"/allItems"}/>
            )
        }

        return (
            <div>
                <img src={logo} className={"logo"}/>
                <Typography variant={"h2"} align={"center"}>Payment Portal</Typography>
                <Typography variant={"h4"} gutterBottom paddingLeft={10}> Hello, {new Cookies().get("full_name")}</Typography>
                <TextField style={{width : "47%" , padding : "20px 20px 20px 20px"}} id={'address'} placeholder={"Enter Address"} variant={"outlined"}></TextField>
                <TextField select style={{width : "47%" , padding : "15px 10px 10px 20px"}}
                    labelId="payment-selector"
                    id="payment-method"
                    defaultValue={"COD"}
                    onChange={e => this.setState({paymentMethod : e.target.value})}
                >
                    <MenuItem value={"Credit Card"} >{<CreditCardIcon/>} Credit Card</MenuItem>
                    <MenuItem value={"Debit Card"}>{<CreditCardIcon/>} Debit Card</MenuItem>
                    <MenuItem value={"UPI"}>{<CurrencyRupeeIcon/>} UPI</MenuItem>
                    <MenuItem value={"COD"}>{<PaymentsIcon/>} Cash On Delivery</MenuItem>
                </TextField> <br/>
                <div style={{paddingLeft : "47%" , paddingTop : "25px"}}>
                <Button variant={"contained"} style={{padding : "20px 20px 20px 20px"}} color={"secondary"} onClick={this.handlePayClick}>Pay Rs.{new Cookies().get("amount")}</Button>
                </div>
            </div>
        );
    }
}

export default Payment