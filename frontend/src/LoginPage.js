import './LoginPage.css';
import axios from "axios";
import React from "react";
import {Button, Input, TextField} from "@mui/material";

class LoginPage extends React.Component {

    initialState = {
        User: {
            username: "",
            email: "",
            full_name: "",
            disabled: false
        },

        jwt: {
            access_token: "",
            token_type: ""
        }
    }

    state = this.initialState


    render() {
        return (
            <form id="login-form">
                <div className="form-inner">
                    <h2>Login</h2>

                    <div className="form-group">
                        <label htmlFor="username">Email:</label>
                        <Input type="text" name="username" id="username"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <Input type="password" name="password" id="password"/>
                    </div>
                    <Button value="LOGIN" id="submitButton" onClick={this.LoginSubmit}> LOGIN </Button>
                </div>
            </form>
        )
    }

    LoginSubmit = async() => {
        axios.post("http://localhost:8000/token", new FormData(document.getElementById("login-form"))).then(res => {
            this.setState({jwt: res.data})
            return axios.get("http://localhost:8000/users/me", {headers: {"Authorization": `Bearer ${res.data.access_token}`}})
        }).then(res => this.setState({User: res.data}))
    }
}
export default LoginPage