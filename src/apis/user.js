import axios from "axios";
import { API_URL } from "../constants/const";

export const GetUserList = async (key) => {
  const header = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return axios
    .get(API_URL + "admin/user?page=0&sort=desc&key=" + key, header)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};
export const GetUserById = async (id) => {
  const header = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return axios
    .get(API_URL + "admin/user/" + id, header)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};
export const BanUserById = async (id) => {
  const header = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return axios
    .post(API_URL + "admin/user/ban/" + id,id, header)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};
export const MapNewIdForUser = async (data) => {
  const header = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return axios
    .post(API_URL + "admin/user/map-student-code",data, header)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};
