import React  from "react";
import axios from "axios";
import {Button, ButtonBase, Grid, Typography} from "@mui/material";


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
            <Grid item xs={4} minWidth={0} minHeight={100} margin={"5px"} style={{background : 'lightblue' , borderRadius : '25px'}}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <img alt="complex" style={{ width: 128, height: 128 }} src={item.image_link} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                  {item.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                  {item.weight === null ? `Volume : ${item.volume} Litre` : `Weight : ${item.weight} KG`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                  {item.desc}
              </Typography>
                <Typography variant="body2" color="text.secondary">
                  Item Id : #{item.id}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
                Rs.{item.price}
            </Typography>
          </Grid>
        </Grid>
                <Button variant="contained" color={"primary"}>Add to Cart</Button>
      </Grid>
        )
    }

    render() {
        return(
            <Grid container spacing={{ xs: 5, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {this.state.items.map(this.parseItems)}
            </Grid>
        )
    }

}

export default ProductList