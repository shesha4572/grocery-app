import React from "react";
import axios from "axios";
import {Cookies} from "react-cookie";
import {Button, ButtonBase, Grid, MenuItem, TextField, Typography} from "@mui/material";
import {DeleteForever} from "@mui/icons-material";


class CartItemParse extends React.Component {
    initialState = {
        item: {
            id: 0,
            name: ",",
            image_link: "",
            type: 0,
            type_qty: 0,
            qty: 0,
            stock_available: 0,
            price: 0
        }
    }

    state = this.initialState

    handleChangeQty = (qty) => {
        const cookie = new Cookies()
        console.log(cookie.get("jwt"))
        const form = new FormData()
        form.set("item_id", this.state.item.id)
        form.set("item_qty", qty)
        form.set("item_type", this.state.item.type_qty)
        form.set("token", cookie.get("jwt"))
        form.set("type", this.state.item.type)
        if(qty === 0){
            axios.post("http://localhost:8000/deleteFromCart" , form).then(res => {if(res.status === 200){this.props.parentUpdate()}})
        }
        else {
            axios.post("http://localhost:8000/reserveItem", form).then(res => {
                console.log(res.status);
                if (res.status === 200) {
                    this.props.parentUpdate();
                }
            })
        }
        }

    componentDidMount() {
        const cookie = new Cookies()
        console.log(this.props)
        console.log(cookie.get("jwt"))
        this.setState({item: this.props.item})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.item.qty !== this.props.item.qty || prevProps.item.price !== this.props.item.price || prevProps.item.stock_available !== this.props.item.stock_available){
            this.setState({item : this.props.item})
            return true
        }
        return false
    }


    render() {
        const unit = this.state.item.type === 1 ? "Kg" : "L"
        const text = this.state.item.type === 1 ? "Weight" : "Volume"
        return (
            <Grid item container xs={12} margin={"5px"} style={{
                padding: "20px 150px 20px 150px",
                minWidth: '200px',
                borderBottom: "1px solid black"
            }}>
                <Grid item paddingRight={10} alignContent={"center"}>
                    <DeleteForever fontSize={"large"} onClick={() => this.handleChangeQty(0)}/>
                </Grid>
                <Grid item sx={{paddingRight: "50px"}}>
                    <ButtonBase href="/#">
                        <img alt="complex" style={{width: 96, height: 96}} src={this.state.item.image_link}/>
                    </ButtonBase> <br/><br/>
                </Grid>
                <Grid xs={12} sm container>
                    <Grid item container spacing={2}>
                        <Grid item xs>
                            <Typography variant="h6" component="div">
                                {this.state.item.name}
                            </Typography>
                            <Typography variant="h6" component="div">
                                {this.state.item.type_qty} {unit}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <TextField select id = "qty-selector" label={"Qty"} value={`${this.state.item.qty}`} onChange={e => this.handleChangeQty(e.target.value)} sx = {{padding : "10px 50px 10px 10px"}} color={"secondary"}>
                            {Array(10 > this.state.stock ? this.state.stock : 10).fill(0).map((el , index) => <MenuItem value={index + 1}> {index + 1} </MenuItem>)}
                        </TextField>
                </Grid>
                <Grid item>
                        <Typography variant="h5" component="div">
                            <b> Rs. {this.state.item.price.toFixed(2)} </b>
                        </Typography>
                    </Grid>
            </Grid>
        )
    }

}

export default CartItemParse