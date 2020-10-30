import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './CSS/Login.css';
import trybe from '../img/trybe.png'
import beer from '../img/green-beer.png'

const doLogin = (password, email, setMessage, setRedirectToHome, setRedirectToAdminHome) => {
  // console.log('teste')
  axios.post('http://localhost:3001/login', { password, email })
    .then(({
      data: {
        token, name, email: _email, role,
      },
    }) => {
      // console.log(name)
      localStorage.setItem('user', JSON.stringify({
        token, name, email: _email, role,
      }));
      return (role === 'administrator') ? setRedirectToAdminHome(true) : setRedirectToHome(true);
    })
    .catch((err) => ((err.response) ? setMessage(err.response.data.message) : setMessage('Servidor desligado')));
  // axios.get('/teste').then((data) => {console.log(data)})
};

const verifyInput = (email, password, setDisabled) => {
  const minLenght = 4;
  const regex = /^\S+@\S+$/;
  // console.log(email, password)
  if ((email.match(regex)) && (password.length > minLenght)) { setDisabled(false); }
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [redirectToAdminHome, setRedirectToAdminHome] = useState(false);
  const [redirectToRegister, setRedirectToRegister] = useState(false);
  const [disabled, setDisabled] = useState(true);
  return (
    <div className="login-page">
      <div className="visible-area">
        <div className="logo"> <span>TR</span><img src={trybe} width="50px" /><span>BEER</span></div>
        <img className="beer" src={beer} width="200px" />
        <div className="login-form">
          <div>
            <p>Email</p>
            <input data-testid="email-input" onChange={(event) => { setEmail(event.target.value); verifyInput(email, password, setDisabled); }} value={email} />
          </div>
          <div>
            <p>Password</p>
            <input data-testid="password-input" type="password" onChange={(event) => { setPassword(event.target.value); verifyInput(email, password, setDisabled); }} value={password} />
          </div>
          {(message) && <p>{message}</p>}
          <div className="login-btn">
            <button disabled={disabled} data-testid="signin-btn" onClick={() => doLogin(password, email, setMessage, setRedirectToHome, setRedirectToAdminHome)} type="button">ENTRAR</button>
            <button onClick={() => setRedirectToRegister(true)} data-testid="no-account-btn" type="button">Ainda não tenho conta</button>
          </div>
          {redirectToHome && <Redirect to="/products" />}
          {redirectToAdminHome && <Redirect to="/admin/orders" />}
          {redirectToRegister && <Redirect to="/register" />}
        </div>
      </div>
    </div>
  );
}

export default Login;
