import {Button, ButtonBase, Grid, MenuItem, TextField, Typography} from "@mui/material";

import React from "react";
import {Cookies} from "react-cookie";

class ParseItems extends React.Component{

    initialState = {
        item : {
            id : 0,
            name : "",
            desc : "",
            image_link : "",
            type : 0,
            details : [[0 , 0 , 0]]
        },
        price : 0,
        stock : 0,
        qty : 1,
        selected_type : 0
    }

    state = this.initialState


    componentDidMount() {
        this.setState({item : this.props.item , price : this.props.item.details[0][1] , stock : this.props.item.details[0][2] , selected_type : this.props.item.details[0][0]})
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.id !== prevProps.id) {
            this.setState({
                item: this.props.item,
                price: this.props.item.details[0][1],
                stock: this.props.item.details[0][2]
            })
        }
    }

    AddToCartHandler = () => {
        const cookie = new Cookies();
        const cart = cookie.get("cart");
        cookie.remove("cart");
        if(Object.keys(cart).includes(`${this.state.item.id}`)){
            cart[this.state.item.id].push({"type" : this.state.selected_type , "qty" : this.state.qty})
        }
        else{
            cart[this.state.item.id] = [{"type": this.state.selected_type, "qty": this.state.qty}];
        }
        cookie.set("cart" , cart);
    }

    render() {
        const unit = this.state.item.type === 1 ? "Kg" : "L"
        const text = this.state.item.type === 1 ? "Weight" : "Volume"
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
                    <Grid>
                        <Button variant={"contained"} color={"warning"} size={"large"}  disabled={this.state.stock === 0} fullWidth
                                sx={{p: 2, borderRadius: 25}} onClick={this.AddToCartHandler}>Add to Cart</Button> <br/><br/>
                        <Button
                        variant={"contained"} color={"success"} size={"large"}  disabled={this.state.stock === 0} fullWidth
                        sx={{p: 2, borderRadius: 25}}>Buy Now</Button>
                    </Grid>
                </Grid>
                <Grid xs={12} sm container>
                    <Grid item container spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="h6" component="div">
                                {this.state.item.name}
                            </Typography>
                            <Typography variant="subtitle2">
                                {this.state.item.desc}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Item Id : #{this.state.item.id}
                            </Typography>
                            <br/>
                            <Typography variant="body1" gutterBottom>
                                Free Delivery within 2 Days <br/>
                                COD Available
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>

                        <TextField select id="weight-volume-selector" defaultValue={0} label = {text} color={"secondary"} onChange={e => this.setState({price : this.state.item.details[e.target.value][1] , stock : this.state.item.details[e.target.value][2] , selected_type : this.state.item.details[e.target.value][0]})} sx = {{padding : "10px 10px 10px 10px"}}>
                            {this.state.item.details.map((el, ind) => <MenuItem value={ind}> {el[0]} {unit} </MenuItem>)}
                        </TextField> <span></span><span></span>
                        <TextField select id = "qty-selector" defaultValue={1} label={"Qty"} onChange={e => this.setState({qty : e.target.value})} sx = {{padding : "10px 10px 10px 10px"}} color={"secondary"}>
                            {Array(10).fill(0).map((el , index) => <MenuItem value={index + 1}> {index + 1} </MenuItem>)}
                        </TextField>
                        <Typography variant="h6" component="div">
                            <b> Rs. {this.state.price.toFixed(2)} </b>
                        </Typography>
                        <Typography variant="h6" component="div" color={this.state.stock <= 5 ? this.state.stock === 0 ? "error.main" : "warning.main" : "success.main"}>
                            <b> {this.state.stock <= 5 ? this.state.stock === 0 ? "Out Of stock" : "Hurry UP! stock is low!!!" : `In stock`} </b>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default ParseItems;
