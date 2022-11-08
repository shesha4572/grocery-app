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
        page_num : 0,
        total_pages : 0
    }

    state = this.initialState

    componentDidMount() {
        axios.get("http://localhost:8000/getAllItems").then(res => this.setState({items : res.data , length : res.data.length , total_pages : Math.ceil(res.data.length / 10) , page_num : 1}))
    }

    render() {
        console.log(this.state.items.slice((this.state.page_num - 1) * 10 , this.state.page_num * 10) , this.state.page_num)
        return(
                <div>
                    <div className ="navbar">
                        <img src={logo} className={"logo"}/>
                         <TextField fullWidth margin={"dense"} placeholder={"Search"} variant='outlined'/>
                    </div>
                    <Grid container padding={"20px 20px 20px 20px"} >
                        {this.state.items.slice((this.state.page_num - 1) * 10 , this.state.page_num * 10).map( el => <ParseItems id = {el.id} item = {el}/>)}
                    </Grid>
                    <Grid container justifyContent={"center"} padding={"10px 10px 10px 10px"}>
                        <Button id={"back-button"} onClick={() => this.setState({page_num : this.state.page_num === 1 ? 1 : this.state.page_num - 1})}> Prev </Button> <span></span> <Button id={"next-button"} onClick={() => this.setState({page_num : this.state.page_num === this.state.total_pages ? this.state.page_num : this.state.page_num + 1})}> Next </Button>
                    </Grid>
                    <Grid container justifyContent={"center"} padding={"10px 10px 10px 10px"}> {Array.from({length : this.state.total_pages} , (v , k) => k + 1).map(el => <Button id = {el} value={el} onClick={e => this.setState({page_num : e.target.value})}> {el}</Button>)} </Grid>
                    </div>
        )
    }

}

export default ProductList