import './LoginPage.css';
import axios from "axios";
import React from "react";
import a from "./a.png";
import {Button, Input, InputAdornment} from "@mui/material";
import {Cookies} from "react-cookie";
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import {Navigate} from "react-router-dom";
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
        },

        redirect : false
    }

    state = this.initialState

    render() {
        const bustyle = {
            width: 320,
            height: 50,
            borderRadius: '25px',
            backgroundColor: 'rgba(169,3,252,0.77)',
            color: 'white',
            fontsize: '35px',
            border: 'none'
        }
        const istyle = {
            width: '300',
            height: '50px',
            borderRadius: '60',
            border: 'none',
            outline: 'none',
            backgroundcolor: '#fff'
        }

        if(this.state.redirect){
            return <Navigate to={"/allItems"}/>
        }

        return (
            <div>
                <div className="main">
                    <div className="sub-main">
                        <div>
                            <div className="imgs">
                                <div className="container-image">
                                    <img src={a} alt="profile" className="profile"/>
                                </div>
                            </div>
                            <div>
                                <h1>Login Page</h1>
                                <form id={'login-form'}>
                                <div style={{marginTop: '20px'}}>
                                    <Input type="text" placeholder={'Enter a username'} startAdornment={
                                        <InputAdornment position="start">
                                            <PersonIcon></PersonIcon>
                                        </InputAdornment>
                                    }
                                           name="username" id="username"/>
                                </div>
                                <div className="second-input">
                                    <Input type="password" startAdornment={
                                        <InputAdornment position="start">
                                            <KeyIcon/>
                                        </InputAdornment>
                                    } placeholder={'Enter password'} style={istyle} name="password" id="password"/>
                                </div>
                                </form>
                                <div className="login-button">
                                    <Button value="LOGIN" style={bustyle} id="submitButton"
                                            onClick={this.LoginSubmit}> LOGIN </Button>
                                </div>
                                <p className="link" style={{marginTop: '15px'}}>
                                    <a href="#">Forgot Password ?</a> OR <a href="/register">Sign Up</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    LoginSubmit = async() => {
        const cookie = new Cookies();
            axios.post("http://localhost:8000/token", new FormData(document.getElementById("login-form")))
                .then(res => {
                    if (res.status === 200) {
                        this.setState({jwt: res.data})
                        cookie.set("jwt", res.data.access_token, {maxAge: 60 * 60})
                        cookie.set("cart", {})
                        return axios.get("http://localhost:8000/users/me", {headers: {"Authorization": `Bearer ${res.data.access_token}`}})
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        cookie.set("full_name", res.data.full_name, {maxAge: 60 * 60});
                        alert("Login Successful");
                        this.setState({User: res.data, redirect: true});
                        console.log(res.data);
                    }
                })
                .catch(error => {
                    if(error.response.status === 401){
                    alert("Username or password is Incorrect");
                    }

                    else if(error.response.status === 422){
                        alert("Please enter both username and password")
                    }
                })

        }
}

export default LoginPage