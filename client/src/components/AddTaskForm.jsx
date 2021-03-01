import React, { useState } from 'react';
import { AddTask } from '../fetchData';

export default function AddTaskForm(props) {
  const [taskText, setTaskText] = useState();

  const submitAdd = (event) => {
    event.preventDefault();
    props.addTask(taskText)
    event.target.reset()
  };

  return (
    <form onSubmit={submitAdd} id='addTaskForm'>
      <input
        onChange={(event) => {
          setTaskText(event.target.value);
        }}
        autoComplete='off'
        type='text'
        name='tacskinput'
        id='tacskinput'
      />
      <button type='submit'>add</button>
    </form>
  );
}
