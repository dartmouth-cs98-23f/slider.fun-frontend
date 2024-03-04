import React, { useEffect, useState } from 'react'
import "../styles/login.scss"
import domainLogo from "../assets/domain_logo.svg"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userSignIn } from '../actions/userAction';


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(null)
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("login page", token)
    if (token !== null) {

      navigate("/profile");
    }
  }, [navigate, token])
  // Effect hook to reset error state after 3 seconds

  useEffect(() => {
    let timer;
    if (err !== null) {
      // Set a timer to reset error after 3 seconds
      timer = setTimeout(() => {
        setErr(null);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [err]); // Dependency array includes err to react to its changes


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(userSignIn(email, password))
      navigate("/profile");
    } catch (error) {
      setErr(error.response.data.error)
      console.error('Error signing in:', error);
      // throw error
    }
  }

  const login = () => {
    return (
      <div className="signUpModal">
        <div className='formContainer'>
          <form onSubmit={handleLogin}>

            <img src={domainLogo} onClick={() => navigate("/community")} alt=""></img>
            <input placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />

            <input placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button>login</button>

          </form>
          <div className='helperContainer'>
            {err && <p> {err} </p>}
            <p> not a member yet?<button className='helperButton' onClick={() => navigate("/signup")}> sign up </button> </p>
          </div>
        </div >
      </div>
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