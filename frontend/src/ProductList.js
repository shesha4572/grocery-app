import React  from "react";
import axios from "axios";
import {Box, Button, ButtonBase, Grid, ImageList, MenuItem, Paper, Select, TextField, Typography} from "@mui/material";
import logo from "./logo.jpg";
import {yellow} from "@mui/material/colors";
import ParseItems from "./ParseItems";



class ProductList extends React.Component{
    initialState = {
        items : [],
        length : 0,
        page_num : 0
    }

    state = this.initialState

    componentDidMount() {
        axios.get("http://localhost:8000/getAllItems").then(res => this.setState({items : res.data}))
    }

    render() {
        return(
                <div>
                    <div className ="navbar">
                        <img src={logo} className={"logo"}/>
                         <TextField fullWidth margin={"dense"} placeholder={"Search"} variant='outlined'/>
                    </div>
                    <Grid container padding={"20px 20px 20px 20px"} >
                        {this.state.items.map( el => <ParseItems item = {el}/>)}
                    </Grid>
                    </div>
        )
    }

}

export default ProductList