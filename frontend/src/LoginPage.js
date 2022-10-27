
import './LoginPage.css';
import axios from "axios";
import React,{useState} from "react";
import LoginForms from "./LoginForms";
import {Button , Autocomplete} from "@mui/material";

function LoginPage() {
  const [user,setUser]=useState({});
  const [error,setError]=useState("");
  const [jwt , setJwt] = useState({})
    var bolDisp = false
  const Login=details=>{
      axios.post("http://localhost:8000/token" , details).then((res) => setJwt(res.data["access_token"]))
      console.log(jwt)
 }
  console.log(jwt)
      console.log("Bearer " + jwt)
      const headers = { Authorization: `Bearer ${jwt}` };
      console.log(headers)
      axios.get("http://localhost:8000/users/me" , {headers : {"Authorization" : `Bearer ${jwt}`}}).then((res) => setUser(res.data))
    bolDisp = true


  const Logout=()=>{
    setUser({name:"",email:""});

  }
  return (
    <div className="App">
      {(bolDisp == '')?(
          <div className="welcome">
            <h2>Welcome ,<span>{user.full_name}</span></h2>
            <button onClick={Logout}>Logout</button>
          </div>
      ):(
        <LoginForms Login={Login} error={error}/>
      )}
    </div>
  );
}

export default LoginPage;
