import React, { useState } from 'react';

export default function UserPanel(props) {
  const signout = () => {
    props.logout();
  };

  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState(props.username);

  const toggleEditMode = () => {
    if (!editMode) {
      setEditMode(true);
    }
    if (editMode) {
      if (document.querySelector('input').value !== username) {
        setUsername(document.querySelector('input').value);
        props.editUser(document.querySelector('input').value);
      }
      setEditMode(false);
    }
  };

  return (
    <div id='userPanel'>
      {!editMode && <span onDoubleClick={toggleEditMode}>{username}</span>}
      {editMode && (
        <input
          onKeyDown={(event) => {
            if (event.code === 'Enter') toggleEditMode();
          }}
          autoFocus={true}
          type='text'
          defaultValue={username}
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
