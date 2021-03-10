import React, { useState, useEffect } from 'react';
import Task from './Task';

export default function TasksPlace(props) {
  const displayTasks = () => {
    if (!props.data) return 'No tasks';
    if (props.data.length === 0) return 'No tasks';
    return props.data.map((taskObject) => {
      if (taskObject.done) {
        return (
          <Task
            done={taskObject.done}
            key={taskObject.id}
            deleteTask={props.deleteTask}
            editText={props.editText}
            editTaskBody={props.editTaskBody}
            doneTask={props.doneTask}
            id={taskObject.id}
            text={taskObject.text}
            taskBody={taskObject.bodyText}
          />
        );
      } else {
        return (
          <Task
            done={taskObject.done}
            key={taskObject.id}
            deleteTask={props.deleteTask}
            editText={props.editText}
            editTaskBody={props.editTaskBody}
            doneTask={props.doneTask}
            id={taskObject.id}
            text={taskObject.text}
            taskBody={taskObject.bodyText}
          />
        );
      }
    });
  };

  return <ul id='tasksContent'>{displayTasks()}</ul>;
}
