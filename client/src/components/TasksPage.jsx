import { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import TasksPlace from './TasksPlace';
import BottomPanel from './BottomPanel';
import {
  AddTask,
  DeleteTask,
  DeleteUser,
  editTaskText,
  fetchData,
  PutDoneTask,
  editUsername,
} from '../http/fetchData';
import React from 'react';
import UserPanel from './UserPanel';

export default function TasksPage(props) {
  const [data, setData] = useState();
  const [filters, setFilters] = useState({
    order: 'normal',
    done: 'all',
  });

  const updateFilters = (order, completeness) => {
    setFilters({
      order: order,
      done: completeness,
    });
  };

  const callAddTask = async (taskText) => {
    const newTask = await AddTask(taskText, props.user.id);
    if (
      (filters.order === 'normal' && filters.done === 'undone') ||
      (filters.order === 'normal' && filters.done === 'all')
    ) {
      setData([newTask, ...data]);
    }
    if (
      (filters.order === 'reverse' && filters.done === 'undone') ||
      (filters.order === 'reverse' && filters.done === 'all')
    ) {
      setData([...data, newTask]);
    }
  };

  const callEditTask = async (id, text) => {
    await editTaskText(id, text, props.user.id);
    setData(await fetchData(filters.order, filters.done, props.user.id));
  };

  const callTaskDone = async (e) => {
    const id = e.currentTarget.parentElement.getAttribute('data-id');
    const value = e.currentTarget.parentElement.classList.value ? true : false;
    await PutDoneTask(id, !value, props.user.id);
    setData(await fetchData(filters.order, filters.done, props.user.id));
  };

  const callDeleteTask = async (e) => {
    const id = e.currentTarget.parentElement.getAttribute('data-id');
    await DeleteTask(id, props.user.id);
    setData(await fetchData(filters.order, filters.done, props.user.id));
  };

  const callDeleteUser = async () => {
    await DeleteUser(props.user.id);
    props.logout()
  };

  const callEditUsername = async (newUsername) => {
    await editUsername(newUsername, props.user.id);
  };

  useEffect(async () => {
    setData(await fetchData(filters.order, filters.done, props.user.id));
  }, [filters]);

  console.log(props.isAuth);


  return (
    <div>
      <UserPanel
        editUser={callEditUsername}
        deleteUser={callDeleteUser}
        username={props.user.username}
        clearUser={props.clearUser}
        logout={props.logout}
      />
      <AddTaskForm addTask={callAddTask} />
      <TasksPlace
        data={data}
        deleteTask={callDeleteTask}
        doneTask={callTaskDone}
        editText={callEditTask}
      />
      <BottomPanel updateFilters={updateFilters} />
    </div>
  );
}
