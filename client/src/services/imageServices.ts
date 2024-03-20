import axios from 'axios';
import { ISearchResults } from '../models/ISearchResult';
import { IUserInDb } from '../models/IUserInDb';
import { ISaveImgReq } from '../models/ISaveImgReq';
import { IUser } from '../models/IUser';

export const searchImages = async (userInput: string) => {
  return await axios.get<ISearchResults>(
    `https://www.googleapis.com/customsearch/v1?key=${
      import.meta.env.VITE_GOOGLE_KEY
    }&cx=${
      import.meta.env.VITE_GOOGLE_SEARCH_ID
    }&searchType=image&q=${userInput}`
  );
};

export const initUser = async (reqBody: IUserInDb) => {
  return await axios.post('http://localhost:3000/api/v1/user/create', reqBody);
}

export const saveImageToFavorites = async (reqBody: ISaveImgReq) => {
  return axios.post('http://localhost:3000/api/v1/user/images', reqBody);
}

export const getUserImages = async (user: IUser) => {
  return await axios.get(
    `http://localhost:3000/api/v1/user/images/${user?.sub}`
  );
}

export const deleteImage = async (id: string, userSub: string) => {
  return await axios.delete(`http://localhost:3000/api/v1/user/images/${id}?user=${userSub}`)
}