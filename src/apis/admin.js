import axios from "axios"
import { API_URL } from "../constants/const";

export const GetAdminList = async () => {
    const header={ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },}
    return axios
        .get(API_URL + "admin/",header)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            return error
        })
}