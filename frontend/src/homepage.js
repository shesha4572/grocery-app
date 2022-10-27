import React , {Component} from "react";
import "./homepage.css"
import logo from "./logo.jpg"
import {Link , Button} from "@mui/material";


class Homepage extends React.Component{

    render() {
        return (
            <div>
                <div className = "banner">
                    <div className ="navbar">
                        <img src={logo} className={"logo"}/>
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Contact Us</a>
                                </li>
                            </ul>
                    </div>
                    <div className="content">
                        <h1>GROCERY STORE</h1>
                        <p>For the person who loves grocery;</p>
                            <p>One stop destination for all your needs</p>
                            <p>Just (Name)!</p>
                        <div>
                            <Link href = {"/register"}><button id = "signUpButton"><span></span>SIGN UP</button></Link>
                            <Link href = {"/login"}><button id = "loginButton">LOGIN<span></span></button></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Homepage