import React from "react";
import axios from "axios";
import {Cookies} from "react-cookie";
import CartItemParse from "./CartItemParse";
import {Badge, Button, Grid, TextField, Typography} from "@mui/material";
import logo from "./logo.jpg";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

class CartView extends React.Component{

    initialState = {
        items : []
    }

    state = this.initialState

    componentDidMount() {
        const token = new Cookies().get("jwt")
        axios.get("http://localhost:8000/getCart/" + token).then(res => this.setState({items : res.data}))
    }

    handleSearch = () => {
        const inp = document.getElementById("search-input").value
        console.log(inp , "in")
        if(inp === ""){
            this.componentDidMount()
        }
        axios.get(`http://localhost:8000/searchItem${inp}`).then(res => this.setState({items : res.data , length : res.data.length , total_pages : Math.ceil(res.data.length / 10) , page_num : 1}))
    }
    userCheck = () => {
        const cookies = new Cookies()
        const name = cookies.get("full_name")
        return !name  ?  "Hello, Guest" : `Hello, ${name}`
    };

    render() {
        return(
            <div>
                <div className ="navbar" style={{width:'93%'}}>
                        <Grid container xs spacing={3}>
                        <Grid container={true} xs> <img src={logo} className={"logo"}/> </Grid>
                        <Grid item xs = {9}> <TextField id = "search-input" fullWidth={true} margin={"dense"} placeholder={"Search"} variant='outlined'/> </Grid>
                        <Grid item xs> <Button id = "search-button" onClick={this.handleSearch} variant={"contained"} style={{borderRadius:'15px',padding : "20px 20px 20px 20px"}}> Search </Button></Grid>
                            <Grid item xs><Badge  badgeContent={this.state.items.length} color="primary"><ShoppingCartIcon style={{scale : "200%",paddingTop:'10px'}}/></Badge> </Grid>
                            <Grid item xs> <Typography paddingTop={0.75}> <b>{this.userCheck()} </b></Typography> </Grid>
                        </Grid>
                    </div>
                <Typography align={"center"} variant={"h3"}>Cart</Typography>
                {this.state.items.map(el => <CartItemParse item = {el}/>)}
            </div>
        )
    }
}

export default CartView