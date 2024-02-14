import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import "../styles/login.scss"
import domainLogo from "../assets/domain_logo.svg"
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn } = useContext(AuthContext);
  const [err, setErr] = useState(null)
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  console.log(token)

  // useEffect(() => {
  //   // console.log("login page", token)
  //   if (token !== null) {
  //     console.log("login page", token)
  //     // navigate("/profile");
  //   }
  // }, [navigate, token])
  // Effect hook to reset error state after 3 seconds

  useEffect(() => {
    let timer;
    if (err !== null) {
      // Set a timer to reset error after 3 seconds
      timer = setTimeout(() => {
        setErr(null);
      }, 3000);
    }

    // Cleanup function to clear the timer if the component unmounts
    // or if the error changes before the timer completes.
    return () => clearTimeout(timer);
  }, [err]); // Dependency array includes err to react to its changes


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      console.log("navgating to profile")
      navigate("/profile");
    } catch (error) {
      setErr(error.response.data.error)
      console.error('Error signing in:', error);
      // throw error
    }
  }

  const login = () => {
    return (
      <div className='formContainer'>
        <form onSubmit={handleLogin}>

          <img src={domainLogo} alt=""></img>
          <input placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />

          <input placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button>login</button>

        </form>
        <div className='helperContainer'>
          {err && <p> {err} </p>}
          <p className='b1'> Forgot your password? </p>
          <p> not a member yet? <button className='helperButton' onClick={() => navigate("/signup")}> sign up </button> </p>
        </div>
      </div >
    )
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
      {login()}

    </div>
  )
}


export default Login