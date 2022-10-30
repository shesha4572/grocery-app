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


export const Register=()=> {
    const styles = {
        paperContainer: {
            padding: '30px 20px', width: 300, margin: "auto",borderRadius:'25px'
        }
    };
    const bstyles = {
        paperContainer: {
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width:'100%',
            height:'100vh',
            backgroundImage:'url("https://imageio.forbes.com/specials-images/imageserve/5f8ceed2e11880c542eca6b1/0x0.jpg?format=jpg&width=1200")'
        }
    };

    const Headerstyle = {margin: 0}
    const backstyle = {backgroundColor: 'green'}
    const marginTop={marginTop:7}

    function handleSubmit(){
        const form = new FormData()
        form.set("username" , username)
        form.set("email" , email)
        form.set("password" , password)
        form.set("gender" , gender)
        form.set("full_name" , Name)
        axios.post("http://localhost:8000/createUser/" , form).then(res => console.log(res.data))
        console.log(Name , email , password , confirmPass , username , gender)
    }

    const [confirmPass , setConfirmPass] = useState("")
    const [Name , setName] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [gender , setGender] = useState("M")
    const [username , setUsername] = useState("")


    return (

            <Grid  style={bstyles.paperContainer}>
                <Paper elevation={20} style={styles.paperContainer}>
                    <Grid align="center">
                        <Avatar style={backstyle}>

                        </Avatar>
                        <h2 style={Headerstyle}>Sign Up</h2>
                        <Typography variant="caption" component="h1">Please fill this from to create an
                            account!</Typography>
                    </Grid>
                    <form>
                        <TextField fullWidth label='Name' placeholder="Enter your name" variant='standard' onChange={e => setName(e.target.value)}/>
                        <TextField fullWidth label='Email' placeholder="Enter your email" variant='standard' onChange={e => setEmail(e.target.value)}/>
                        <FormControl fullWidth>
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
                        <TextField fullWidth label='Username' placeholder="Enter your username"
                                   variant='standard' onChange={e => setUsername(e.target.value)}/>
                        <TextField fullWidth label='Password' placeholder="Enter your password" variant='standard' onChange={e => setPassword(e.target.value)}/>
                        <TextField fullWidth label='Confirm Password' placeholder="Please confirm your password"
                                   variant='standard' onChange={e => setConfirmPass(e.target.value)}/>
                        <Button variant='contained' style={marginTop} color='primary' onClick={handleSubmit}>Sign Up</Button>
                    </form>
                </Paper>
            </Grid>

        )
}

