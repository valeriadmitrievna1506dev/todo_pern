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

  const [tokenExpires, setTokenExpires] = useState(false);

  const updateFilters = (order, completeness) => {
    setFilters({
      order: order,
      done: completeness,
    });
  };

  const callAddTask = async (taskText) => {
    const newTask = await AddTask(taskText, props.user.id);
    if (newTask !== 'Not Auth' && newTask) {
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
    } else {
      setTokenExpires(true);
    }
  };

  const callEditTask = async (id, text) => {
    const editedTask = await editTaskText(id, text, props.user.id);
    if (editedTask !== 'Not Auth' && editedTask) {
      const editedIndex = data.find((el) => {
        if (el.id === editedTask.id) {
          return el;
        }
      });
      data[data.indexOf(editedIndex)].text = editedTask.text;
    } else {
      setTokenExpires(true);
    }
  };

  const callEditTaskBody = async (id, text) => {
    const editedTask = await editTaskBody(id, text, props.user.id);
    if (editedTask !== 'Not Auth' && editedTask) {
      const editedIndex = data.find((el) => {
        if (el.id === editedTask.id) {
          return el;
        }
      });
      data[data.indexOf(editedIndex)].bodyText = editedTask.bodyText;
    } else {
      setTokenExpires(true);
    }
  };

  const callTaskDone = async (e) => {
    const id = e.currentTarget.parentElement.getAttribute('data-id');
    const value = e.currentTarget.parentElement.classList.value ? true : false;
    const doneTask = await PutDoneTask(id, !value, props.user.id);
    if (doneTask !== 'Not Auth' && doneTask) {
      const doneIndex = data.find((el) => {
        if (el.id === doneTask.id) {
          return el;
        }
      });
      data[data.indexOf(doneIndex)].done = doneTask.done;
    } else {
      setTokenExpires(true);
    }
  };

  const callDeleteTask = async (e) => {
    const id = e.currentTarget.parentElement.getAttribute('data-id');
    const status = await DeleteTask(id, props.user.id);
    if (status !== 'Not Auth' && status) {
      if (status === 204) {
        const deletingTask = data.find((el) => {
          if (el.id == id) {
            return el;
          }
        });
        data.splice(data.indexOf(deletingTask), 1);
        setData([...data]);
      }
    } else {
      setTokenExpires(true);
    }
  };

  const callDeleteUser = async () => {
    const deleteuser = await DeleteUser(props.user.id);
    if (deleteuser !== 'Not Auth') {
      props.logout();
    } else {
      setTokenExpires(true);
    }
  };

  const callEditUsername = async (newUsername) => {
    const edituser = await editUsername(newUsername, props.user.id);
    if (edituser === 'Not Auth') {
      setTokenExpires(true);
    }
  };

  const expiredToken = () => {
    props.logout();
  };

  useEffect(async () => {
    const fetching = await fetchData(
      filters.order,
      filters.done,
      props.user.id
    );
    if (fetching === 'Not Auth') {
      setTokenExpires(true);
    } else {
      setData(fetching);
    }
  }, [filters]);

  const DragHandle = sortableHandle(() => (
    <span>
      <svg
        version='1.1'
        id='Capa_1'
        xmlns='http://www.w3.org/2000/svg'
        x='0px'
        y='0px'
        viewBox='0 0 490.667 490.667'
      >
        <g>
          <g>
            <path
              d='M223.992,21.333c-47.061,0-85.333,38.272-85.333,85.333c0,14.229,3.712,28.117,11.029,41.28
			c1.941,3.499,5.589,5.483,9.323,5.483c1.771,0,3.541-0.427,5.205-1.344c5.141-2.859,6.997-9.365,4.117-14.507
			c-5.525-9.941-8.341-20.352-8.341-30.912c0-35.285,28.715-64,64-64s64,28.715,64,64c0,5.077-0.811,10.389-2.539,16.747
			c-1.536,5.675,1.813,11.541,7.488,13.099c5.781,1.664,11.584-1.813,13.099-7.488c2.24-8.235,3.285-15.339,3.285-22.357
			C309.325,59.605,271.053,21.333,223.992,21.333z'
            />
          </g>
        </g>
        <g>
          <g>
            <path
              d='M85.325,0c-5.888,0-10.667,4.779-10.667,10.667v170.667c0,5.888,4.779,10.667,10.667,10.667s10.667-4.779,10.667-10.667
			V10.667C95.992,4.779,91.213,0,85.325,0z'
            />
          </g>
        </g>
        <g>
          <g>
            <path
              d='M135.544,45.803L92.877,3.136c-4.16-4.16-10.923-4.16-15.083,0L35.128,45.803c-4.16,4.16-4.16,10.923,0,15.083
			s10.923,4.16,15.083,0l35.115-35.136l35.115,35.136c2.091,2.069,4.821,3.115,7.552,3.115c2.731,0,5.461-1.045,7.552-3.115
			C139.704,56.725,139.704,49.963,135.544,45.803z'
            />
          </g>
        </g>
        <g>
          <g>
            <path
              d='M415.992,213.333c-8.768,0-16.939,2.667-23.723,7.211C386.424,203.947,370.573,192,351.992,192
			c-8.768,0-16.939,2.667-23.723,7.211c-5.845-16.597-21.696-28.544-40.277-28.544c-7.765,0-15.061,2.091-21.333,5.739v-69.739
			c0-23.531-19.136-42.667-42.667-42.667c-23.531,0-42.667,19.136-42.667,42.667V288l-37.077-27.797
			c-21.973-16.491-53.269-14.272-72.725,5.163c-12.48,12.48-12.48,32.768,0,45.248l151.915,151.936
			c18.133,18.133,42.261,28.117,67.904,28.117h49.984c64.683,0,117.333-52.629,117.333-117.333V256
			C458.659,232.469,439.523,213.333,415.992,213.333z M437.325,373.333c0,52.928-43.072,96-96,96h-49.984
			c-19.968,0-38.72-7.765-52.821-21.867L86.605,295.531c-4.16-4.16-4.16-10.923,0-15.083c6.613-6.592,15.445-9.984,24.32-9.984
			c7.211,0,14.464,2.24,20.544,6.805l54.123,40.597c3.221,2.432,7.573,2.816,11.179,1.003c3.605-1.813,5.888-5.504,5.888-9.536
			V106.667c0-11.755,9.557-21.333,21.333-21.333s21.333,9.579,21.333,21.333v160c0,5.888,4.779,10.667,10.667,10.667
			s10.667-4.779,10.667-10.667v-53.333c0-11.755,9.557-21.333,21.333-21.333s21.333,9.579,21.333,21.333v53.333
			c0,5.888,4.779,10.667,10.667,10.667s10.667-4.779,10.667-10.667v-32c0-11.755,9.557-21.333,21.333-21.333
			s21.333,9.579,21.333,21.333v32c0,5.888,4.779,10.667,10.667,10.667s10.667-4.779,10.667-10.667V256
			c0-11.755,9.557-21.333,21.333-21.333s21.333,9.579,21.333,21.333V373.333z'
            />
          </g>
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </svg>
    </span>
  ));
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
    return data.map((value, index) => {
      return (
        <SortableItem
          key={`item-${value.id}`}
          index={index}
          taskObject={value}
        />
      );
    });
  };
  return (
    <div>
      {tokenExpires && (
        <div className='expiresTokenModal'>
          <div className='body'>
            <p>Token expired</p>
            <button onClick={expiredToken}>Okay</button>
          </div>
        </div>
      )}
      <UserPanel
        editUser={callEditUsername}
        deleteUser={callDeleteUser}
        username={props.user.username}
        clearUser={props.clearUser}
        logout={props.logout}
      />
      <AddTaskForm addTask={callAddTask} />
      <SortableContainer onSortEnd={onSortEnd} useDragHandle>
        {displayTasks()}
      </SortableContainer>
      <BottomPanel updateFilters={updateFilters} />
    </div>
  );
}
