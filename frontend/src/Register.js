import React, { useState } from "react";
import "./Register.css"

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [userid, setUserid] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [gender, setGender] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h2>Registration page</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input value={name} name="name" id="name" placeholder="Enter your name here" />
            <br></br>
            <label htmlFor="contact">Contact:</label>
            <input value={contact} name="contact" id="contact" placeholder="Enter your Contact no. here" />
            <br></br>
            <label htmlFor="gender">Gender:</label>
            <input value={gender} name="gender" id="gender" placeholder="Enter your gender here" />
            <br></br>
            <label htmlFor="email">Email-ID:</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="Enter your email-id here" id="email" name="email" />
		    <br></br>
         	<label htmlFor="userid">User-id:</label>
         	<input value={userid} onChange={(e) => setUserid(e.target.value)}type="userid" placeholder="Enter your user-id here" id="userid" name="userid" />
            <br></br>
            <label htmlFor="password">Password:</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Enter your password" id="password" name="password" />
            <br></br>
            <button type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}
