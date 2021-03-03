import React, { useState } from 'react';
import { loginUSer, registerUser } from '../http/auth.service';
import './AuthPage.css';

export default function AuthPage(props) {
  const [showOkay, setShowOkay] = useState(false);
  const [succesMessage, setSuccessMessage] = useState('success');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('error');
  const closeModal = () => {
    setShowOkay(false);
    setShowError(false);
  };

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const signUp = async () => {
    if (username && password) {
      try {
        const response = await registerUser(username, password);
        if (!response.token && response.message) {
          setErrorMessage(response.message);
          setShowError(true);
        }
        if (response.token) {
          document.querySelector('form').reset()
          setSuccessMessage(response.message);
          setShowOkay(true);
        }
      } catch (e) {
        setErrorMessage(e.message);
        setShowError(true);
      }
    }
  };

  const signIn = async () => {
    if (username && password) {
      try {
        const response = await loginUSer(username, password);
        if (response.message) {
          setErrorMessage(response.message);
          setShowError(true);
        } else {
          props.updateUser(response);
        }
      } catch (e) {
        setErrorMessage(e.message);
        setShowError(true);
      }
    }
  };

  return (
    <form id='authForm' onSubmit={(e) => e.preventDefault()}>
      {showError && (
        <div className='ErrorModal'>
          <div className='errorBody'>
            <h1>Error</h1>
            <p>{errorMessage}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      {showOkay && (
        <div className='SuccesModal'>
          <div className='successBody'>
            <h1>Succes</h1>
            <p>{succesMessage}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      <h2>authorization</h2>
      <input
        autoComplete='off'
        onChange={(event) => setUsername(event.target.value)}
        placeholder='Username'
        type='text'
        id='username'
        required={true}
      />
      <input
        autoComplete='off'
        onChange={(event) => setPassword(event.target.value)}
        placeholder='Password'
        type='password'
        id='password'
        required={true}
      />
      <div>
        <button id='signIn' onClick={signIn}>
          Sign In
        </button>
        <button id='signUp' onClick={signUp}>
          Sign up
        </button>
      </div>
    </form>
  );
}
