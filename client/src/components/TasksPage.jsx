import { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import Task from './Task';
import BottomPanel from './BottomPanel';
import {
  AddTask,
  DeleteTask,
  DeleteUser,
  editTaskText,
  fetchData,
  PutDoneTask,
  editUsername,
  editTaskBody,
} from '../http/fetchData';
import React from 'react';
import UserPanel from './UserPanel';
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
  arrayMove,
} from 'react-sortable-hoc';

export default function TasksPage(props) {
  const [data, setData] = useState([]);
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
    const editedTask = await editTaskText(id, text, props.user.id);
    const editedIndex = data.find((el) => {
      if (el.id === editedTask.id) {
        return el;
      }
    });
    data[data.indexOf(editedIndex)].text = editedTask.text;
  };

  const callEditTaskBody = async (id, text) => {
    const editedTask = await editTaskBody(id, text, props.user.id);
    const editedIndex = data.find((el) => {
      if (el.id === editedTask.id) {
        return el;
      }
    });
    data[data.indexOf(editedIndex)].bodyText = editedTask.bodyText;
  };

  const callTaskDone = async (e) => {
    const id = e.currentTarget.parentElement.getAttribute('data-id');
    const value = e.currentTarget.parentElement.classList.value ? true : false;
    const doneTask = await PutDoneTask(id, !value, props.user.id);
    const doneIndex = data.find((el) => {
      if (el.id === doneTask.id) {
        return el;
      }
    });
    data[data.indexOf(doneIndex)].done = doneTask.done;
  };

  const callDeleteTask = async (e) => {
    const id = e.currentTarget.parentElement.getAttribute('data-id');
    const status = await DeleteTask(id, props.user.id);
    if (status === 204) {
      const deletingTask = data.find((el) => {
        if (el.id == id) {
          return el;
        }
      });
      data.splice(data.indexOf(deletingTask), 1);
      setData([...data]);
    }
  };

  const callDeleteUser = async () => {
    await DeleteUser(props.user.id);
    props.logout();
  };

  const callEditUsername = async (newUsername) => {
    await editUsername(newUsername, props.user.id);
  };

  useEffect(async () => {
    setData(await fetchData(filters.order, filters.done, props.user.id));
  }, [filters]);

  const DragHandle = sortableHandle(() => <span>::</span>);
  const SortableItem = sortableElement(({ taskObject }) => (
    <Task
      key={taskObject.id}
      id={taskObject.id}
      done={taskObject.done}
      text={taskObject.text}
      taskBody={taskObject.bodyText}
      deleteTask={callDeleteTask}
      editText={callEditTask}
      editTaskBody={callEditTaskBody}
      doneTask={callTaskDone}
      dragHandle={<DragHandle />}
    />
  ));
  const SortableContainer = sortableContainer(({ children }) => {
    return <ul id='tasksContent'>{children}</ul>;
  });
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setData(arrayMove(data, oldIndex, newIndex));
  };

  const displayTasks = () => {
    if (!data) return 'No tasks';
    if (data.length === 0) return 'No tasks';
    return data.map((taskObject) => {
      return (
        <Task
          key={taskObject.id}
          id={taskObject.id}
          done={taskObject.done}
          text={taskObject.text}
          taskBody={taskObject.bodyText}
          deleteTask={callDeleteTask}
          editText={callEditTask}
          editTaskBody={callEditTaskBody}
          doneTask={callTaskDone}
          dragHandle={<DragHandle />}
        />
      );
    });
  };
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
      <SortableContainer onSortEnd={onSortEnd} useDragHandle>
        {data.map((value, index) => {
          return (
            <SortableItem key={`item-${value.id}`} index={index} taskObject={value} />
          );
        })}
      </SortableContainer>
      <BottomPanel updateFilters={updateFilters} />
    </div>
  );
}
