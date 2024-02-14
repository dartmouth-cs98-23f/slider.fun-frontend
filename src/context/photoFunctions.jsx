
import axios from "axios";

const API_URL = 'https://slider-fun.onrender.com/api';

export const postPhoto = async (data, userId) => {
  // console.log({ imageUrl, photoProperties })
  const response = axios.post(`${API_URL}/photo/new`, data);
  const newPhotoId = (await response).data.id
  const id = { "id": userId }
  console.log(id)
  const newResponse = axios.put(`${API_URL}/users/addPhoto/${newPhotoId}`, id);
  return response;
}

export const removePhoto = async (newPhotoId, userId) => {
  // console.log({ imageUrl, photoProperties })
  // const response = axios.post(`${API_URL}/photo/new`, data);
  // const newPhotoId = (await response).data.id
  const id = { "id": userId }
  const newResponse = axios.delete(`${API_URL}/users/removePhoto/${newPhotoId}`, id);
  // return response;
}

