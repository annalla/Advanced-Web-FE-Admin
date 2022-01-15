import axios from "axios"
import { API_URL } from "../constants/const";

export const loginAdmin = async ({
    username,
    password
}) => {
    return axios
        .post(API_URL + "admin/login", {
            username,
            password
        })
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            return error
        })
}