import axios from 'axios';

const baseURL = 'https://broomees1.vercel.app/';
const api = axios.create({
  baseURL,
});

export const addData = async (data) => {
  try {
    const response = await api.post('/signup', data);
    return response.data;
  } catch (error) {
    console.error('Error adding data:', error);
    throw error;
  }
};

export const showData = async () => {
    try {
      const response = await api.get('/userlist', );
      return response.data;
    } catch (error) {
      console.error('Error adding data:', error);
      throw error;
    }
  };
