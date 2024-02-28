
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

// remove photo from user
export const removePhoto = async (userId, photoId) => {
  axios.put(`${API_URL}/users/removePhoto/${userId}`, { "photoId": photoId });
  // return response;
}

// delete photo object from database 
export const deletePhoto = async (photoId) => {
  await axios.delete(`${API_URL}/photo/${photoId}`);
}


export const editPhoto = async (photoId, data) => {
  await axios.put(`${API_URL}/photo/${photoId}`, data);
}