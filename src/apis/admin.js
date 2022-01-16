import axios from "axios";
import { API_URL } from "../constants/const";

export const GetAdminList = async (key) => {
  const header = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return axios
    .get(API_URL + "admin?page=0&sort=desc&key=" + key, header)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};
export const GetAdminById = async (id) => {
  const header = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return axios
    .get(API_URL + "admin/" + id, header)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};
export const CreateAdmin = async (data) => {
  const header = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    "Content-Type": "multipart/form-data",
  };
  return axios
    .post(API_URL + "admin/", data, header)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};
