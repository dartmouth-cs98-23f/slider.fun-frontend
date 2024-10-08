import React, { useState } from 'react'
import domainLogo from "../assets/domain_logo.svg"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userSignUp } from '../actions/userAction';
import "../styles/login.scss"

const SignUpForm = ({ logoVisible }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.info)
  const navigate = useNavigate();
  const [err, setErr] = useState(null)


  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password === passwordConfirm) {


      try {
        await dispatch(userSignUp(email, name, password, (userInfo.sliderScore || 0)));

        navigate("/profile");
      } catch (error) {
        setErr(error.response.data.error)
        console.error('Error signing in:', error);
      }
    } else {
      setErr("Passwords do not match")
    }

  }

  return (
    <div className='formContainer'>
      <form onSubmit={handleSignUp}>
        {logoVisible ? <img src={domainLogo} onClick={() => navigate("/community")} alt=""></img> :
          <div>
            <h1> Join the Slider.Fun community!</h1>
            <p> Join today and start earning slider points and upload your own photos.</p>
          </div>}
        <input placeholder='email' onChange={(e) => setEmail(e.target.value)} />
        <input placeholder='username' onChange={(e) => setName(e.target.value)} />
        <input placeholder='password' type="password" autoComplete="off" onChange={(e) => setPassword(e.target.value)} />
        <input placeholder='password again' type="password" autoComplete="off" onChange={(e) => setPasswordConfirm(e.target.value)} />
        <button>sign up</button>

      </form>
      <div className='helperContainer'>
        {err && <p> {err} </p>}
        {/* <p className='b1'> Forgot your password? </p> */}
        <p> already have an account? <button className="helperButton" onClick={() => navigate("/login")}> sign in </button> </p>
      </div>
    </div>
  )
}

export default SignUpForm