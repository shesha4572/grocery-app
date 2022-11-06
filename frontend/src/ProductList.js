import React  from "react";
import axios from "axios";
import {Box, Button, ButtonBase, Grid, ImageList, Paper, TextField, Typography} from "@mui/material";
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
        if(item.stock <= 0){
            return ;
        }
        return(
            <Grid item container xs = {12} margin={"5px"} style={{borderRadius : '25px' , padding : "20px 20px 20px 20px" , minHeight : '350px' , minWidth : '200px' , paddingLeft : "200px"}}>
        <Grid item sx = {{paddingRight : "150px"}}>
          <ButtonBase href="/#">
            <img alt="complex" style={{ width: 256, height: 256 }} src={item.image_link} />
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
            <Typography variant="h6" component="div" sx={item.stock <= 5 ?{textColor:'red'}:{textColor: 'green'}}>
               <b> Rs. {item.price.toFixed(2)} <br/> {item.stock <= 5 ? "Hurry UP! Stock is low!!!" : `In Stock`} </b>
            </Typography>
          </Grid>
            <Box sx={{width:'100%',borderBottom:1}}/>
        </Grid>
      </Grid>
        )
    }

    render() {
        return(
                <div style={{
                    border: '10px solid rgba(100, 100, 100, 0.05)',
                }
                }>
                    <div className ="navbar">
                        <img src={logo} className={"logo"}/>
                         <TextField fullWidth margin={"dense"} placeholder={"Search"} variant='outlined'/>
                    </div>
                    <Grid container padding={"20px 20px 20px 20px"} style={{border: '10px solid rgba(100, 100, 100, 0.05)'}}>
                        {this.state.items.map(this.parseItems)}
                    </Grid>
                    <hr/>
                    </div>

        )
    }

}

export default ProductList