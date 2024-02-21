import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import "../styles/login.scss"
import domainLogo from "../assets/domain_logo.svg"
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUsername] = useState('')
  const [err, setErr] = useState(null)
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  console.log(token)

  useEffect(() => {
    // console.log("login page", token)
    if (token !== null) {
      console.log("sign up page", token)
      navigate("/profile");
    }
  }, [navigate, token])

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await signUp(email, userName, password);
      navigate("/profile");
    } catch (error) {
      setErr(error.response.data.error)
      console.error('Error signing in:', error);
      // throw error
    }

  }

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
        <form onSubmit={handleSignUp}>

          <img src={domainLogo} onClick={() => navigate("/community")} alt=""></img>
          <input placeholder='email' onChange={(e) => setEmail(e.target.value)} />

          <input placeholder='username' onChange={(e) => setUsername(e.target.value)} />

          <input placeholder='password' onChange={(e) => setPassword(e.target.value)} />

          <button>sign up</button>

        </form>
        <div className='helperContainer'>
          {err && <p> {err} </p>}
          {/* <p className='b1'> Forgot your password? </p> */}
          <p> already have an account? <button className="helperButton" onClick={() => navigate("/login")}> sign in </button> </p>
        </div>
      </div>

    </div>
  )
}


export default SignUp