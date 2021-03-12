import axios from 'axios';
const baseUrl = 'http://localhost:8000';

export const fetchData = async (order = 'normal', done = 'all', userId) => {
  try {
    let queryString = {
      order: order,
    };
    if (done != 'all') queryString.done = done;
    const url =
      `${baseUrl}/users/${userId}/tasks?` + new URLSearchParams(queryString);
    const result = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return result.data;
  } catch (err) {
    return err.response.data.message;
  }
};

export const AddTask = async (text, userId) => {
  try {
    const result = await axios.post(
      `${baseUrl}/users/${userId}/tasks`,
      {
        text,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return result.data;
  } catch (err) {
    return err.response.data.message;
  }
};

export const PutDoneTask = async (taskId, done, userId) => {
  try {
    const result = await axios.put(
      `${baseUrl}/users/${userId}/tasks/${taskId}`,
      {
        done: done,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return result.data;
  } catch (err) {
    return err.response.data.message;
  }
};

export const editTaskText = async (taskId, text, userId) => {
  try {
    const result = await axios.put(
      `${baseUrl}/users/${userId}/tasks/${taskId}`,
      {
        text: text,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return result.data;
  } catch (err) {
    return err.response.data.message;
  }
};

export const editTaskBody = async (taskId, bodyText, userId) => {
  try {
    const result = await axios.put(
      `${baseUrl}/users/${userId}/tasks/${taskId}`,
      {
        bodyText: bodyText,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return result.data;
  } catch (err) {
    return err.response.data.message;
  }
};

export const DeleteTask = async (taskId, userId) => {
  try {
    const result = await axios.delete(
      `${baseUrl}/users/${userId}/tasks/${taskId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return result.status;
  } catch (error) {
    return error.response.data.message;
  }
};

export const DeleteUser = async (userId) => {
  try {
    const result = await axios.delete(`${baseUrl}/users/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  } catch (error) {
    return error.response.data.message;
  }
};

export const editUsername = async (newUsername, userId) => {
  try {
    return await axios.put(
      `${baseUrl}/users/${userId}`,
      {
        username: newUsername,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  } catch (err) {
    return err.response.data.message;
  }
};
