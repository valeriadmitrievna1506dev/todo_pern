import React, { useState } from 'react';
import { login, registrantion } from '../http/userApi';
import './AuthPage.css';

export default function AuthPage(props) {
  const [showError, setShowError] = useState(false);
  const [showOkay, setShowOkay] = useState(false);
  const [errorMessage, setErrorMessage] = useState('error');
  const closeModal = (e) => {
    setShowError(false);
  };

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const signUp = async () => {
    const response = await registrantion(username, password);
    if (response.message) {
      setErrorMessage(response.message);
      setShowError(true);
    } else props.updateUser(response);
  };

  const signIn = async () => {
    const response = await login(username, password);
    if (response.message) {
      setErrorMessage(response.message);
      setShowError(true);
    } else props.updateUser(response);
  };

  return (
    <form id='authForm' onSubmit={(e) => e.preventDefault()}>
      {showError && (
        <div className='ErrorModal'>
          <div className='errorBody'>
            <h1>Error</h1>
            <p>{errorMessage}</p>
            <button onClick={(e) => closeModal(e)}>Close</button>
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
      />
      <input
        autoComplete='off'
        onChange={(event) => setPassword(event.target.value)}
        placeholder='Password'
        type='password'
        id='password'
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
