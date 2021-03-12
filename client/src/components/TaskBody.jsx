import React, { useState, useRef } from 'react';
import './taskbody.css';

export default function TaskBody(props) {
  const [editTitle, setEditTitle] = useState(false);
  const [taskBodyTitle, setTaskBodyTitle] = useState(props.taskTitle);

  const [editText, setEditText] = useState(false);
  const [taskBodyText, setTaskBodyText] = useState(props.taskBody);

  const [titleInput, setTitleInput] = useState(props.taskTitle);
  const [textInput, setTextInput] = useState(props.taskBody);

  const taskBody = useRef();
  const bodyTextArea = useRef();

  const closeBody = () => {
    taskBody.current.classList.add('closing');
    setTimeout(() => props.closeBody(false), 500);
  };

  // edit title
  const toggleEditTitle = () => {
    if (!editTitle) {
      setEditTitle(true);
    } else {
      deactivateEditTitle();
    }
  };
  const deactivateEditTitle = async () => {
    setEditTitle(false);
    if (titleInput.replace(/[' ']{1,}/, '') !== '') {
      if (titleInput !== taskBodyTitle) {
        await props.editTitle(props.id, titleInput);
        setTaskBodyTitle(titleInput);
        props.editStateTitle(titleInput);
      }
    }
  };

  // edit body
  const toggleEditText = async (e) => {
    if (!editText) {
      setEditText(await true);
      bodyTextArea.current.setSelectionRange(
        bodyTextArea.current.value.length,
        bodyTextArea.current.value.length
      );
    } else {
      deactivateEditText();
    }
  };
  const deactivateEditText = async () => {
    setEditText(false);
    if (textInput.replace(/[' ']{1,}/, '') !== '') {
      if (textInput !== taskBodyText) {
        await props.editTaskBody(props.id, textInput);
        setTaskBodyText(textInput);
        props.editStateText(textInput);
      }
    }
  };

  return (
    <div ref={taskBody} className='TaskBody'>
      <div className='body'>
        <p className='manage'>
          <button onClick={toggleEditTitle}>edit title</button>
          <button onClick={toggleEditText}>edit text</button>
        </p>
        <p className='title'>
          {editTitle && (
            <input
              onChange={(e) => setTitleInput(e.target.value)}
              autoFocus={true}
              type='text'
              onBlur={deactivateEditTitle}
              defaultValue={taskBodyTitle}
              onKeyDown={(event) => {
                if (event.code === 'Enter') deactivateEditTitle();
              }}
            />
          )}
          {!editTitle && taskBodyTitle}
        </p>
        <div>
          {editText && (
            <textarea
              onBlur={deactivateEditText}
              ref={bodyTextArea}
              onChange={(e) => setTextInput(e.target.value)}
              autoFocus={true}
              defaultValue={taskBodyText}
              onKeyUp={(e) => {
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
              onFocus={(e) => {
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />
          )}
          {!editText && (
            <p className='text'>
              {taskBodyText && taskBodyText}
              {!taskBodyText && 'No Task Body'}
            </p>
          )}
        </div>
        <button onClick={closeBody}>Close</button>
      </div>
    </div>
  );
}
