import React, { useState } from "react";
import "./Register.css"
import {
    Grid,
    Paper,
    Avatar,
    Typography,
    TypographyVariant,
    Button,
    NativeSelect,
    FormGroup,
    Checkbox,
    TextField, InputLabel, FormControl
} from "@mui/material";


export const Register=()=> {
    const styles = {
        paperContainer: {
            padding: '30px 20px', width: 300, margin: "20px auto"
        }
    };
    const Headerstyle = {margin: 0}
    const backstyle = {backgroundColor: 'green'}
    const marginTop={marginTop:7}
        return (

            <Grid>
                <Paper elevation={20} style={styles.paperContainer}>
                    <Grid align="center">
                        <Avatar style={backstyle}>

                        </Avatar>
                        <h2 style={Headerstyle}>Sign Up</h2>
                        <Typography variant="caption" component="h1">Please fill this from to create an
                            account!</Typography>
                    </Grid>
                    <form>
                        <TextField fullWidth label='Name' placeholder="Enter your name" variant='standard'/>
                        <TextField fullWidth label='Email' placeholder="Enter your email" variant='standard'/>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Gender
                            </InputLabel>
                            <NativeSelect
                                inputProps={{
                                    name: 'Gender',
                                    id: 'uncontrolled-native',
                                }}
                            >
                                <option value={10}>Male</option>
                                <option value={20}>Female</option>
                            </NativeSelect>
                        </FormControl>
                        <TextField fullWidth label='Phone Number' placeholder="Enter your phone number"
                                   variant='standard'/>
                        <TextField fullWidth label='Password' placeholder="Enter your password" variant='standard'/>
                        <TextField fullWidth label='Confirm Password' placeholder="Please confirm your password"
                                   variant='standard'/>
                        <Button type='submit' variant='contained' style={marginTop} color='primary'>Sign Up</Button>
                    </form>
                </Paper>
            </Grid>

        )
}

