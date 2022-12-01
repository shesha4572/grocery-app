import React, { useState } from "react";
import "./Register.css"
import {
    Grid,
    Paper,
    Avatar,
    Typography,
    Button,
    NativeSelect,
    TextField, InputLabel, FormControl
} from "@mui/material";
import axios from "axios";
import {Navigate, useNavigate} from "react-router-dom";

export const Register=()=> {
    const bstyles = {
        paperContainer: {
            backgroundSize: 'cover',
            backgroundPosition: 'cover',
            width:'100%',
            height:'77vh',
        }
    };
    const navigator = useNavigate()
    const Headerstyle = {marginTop:0}
    const backstyle = {backgroundColor: 'green'}
    const paperstyle = {padding:35,height:'55vh',width:300,margin:"20px auto",borderRadius:'25px',backgroundColor:'rgba(217, 235, 238, 0.57)'};
    function handleSubmit(){
        let password=document.getElementById("password").value;
        let cPassword=document.getElementById("cnfrm-password").value;
        const form = new FormData()
        form.set("username" , username)
        form.set("email" , email)
        form.set("password" , password)
        form.set("gender" , gender)
        form.set("full_name" , Name)
        let message=document.getElementById("message");
        if(password.length!==0){
            if(password===cPassword){
                message.textContent="";
                axios.post("http://localhost:8000/createUser/" , form).then(res => {if(res.status === 200){alert("Sign Up Successful. Redirecting To Login"); navigator("/login")}})
            }
            else{
                message.textContent="Passwords don't match";
                message.style.backgroundColor="#ff4d4d";
            }
        }
        else{
            alert("Password can't be empty!");
            message.textContent="";
        }

    }

    const [confirmPass , setConfirmPass] = useState("")
    const [Name , setName] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [gender , setGender] = useState("M")
    const [username , setUsername] = useState("")
    return (
        <div className={'SignUp'}>
        <Grid  style={bstyles.paperContainer}>
            <Paper elevation={20} style={paperstyle}>
                <Grid align="center">
                    <Avatar style={backstyle}>

                    </Avatar>
                    <h2 style={Headerstyle}>Sign Up</h2>
                    <Typography variant="caption" component="h1">Please fill this from to create an
                        account!</Typography>
                </Grid>
                <form>
                    <TextField fullWidth label='Name' placeholder="Enter your name" variant='standard' onChange={e => setName(e.target.value)}/>
                    <TextField fullWidth label='Email'style={{padding:'4px'}} placeholder="Enter your email" variant='standard' onChange={e => setEmail(e.target.value)}/>
                    <FormControl fullWidth style={{padding:'4px'}}>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Gender
                        </InputLabel>
                        <NativeSelect
                            inputProps={{
                                name: 'Gender',
                                id: 'uncontrolled-native',
                            }}
                            onInput={e => setGender(e.target.value === "Male" ? "M" : "F")}
                        >
                            <option value={"Male"}>Male</option>
                            <option value={"Female"}>Female</option>
                        </NativeSelect>
                    </FormControl>
                    <TextField fullWidth label='Username'  style={{padding:'4px'}}placeholder="Enter your username"
                               variant='standard' onChange={e => setUsername(e.target.value)}/>
                    <TextField fullWidth id="password" label='Password' style={{padding:'4px'}} type={"password"} placeholder="Enter your password" variant='standard' onChange={e => setPassword(e.target.value)}/>
                    <TextField fullWidth id="cnfrm-password" label='Confirm Password'style={{padding:'4px'}} type={"password"} placeholder="Please confirm your password"
                               variant='standard' onChange={e => setConfirmPass(e.target.value)}/>
                    <p id={"message"}></p>
                    <Button variant='contained' style={{padding:'4px',marginTop:'8px',width:'50%',borderRadius:'25px',fontWeight:'600'}} color='primary' onClick={handleSubmit}>Sign Up</Button>
                </form>
            </Paper>
        </Grid>
        </div>


    )
}

