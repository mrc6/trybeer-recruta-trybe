import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import RegisterUserAPI from '../services/UserRegisterService';
import './CSS/Register.css';

const createUserAPI = async (name, email, password, role, street, number, city, district) => {
  return await RegisterUserAPI(name, email, password, role, street, number, city, district)
    .then((data) => data)
    .catch((error) => error);
};

const UserRegisterForm = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [check, setCheck] = useState(false);
  const [nameWarning, setNameWarning] = useState('');
  const [emailWarning, setEmailWarning] = useState('');
  const [passwordWarning, setPasswordWarning] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [backendResponse, setBackendResponse] = useState('');
  const [redirectTo, setRedirectTo] = useState('');
  const [street, setStreet] = useState('');
  const [district, setDistrict] = useState('');
  const [number, setNumber] = useState('');
  const [city, setCity] = useState('');
  const [cep, setCep] = useState('');
  const [cepMessage, setCepMessage] = useState(false);
  let role = 'client';

  useEffect(() => {
    if (check) {
      role = 'administrator';
    } else {
      role = 'client';
    }
  }, [check]);

  useEffect(() => {
    // habilita botao
    let inputsAreFilled = false;
    if (name && email && password) inputsAreFilled = true;
    let inputsAreValids = false;
    if (!nameWarning && !emailWarning && !passwordWarning) inputsAreValids = true;
    if (inputsAreFilled && inputsAreValids) setShowButton(true);
    if (!(inputsAreFilled && inputsAreValids)) setShowButton(false);
  }, [nameWarning, emailWarning, passwordWarning]);

  useEffect(() => {
    // Valida as entradas
    if (name) {
      // Ref. https://stackoverflow.com/questions/4745112/javascript-regex-for-alphanumeric-string-with-length-of-3-5-chars
      const nameVerify = new RegExp(/^([a-zA-Z\s]){12,100}$/);
      if (!nameVerify.test(name)) {
        setNameWarning('O nome deve conter 12 caracters e apenas letras');
      }
      if (nameVerify.test(name)) {
        setNameWarning('');
      }
    }
    if (!name) {
      setNameWarning('');
    }
    if (email) {
      // Ref. Regex email obtida em https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
      const emailVerify = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
      if (!emailVerify.test(email)) {
        setEmailWarning('Digite um email válido');
      }
      if (emailVerify.test(email)) {
        setEmailWarning('');
      }
    }
    if (!email) {
      setEmailWarning('');
    }
    if (password) {
      // Regex criada por mim mesmo
      const passwordVerify = new RegExp(/([0-9]){6,50}$/);
      if (!passwordVerify.test(password)) {
        setPasswordWarning('A senha deve conter apenas número e ter tamanho mínimo de 6 caracteres');
      }
      if (passwordVerify.test(password)) {
        setPasswordWarning('');
      }
    }
    if (!password) {
      setPasswordWarning('');
    }
  }, [name, email, password]);

  if (redirectTo) {
    return (<Redirect to={redirectTo} />);
  }

  const setAllAddress = (cep) => {
    Axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    .then(({ data: { logradouro, bairro, localidade } }) => {
        setDistrict(bairro);
        setStreet(logradouro);
        setCity(localidade);
        setCepMessage(false)
    })
    .catch(() => setCepMessage(true))
  }

  return (
    <div className="register-main">
      <h1>Cadastro</h1>
      <div className="fieldsetandspan">
        <fieldset>
          <label htmlFor="name">Nome</label>
          <input
            data-testid="signup-name" type="text" name="name"
            onChange={(e) => setName(e.target.value)}
            required={true}
          /><span>{nameWarning}</span>
          <label htmlFor="email">Email</label>
          <input
            data-testid="signup-email" type="email" name="email"
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          /><span>{emailWarning}</span>
          <label htmlFor="password">Password</label>
          <input
            data-testid="signup-password" type="password" name="password"
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          /><span>{passwordWarning}</span>
          <label htmlFor="cep">CEP</label>
          <input id="cep" onChange={(e) => setCep(e.target.value)} value={cep} />
          {cepMessage && <p>Informe um CEP válido!</p>}
          <button type="button" onClick={() => setAllAddress(cep)}>Buscer CEP</button>
          <label htmlFor="street">Rua</label>
          <input id="street" onChange={(e) => setStreet(e.target.value)} value={street} />
          <label htmlFor="number">Número</label>
          <input id="number" onChange={(e) => setNumber(e.target.value)} value={number} />
          <label htmlFor="district">Bairro</label>
          <input id="district" onChange={(e) => setDistrict(e.target.value)} value={district} />
          <label htmlFor="city">Cidade</label>
          <input id="city" onChange={(e) => setCity(e.target.value)} value={city} />
          <div className="center">
            <label htmlFor="vendor"><input
              data-testid="signup-seller" type="checkbox" name="vendor"
              checked={check} onChange={(e) => setCheck(e.target.checked)}
            />Quero Vender</label>
          </div>
          <button
            data-testid="signup-btn" type="submit"
            onClick={async () => {
              const result = await createUserAPI(name, email, password, role, street, number, city, district);
              if (result) {
                if (result.message) {
                  return setBackendResponse('E-mail already in database.');
                }
                if (role === 'administrator') {
                  return setRedirectTo('/admin/orders');
                }
                return setRedirectTo('/products');
              }
            }
            }
            disabled={!showButton}
          >Cadastrar</button>
        </fieldset>
        <div><span>{backendResponse}</span></div>
      </div>
    </div>
  );
};

export default UserRegisterForm;
