import React from 'react'
import "../styles/login.scss"
import domainLogo from "../assets/domain_logo.svg"

const Login = () => {
  return (
    <div className='loginContainer'>
      <div className='formContainer'>
        <form>
          <img src={domainLogo} alt=""></img>
          <input placeholder='email' />

          <input placeholder='password' />
          <button>login</button>

        </form>
        <div className='helperContainer'>
          <p className='b1'> Forgot your password? </p>
          <p> not a member yet? <a href="./"> sign up </a> </p>
        </div>
      </div>

    </div>
  )
}

export default Login