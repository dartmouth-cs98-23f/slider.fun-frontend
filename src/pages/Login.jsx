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
        <div>
          <p> Forgot your password? </p>
          <p> not a member yet? sign up</p>
        </div>
      </div>

    </div>
  )
}

export default Login