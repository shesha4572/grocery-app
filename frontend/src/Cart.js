import React from "react";
import axios from "axios";
import {Cookies} from "react-cookie";
import CartItemParse from "./CartItemParse";
import {Badge, Button, Grid, TextField, Typography} from "@mui/material";
import logo from "./logo.jpg";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Navigate} from "react-router-dom";
import ProductList from "./ProductList";


class CartView extends React.Component{

    initialState = {
        items : [],
        redirect : false
    }

    state = this.initialState

    componentDidMount() {
        this.getCartItems()
    }

    getCartItems = () =>{
        const token = new Cookies().get("jwt")
        axios.get("http://localhost:8000/getCart/" + token).then(res => this.setState({items : res.data}))
    }


    handleSearch = () => {
        new Cookies().set("cart-search" , document.getElementById("search-input-cart").value)
        this.setState({redirect : true})
    }
    userCheck = () => {
        const cookies = new Cookies()
        const name = cookies.get("full_name")
        return !name  ?  "Hello, Guest" : `Hello, ${name}`
    };

    getTotal = () => {
        let total = 0;
        this.state.items.map((el) => {total += (el.price * el.qty)});
        return total;
    }

    render() {

        if(this.state.redirect){
            return <Navigate to={"/allItems"}/>
        }

        return(
            <div>
                <div className ="navbar" style={{width:'93%'}}>
                        <Grid container xs spacing={3}>
                        <Grid container={true} xs> <img src={logo} className={"logo"}/> </Grid>
                        <Grid item xs = {9}> <TextField id = "search-input-cart" fullWidth={true} margin={"dense"} placeholder={"Search"} variant='outlined'/> </Grid>
                        <Grid item xs> <Button id = "search-button" onClick={this.handleSearch} variant={"contained"} style={{borderRadius:'15px',padding : "20px 20px 20px 20px"}}> Search </Button></Grid>
                            <Grid item xs><Badge  badgeContent={this.state.items.length} color="primary"><ShoppingCartIcon style={{scale : "200%",paddingTop:'10px'}}/></Badge> </Grid>
                            <Grid item xs> <Typography paddingTop={0.75}> <b>{this.userCheck()} </b></Typography> </Grid>
                        </Grid>
                    </div>
                <Typography align={"center"} variant={"h3"} paddingBottom={10}>Cart</Typography>
                {this.state.items.length === 0 ? <Typography  color={"error.main"} align={"center"}>No items in Cart </Typography> :
                    <div>
                        {this.state.items.map(el => <CartItemParse item ={el} parentUpdate = {this.getCartItems}/>)}
                       <b><Typography align={"center"} variant={"h3"}>Total : Rs. {this.getTotal().toFixed(2)}</Typography></b>
                    </div>
                }
            </div>
        )
    }
}

export default CartView