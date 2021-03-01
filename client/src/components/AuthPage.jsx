import React, { useState, useEffect } from 'react';
import './AuthPage.css';

export default function AuthPage(props) {
  const [username, setUsername] = useState(props.user.username);
  const [password, setPassword] = useState(props.user.password);

  const authorization = (e) => {
    e.preventDefault();
    props.updateUser({
      id: props.user.id, 
      username: username,
      password: password,
      type: e.nativeEvent.submitter.id
    })
  };

  return (
    <form id='authForm' onSubmit={(event) => authorization(event)}>
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
        <button type='submit' id="signIn">Sign In</button>
        <button type='submit' id="signUp">Sign up</button>
      </div>
    </form>
  );
}
