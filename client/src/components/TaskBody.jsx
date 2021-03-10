import React, { useState, useRef } from 'react';
import './taskbody.css';

export default function TaskBody(props) {
  const [editTitle, setEditTitle] = useState(false);
  const [taskBodyTitle, setTaskBodyTitle] = useState(props.taskTitle);

  const [editText, setEditText] = useState(false);
  const [taskBodyText, setTaskBodyText] = useState(props.taskBody);

  const taskBody = useRef();

  const closeBody = () => {
    taskBody.current.classList.add('closing');
    setTimeout(() => props.closeBody(false), 500);
  };

  // edit title
  const toggleEditTitle = (e) => {
    if (!editTitle) {
      setEditTitle(true);
    } else {
      deactivateEditTitle(e.target.previousSibling);
    }
  };
  const deactivateEditTitle = async (e) => {
    setEditTitle(false);
    if (e.value.replace(/[' ']{1,}/, '') !== '') {
      if (e.value !== taskBodyTitle) {
        await props.editTitle(props.id, e.value);
        setTaskBodyTitle(e.value);
        props.editStateTitle(e.value);
      }
    }
  };

  // edit body
  const toggleEditText = (e) => {
    if (!editText) {
      setEditText(true);
    } else {
      deactivateEditText(e.target.previousSibling);
    }
  };
  const deactivateEditText = async (e) => {
    setEditText(false);
    if (e.value.replace(/[' ']{1,}/, '') !== '') {
      if (e.value !== taskBodyText) {
        await props.editTaskBody(props.id, e.value);
        setTaskBodyText(e.value);
        props.editStateText(e.value);
      }
    }
  };

  return (
    <div ref={taskBody} className='TaskBody'>
      <div className='body'>
        <p className='title'>
          {editTitle && (
            <input
              autoFocus={true}
              type='text'
              defaultValue={taskBodyTitle}
              onKeyDown={(event) => {
                if (event.code === 'Enter') deactivateEditTitle(event.target);
              }}
            />
          )}
          {!editTitle && taskBodyTitle}
          <button onClick={(e) => toggleEditTitle(e)}>edit title</button>
        </p>
        <div>
          {editText && (
            <textarea autoFocus={true} defaultValue={taskBodyText} />
          )}
          {!editText && (
            <p className='text'>
              {taskBodyText && taskBodyText}
              {!taskBodyText && 'No Task Body'}
            </p>
          )}
          <button onClick={toggleEditText}>edit text</button>
        </div>
        <button onClick={closeBody}>Close</button>
      </div>
    </div>
  );
}
