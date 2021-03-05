import React, { useState, useEffect, useRef } from 'react';

export default function Task(props) {
  const [editMode, setEditMode] = useState(false);
  const [tasktext, setTasktext] = useState(props.text);
  const [taskDone, setTaskDone] = useState(props.done);

  const taskClass = useRef()

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = async (e) => {
    setEditMode(false);
    if (e.target.value.replace(/[' ']{1,}/, '') !== '') {
      if (e.target.value !== tasktext) {
        await props.editText(props.id, e.target.value);
        setTasktext(e.target.value);
      }
    }
  };

  const getTaskDone = (e) => {
    setTaskDone(!taskDone)
    props.doneTask(e);
  };
  useEffect(() => {
    if (taskDone) taskClass.current.classList = 'complete'
    if (!taskDone) taskClass.current.classList = ''
  }, [taskDone])

  return (
    <li data-id={props.id} ref={taskClass} className={''}>
      {editMode && (
        <input
          onKeyDown={(event) => {
            if (event.code === 'Enter') deactivateEditMode(event);
          }}
          autoFocus={true}
          onBlur={(event) => deactivateEditMode(event)}
          type='text'
          defaultValue={tasktext}
        />
      )}
      {!editMode && (
        <span onDoubleClick={activateEditMode} className='taskText'>
          {tasktext}
        </span>
      )}
      <button onClick={(event) => getTaskDone(event)} className='doneTask'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          version='1.1'
          width='512'
          height='512'
          x='0'
          y='0'
          viewBox='0 0 512 512'
        >
          <g>
            <g xmlns='http://www.w3.org/2000/svg'>
              <path
                d='m256 0c-141.49 0-256 114.5-256 256 0 141.49 114.5 256 256 256 141.49 0 256-114.5 256-256 0-141.49-114.5-256-256-256zm-60.914 363.99s-88.422-88.458-94.778-94.802c-14.139-14.139-14.139-37.147 0-51.274 14.175-14.175 37.099-14.175 51.274 0l57.244 57.244c7.118 7.118 18.67 7.069 25.728-.085l125.69-127.502c14.127-14.332 37.208-14.429 51.455-.181 14.03 14.03 14.115 36.942.181 51.081-136.493 138.486-162.414 165.507-162.414 165.507-14.985 14.984-39.383 14.997-54.38.012z'
                fill='#50d352'
                data-original='#000000'
              />
            </g>
          </g>
        </svg>
      </button>
      <button onClick={toggleEditMode} className='editTask'>
        <svg
          version='1.1'
          id='Layer_1'
          xmlns='http://www.w3.org/2000/svg'
          x='0px'
          y='0px'
          viewBox='0 0 300 300'
        >
          {' '}
          <g>
            {' '}
            <g>
              {' '}
              <path d='M149.996,0C67.157,0,0.001,67.161,0.001,149.997S67.157,300,149.996,300s150.003-67.163,150.003-150.003 S232.835,0,149.996,0z M221.302,107.945l-14.247,14.247l-29.001-28.999l-11.002,11.002l29.001,29.001l-71.132,71.126 l-28.999-28.996L84.92,186.328l28.999,28.999l-7.088,7.088l-0.135-0.135c-0.786,1.294-2.064,2.238-3.582,2.575l-27.043,6.03 c-0.405,0.091-0.817,0.135-1.224,0.135c-1.476,0-2.91-0.581-3.973-1.647c-1.364-1.359-1.932-3.322-1.512-5.203l6.027-27.035 c0.34-1.517,1.286-2.798,2.578-3.582l-0.137-0.137L192.3,78.941c1.678-1.675,4.404-1.675,6.082,0.005l22.922,22.917 C222.982,103.541,222.982,106.267,221.302,107.945z' />{' '}
            </g>{' '}
          </g>{' '}
          <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{' '}
          <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{' '}
          <g> </g>{' '}
        </svg>{' '}
      </button>
      <button
        onClick={(event) => props.deleteTask(event)}
        className='deleteTask'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          version='1.1'
          width='512'
          height='512'
          x='0'
          y='0'
          viewBox='0 0 24 24'
        >
          <g>
            <path
              xmlns='http://www.w3.org/2000/svg'
              d='m21.25 4h-12.88c-.761 0-1.494.319-2.012.876l-6.157 6.613c-.269.288-.269.734 0 1.022l6.157 6.612c.518.558 1.251.877 2.012.877h12.88c1.517 0 2.75-1.233 2.75-2.75v-10.5c0-1.517-1.233-2.75-2.75-2.75zm-1.768 10.819c.376.405.353 1.038-.052 1.414-.192.179-.437.267-.681.267-.269 0-.536-.107-.732-.319l-2.517-2.712-2.518 2.711c-.196.212-.464.319-.732.319-.244 0-.488-.088-.681-.267-.404-.376-.428-1.009-.052-1.414l2.619-2.818-2.618-2.819c-.376-.405-.353-1.038.052-1.414.403-.376 1.038-.354 1.413.052l2.518 2.711 2.518-2.711c.374-.406 1.009-.428 1.413-.052s.428 1.009.052 1.414l-2.62 2.819z'
              fill='#ffffff'
              data-original='#000000'
            />
          </g>
        </svg>
      </button>
    </li>
  );
}
