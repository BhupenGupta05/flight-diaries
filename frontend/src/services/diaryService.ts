import axios from "axios";
import { Diary, NewDiary } from "../types";

export interface ErrorResponse {
  message: string;
  // Add other properties if your error response contains more fields
}

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = () => {
    return axios
      .get<Diary[]>(baseUrl)
      .then(response => response.data)
}
  
export const createDiary = (object: NewDiary) => {
  return axios
      .post<Diary>(baseUrl, object)
      .then(response => response.data)
}