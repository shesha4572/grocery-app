import React,{useState} from 'react'
function LoginForms({Login,error}){
    const [details,setDetails]=useState({email:"",password:""});
    const submitHandler =e=>{
        e.preventDefault();
        Login(new FormData(document.getElementById("user-form")));
    }
    return(
        <form id = "user-form" onSubmit={submitHandler}>
            <div className="form-inner">
              <h2>Login</h2>
                {(error!=="")?(<div className="error">{error}</div>):""}

                <div className="form-group">
                    <label htmlFor="username">Email:</label>
                    <input type="text" name="username" id="username"onChange={e=>setDetails({...details,email:e.target.value})}value={details.email}/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" onChange={e=>setDetails({...details,password:e.target.value})}value={details.password}/>
                </div>
                <input type="submit" value="LOGIN"/>
            </div>
        </form>
    )
}
export default LoginForms;