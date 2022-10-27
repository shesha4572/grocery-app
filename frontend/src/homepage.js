import React, {Component} from "react";

class homepage extends Component{
    render() {
        return (
            <div>
                <div class = "banner">
                    <div class="navbar">
                        <img src="D:\Web Development Course\DBMS Mini-Project\logo.jpg" class="logo"/>
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Contact Us</a>
                                </li>
                            </ul>
                    </div>
                    <div class="content">
                        <h1>GROCERY STORE</h1>
                        <p>For the person who loves grocery;<br>One stop destination for all your needs</br><br>Just (Name)!</br></p>
                        <div>
                            <button type="button"><span></span>SIGN IN</button>
                            <button type="button">LOGIN<span></span></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}