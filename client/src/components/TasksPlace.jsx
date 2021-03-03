import React, { useState, useEffect } from 'react';
import Task from './Task';

export default function TasksPlace(props) {
  const displayTasks = () => {
    if (!props.data) return 'No tasks';
    return props.data.map((taskObject) => {
      if (taskObject.done) {
        return (
          <Task
            key={taskObject.id}
            deleteTask={props.deleteTask}
            editText={props.editText}
            doneTask={props.doneTask}
            id={taskObject.id}
            className='complete'
            text={taskObject.text}
          />
        );
      } else {
        return (
          <Task
            key={taskObject.id}
            deleteTask={props.deleteTask}
            editText={props.editText}
            doneTask={props.doneTask}
            id={taskObject.id}
            className=''
            text={taskObject.text}
          />
        );
      }
    });
  };

  return <ul id='tasksContent'>{displayTasks()}</ul>;
}
