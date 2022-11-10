import React  from "react";
import axios from "axios";
import {Button, Grid, TextField, Typography} from "@mui/material";
import logo from "./logo.jpg";
import ParseItems from "./ParseItems";
import {Cookies} from "react-cookie";



class ProductList extends React.Component{
    initialState = {
        items : [],
        length : 0,
        page_num : 0,
        total_pages : 0
    }

    state = this.initialState

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

    componentDidMount() {
        axios.get("http://localhost:8000/getAllItems").then(res => this.setState({items : res.data , length : res.data.length , total_pages : Math.ceil(res.data.length / 10) , page_num : 1}))
    }

    render() {

        if(this.state.items.length === 0){
            return (
                 <div>
                    <div className ="navbar">
                        <Grid container xs spacing={3}>
                        <Grid container={true} xs> <img src={logo} className={"logo"}/> </Grid>
                        <Grid item xs = {9}> <TextField id = "search-input" fullWidth={true}  margin={"dense"} placeholder={"Search"} variant='outlined'/> </Grid>
                        <Grid item xs> <Button id = "search-button" onClick={this.handleSearch} variant={"contained"} style={{padding : "20px 20px 20px 20px"}}> Search </Button> </Grid>
                        <Grid item xs> <Typography paddingTop={3}> <b>{this.userCheck()} </b></Typography> </Grid>
                            </Grid>
                    </div>
                    <Typography color={"error.main"} alignItems={"center"}>No items Found! Please Check your Search Phrase and Try again </Typography>
                </div>
            )
        }

        return(
                <div>
                    <div className ="navbar">
                        <Grid container xs spacing={3}>
                        <Grid container={true} xs> <img src={logo} className={"logo"}/> </Grid>
                        <Grid item xs = {9}> <TextField id = "search-input" fullWidth={true}  margin={"dense"} placeholder={"Search"} variant='outlined'/> </Grid>
                        <Grid item xs> <Button id = "search-button" onClick={this.handleSearch} variant={"contained"} style={{padding : "20px 20px 20px 20px"}}> Search </Button> </Grid>
                        <Grid item xs> <Typography paddingTop={3}> <b>{this.userCheck()} </b></Typography> </Grid>
                            </Grid>
                    </div>
                        <Grid container padding={"20px 20px 20px 20px"}>
                            {this.state.items.slice((this.state.page_num - 1) * 10, this.state.page_num * 10).map(el =>
                                <ParseItems id={el.id} item={el}/>)}
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