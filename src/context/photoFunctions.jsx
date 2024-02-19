
import axios from "axios";

const API_URL = 'https://slider-fun.onrender.com/api';

export const postPhoto = async (data, userId) => {
  // console.log({ imageUrl, photoProperties })
  const response = axios.post(`${API_URL}/photo/new`, data);

  const d = (await response).data.id
  const photoId = { "photoId": d }

  axios.put(`${API_URL}/users/addPhoto/${userId}`, photoId);
  return response;
}

export const removePhoto = async (userId, photoId) => {
  // console.log({ imageUrl, photoProperties })
  // const response = axios.post(`${API_URL}/photo/new`, data);
  // const d = (await response).data.id
  // const photoId = { "photoId": photoId }

  axios.put(`${API_URL}/users/removePhoto/${userId}`, { "photoId": photoId });
  // return response;
}

