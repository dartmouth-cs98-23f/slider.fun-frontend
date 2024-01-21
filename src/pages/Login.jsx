import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import "../styles/login.scss"
import domainLogo from "../assets/domain_logo.svg"
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('sliderdotfun@gmail.com')
  const [password, setPassword] = useState('sliderAdmin')
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  console.log(token)

  useEffect(() => {
    // console.log("login page", token)
    if (token !== null) {
      console.log("login page", token)
      // navigate("/profile");
    }
  }, [navigate, token])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);

    } catch (error) {
      console.error('Error signing in:', error);
      throw error
    }

    navigate("/profile");
  }

  return (
    <div className='loginContainer'>
      <video
        autoPlay
        loop
        muted
        playsInline
        id="video"
        preload="auto"
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: '.8' }}
      >
        <source src="https://firebasestorage.googleapis.com/v0/b/sliderdotfun-3af7a.appspot.com/o/videos%2Fseq.mov?alt=media&token=fe8d69fb-7bf0-405f-bacb-ae38a5059d37" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className='formContainer'>
        <form onSubmit={handleLogin}>

          <img src={domainLogo} alt=""></img>
          <input placeholder='email' onChange={(e) => setEmail(e.target.value)} />

          <input placeholder='password' onChange={(e) => setPassword(e.target.value)} />
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