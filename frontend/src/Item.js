import React from "react";
import axios from "axios";


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

    }


}