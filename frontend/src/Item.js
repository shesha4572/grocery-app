import React from "react";
import axios from "axios";
import logo from "./logo.jpg";


class ItemDisplay extends React.Component{
    initialState = {
        item : {
            id : 0,
            name : "",
            desc : "",
            image_link : "",
            volume : '',
            weight : "",
            price : 0,
            stock : 0
        }
    }

    state = this.initialState
    componentDidMount() {
      axios.get('http://localhost:8000/getItem/1').then(ref=>{this.setState({item:ref.data.item})
      console.log(this.state.item)})
    }
    render() {
        return(
            <div>
                <div className ="navbar">
                      <img src={logo} className={"logo"}/>
                      <ul>
                          <li><a href="#">Home</a></li>
                          <li><a href="#">Contact Us</a>
                          </li>
                      </ul>
                  </div>

          </div>
        )
    }


}
export default ItemDisplay;