import React, { useState } from 'react';

export default function UserPanel(props) {
  const signout = () => {
    props.signOut(false);
    props.clearUser({ id: 0, username: '', password: '', type: '' });
  };

  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState(props.username);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  const deactivateEditMode = (e) => {
    props.editUser(username)
    setEditMode(false)
  };

  return (
    <div id='userPanel'>
      {!editMode && (
        <span onDoubleClick={toggleEditMode}>
          {username}
        </span>
      )}
      {editMode && (
        <input
          onKeyDown={(event) => {
            if (event.code === 'Enter') deactivateEditMode(event);
          }}
          autoFocus={true}
          onBlur={(event) => deactivateEditMode(event)}
          type='text'
          defaultValue={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      )}
      <div className='buttons'>
        <button onClick={toggleEditMode}>Change name</button>
        <button onClick={signout}>Sign Out</button>
        <button onClick={props.deleteUser}>Delete User</button>
      </div>
    </div>
  );
}
