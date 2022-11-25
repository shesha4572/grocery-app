import React from "react";
import axios from "axios";
import {Cookies} from "react-cookie";
import {Button, ButtonBase, Grid, MenuItem, TextField, Typography} from "@mui/material";

class CartItemParse extends React.Component {
    initialState = {
        item : {
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
        const form = new FormData()
        form.set("item_id" , this.state.id)
        form.set("item_qty" , qty)
        form.set("item_type" , this.state.type_qty)
        form.set("token" , new Cookies().get("jwt"))
        form.set("type" , this.type)
        axios.post("http://localhost:8000/reserveItem" , form).then(res => console.log(res.status))
    }

    componentDidMount() {
        console.log(this.props)
        this.setState({item : this.props.item})
    }


    render() {
        return (
            <Grid item container xs={12} margin={"5px"} style={{
                padding: "20px 20px 20px 200px",
                minHeight: '350px',
                minWidth: '200px',
                borderBottom: "1px solid black"
            }}>
                <Grid item sx={{paddingRight: "150px"}}>
                    <ButtonBase href="/#">
                        <img alt="complex" style={{width: 192, height: 192}} src={this.state.item.image_link}/>
                    </ButtonBase> <br/><br/>
                    <TextField id = "qty-selector" value={this.state.item.qty} label={"Qty"} onChange={e => {this.setState({qty : e.target.value}); this.handleChangeQty(e.target.value)}} sx = {{padding : "10px 10px 10px 10px"}} color={"secondary"}/>
                </Grid>
                <Grid xs={12} sm container>
                    <Grid item container spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="h6" component="div">
                                {this.state.item.name}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>


                        <Typography variant="h6" component="div">
                            <b> Rs. {this.state.item.price.toFixed(2)} *  {this.state.item.qty} = {(this.state.item.price * this.state.item.qty).toFixed(2)} </b>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

}

export default CartItemParse