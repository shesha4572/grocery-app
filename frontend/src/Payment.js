import React from "react";
import logo from "./logo.jpg";
import {InputAdornment, MenuItem, Select, TextField, ToggleButton, Typography} from "@mui/material";
import {Cookies} from "react-cookie";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PaymentsIcon from '@mui/icons-material/Payments';
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
                <TextField id={'address'} placeholder={"Enter Address"} variant={"standard"}></TextField>
                <Select
                    labelId="payment-selector"
                    id="payment-method"
                    value={1}
                    label="payment-method"
                >
                    <MenuItem value={1} >{<CreditCardIcon/>} Credit Card</MenuItem>
                    <MenuItem value={2}>{<CreditCardIcon/>} Debit Card</MenuItem>
                    <MenuItem value={3}>{<CurrencyRupeeIcon/>} UPI</MenuItem>
                    <MenuItem value={4}>{<PaymentsIcon/>} COD</MenuItem>
                </Select>
            </div>
        );
    }
}

export default Payment