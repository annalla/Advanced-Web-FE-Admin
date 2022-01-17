import axios from "axios";
import { API_URL } from "../constants/const";

export const GetClassList = async (key) => {
  const header = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return axios
    .get(API_URL + "admin/classroom?page=0&sort=desc&key=" + key, header)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};
export const GetClassById = async (id) => {
  const header = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return axios
    .get(API_URL + "admin/classroom/" + id, header)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};
