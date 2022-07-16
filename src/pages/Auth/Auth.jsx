import React, {useState} from "react";
import "./Auth.css";
import {useDispatch, useSelector} from 'react-redux'
import { logIn, signUp, logOut } from "../../actions/AuthAction";

const Auth = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.authReducer.loading)
  const errorLogin = useSelector((state) => state.authReducer.error)
  const [isSignUp, setIsSignUp] = useState(false)
  let status = ""
  const [message, setMessage] = useState("")
  const [data, setData] = useState({firstname: "", lastname: "", username: "", password: "", confirmpass: ""})
  const handleChange = (event) => {
    setData({...data, [event.target.name]: event.target.value})
  }
  const [confirmPass, setConfirmPass] = useState(true)
  const passwordStatus = (pass, confirmPass) => {
    const minLength = 8
    const maxLength = 32
    const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,32}$/
    if (pass.length < minLength) return "TOO_SHORT"
    else if (pass.length > maxLength) return "TOO_LONG"
    else if (pass.indexOf(' ') !== -1) return "INCLUDE_SPACE"
    else if (pass.match(pattern) === null) return "NOT_VALID"
    else if (confirmPass !== pass) return "NOT_MATCH" 
    return "VALID" 
  }
  const passwordMessage = (status) => {
    switch (status) {
      case "TOO_SHORT":
        return "PASSWORD MUST AT LEAST 8 CHARACTERS"
      case "TOO_LONG":
        return "PASSWORD MAXIMUM 32 CHARACTERS"
      case "INCLUDE_SPACE":
        return "PASSWORD MUST NOT HAVE SPACE"
      case "NOT_VALID":
        return "Password must includes uppercase letter, number, symbol"
      case "NOT_MATCH":
        return "CONFIRM PASSWORD IS NOT MATCH"
      default:
        return "VALID"
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    if (isSignUp) {
      status = (passwordStatus(data.password, data.confirmpass))
      if (status === "VALID") {
          dispatch(signUp(data))
      } else {
        setConfirmPass(false)
        setMessage(passwordMessage(status))
      }
    }
    else {
      dispatch(logIn(data))
    }
  }

  const resetForm = () =>  {
    setConfirmPass(true)
    setData({firstname: "", lastname: "", username: "", password: "", confirmpass: ""})
  }

  window.onbeforeunload = () => {
    if (errorLogin) {
      dispatch(logOut())
    }
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
        {(!isSignUp && errorLogin) && (<span className="passFail">*Username/password is incorrect</span>)}
        
        {(isSignUp && !confirmPass)
          ? (<span className="passFail">*{message}</span>)
          : ""
        }

        <div>
            <span className="span-change" onClick={() => {
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
