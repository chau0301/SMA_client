import React, {useState} from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import {useDispatch, useSelector} from 'react-redux'
import { logIn, signUp } from "../../actions/AuthAction";


const Auth = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.authReducer.loading)
  const [isSignUp, setIsSignUp] = useState(false)
  const [data, setData] = useState({firstname: "", lastname: "", username: "", password: "", confirmpass: ""})
  const handleChange = (event) => {
    setData({...data, [event.target.name]: event.target.value})
  }
  const [confirmPass, setConfirmPass] = useState(true)
  const handleSubmit = (event) => {
    event.preventDefault()
    if (isSignUp) {
      data.confirmpass === data.password ? dispatch(signUp(data)) : setConfirmPass(false)
    }
    else {
      dispatch(logIn(data))
    }
  }
  const resetForm = () =>  {
    setConfirmPass(true)
    setData({firstname: "", lastname: "", username: "", password: "", confirmpass: ""})
  }
  return (
    <div className="Auth">
      <div className="a-left">
        {/* <img src={Logo} alt="" /> */}
        <div className="Webname">
          <h1>Social Media</h1>
          <h6>Chaau's social media web</h6>
        </div>
      </div>

      {/* Right side */}
    <div className="a-right">
      <form className="infoForm authForm" onSubmit={handleSubmit}>
        <h3>{isSignUp ? "Sign up" : "Login" }</h3>
      {isSignUp 
        ? (<div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstname"
            onChange={handleChange}
            value= {data.firstname}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastname"
            onChange={handleChange}
            value= {data.lastname}
          />
        </div>) : ("")}
        

        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value= {data.username}
          />
        </div>

        <div>
          <input
            type="password"
            className="infoInput"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value= {data.password}
          />
          {isSignUp 
          ? (<input
            type="password"
            className="infoInput"
            name="confirmpass"
            placeholder="Confirm Password"
            onChange={handleChange}
            value= {data.confirmpass}
          />) : ("")}
        </div>
        {isSignUp ? (<span style={{display: confirmPass ? "none" : "block", color: 'red', fontSize: '12px', alignSelf: "flex-end",marginRight: "5px"}}>*Confirm Password is not same</span>)
        : ""}

        <div>
            <span class="span-change" onClick={() => {
              resetForm()
              setIsSignUp((prev) => !prev)
              }}>
            {isSignUp ? "Already have an account. Login!" : "Don't have an account? Sign up"}</span>
        </div>
        <button className="button infoButton" type="submit" disabled={loading}>
          {loading ? "Loading..." : (isSignUp ? "Sign Up" : "Login")}
          </button>
      </form>
    </div>
      
    </div>
  );
};

export default Auth;
