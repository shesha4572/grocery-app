import React  from "react";
import axios from "axios";
import {Button, ButtonBase, Grid, ImageList, Paper, TextField, Typography} from "@mui/material";
import logo from "./logo.jpg";


class ProductList extends React.Component{
    initialState = {
        items : []
    }

    state = this.initialState

    componentDidMount() {
        axios.get("http://localhost:8000/getAllItems").then(res => this.setState({items : res.data}))
    }

    parseItems(item){
        return(
            <Grid item xs = {12} margin={"5px"} style={{background : 'ghostwhite' , borderRadius : '25px' , padding : "20px 20px 20px 500px" , minHeight : '350px' , minWidth : '200px' , justifyItems : "centre"}}>
        <Grid item>
          <ButtonBase href="/#">
            <img alt="complex" style={{ width: 128, height: 128 }} src={item.image_link} />
          </ButtonBase>
        </Grid>
        <Grid xs={12} sm container>
          <Grid item container spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h6" component="div">
                  {item.name}
              </Typography>
              <Typography variant="subtitle1">
                  {item.weight === null ? `Volume : ${item.volume} Litre` : `Weight : ${item.weight} KG`}
              </Typography>
                <Typography variant="subtitle1">
                  {item.desc.length <= 100 ? item.desc : item.desc.slice(0 , 98) + "..."}
              </Typography>
                <Typography variant="body2" color="text.secondary">
                  Item Id : #{item.id}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h6" component="div">
                Rs. {item.price.toFixed(2)} <br/> {item.stock <= 5 ? "Hurry UP! Stock is low!!!" : `Stock : ${item.stock} units`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
        )
    }

    render() {
        return(
            <Paper
            sx={{
                p: 2,
                margin: 'auto',
                flexGrow: 1,
                backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                display : "flex"
            }}>
                <div>
                    <div className ="navbar">
                        <img src={logo} className={"logo"}/>
                            <ul>
                                <TextField fullWidth margin={"dense"} placeholder={"Search"} variant='outlined'/><span></span>
                            </ul>
                    </div>
                    <Grid container padding={"20px 20px 20px 20px"}>
                        {this.state.items.map(this.parseItems)}
                    </Grid>
                    </div>
                </Paper>

        )
    }

}

export default ProductList