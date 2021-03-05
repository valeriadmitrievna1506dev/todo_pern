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
      },
    });
    return result.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const AddTask = async (text, userId) => {
  try {
    const result = await axios.post(`${baseUrl}/users/${userId}/tasks`, {
      text,
    });
    return result.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const PutDoneTask = async (taskId, done, userId) => {
  try {
    const result = await axios.put(
      `${baseUrl}/users/${userId}/tasks/${taskId}`,
      {
        done: done,
      }
    );
  } catch (err) {
    console.log(err.message);
  }
};

export const editTaskText = async (taskId, text, userId) => {
  try {
    const result = await axios.put(
      `${baseUrl}/users/${userId}/tasks/${taskId}`,
      {
        text: text,
      }
    );
  } catch (err) {
    console.log(err.message);
  }
};

export const DeleteTask = async (taskId, userId) => {
  try {
    const result = await axios.delete(
      `${baseUrl}/users/${userId}/tasks/${taskId}`
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const DeleteUser = async (userId) => {
  try {
    const result = await axios.delete(`${baseUrl}/users/${userId}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const editUsername = async (newUsername, userId) => {
  try {
    return await axios.put(`${baseUrl}/users/${userId}`, {
      username: newUsername,
    });
  } catch (err) {
    console.log(err.message);
  }
};
