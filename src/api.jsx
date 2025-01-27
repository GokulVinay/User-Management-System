import axios from 'axios';

const apiUrl = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

export const addUser = async (user) => {
  const response = await axios.post(apiUrl, user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await axios.put(`${apiUrl}/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  await axios.delete(`${apiUrl}/${id}`);
};
