// require("dotenv").config();
export const PATH = {
  HOME: "/",
  LOGIN: "/login",
  ADMIN_ACCOUNT:"/adminAccounts",
  USER_ACCOUNT:"/userAccounts",
  CLASS:"/classes",
  DEMO:"/table",
  DETAIL:"/detail",
}
export const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PRODUCTION_API
    : process.env.REACT_APP_DEVELOPMENT_API;

export const FE_ADMIN_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PRODUCTION_FE_ADMIN
    : process.env.REACT_APP_DEVELOPMENT_FE_ADMIN;