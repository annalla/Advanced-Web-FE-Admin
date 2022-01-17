export const SRC_IMG = {
  COVER_IMAGE_CLASS: "/images/class/bg12.jpg",
  DEFAULT_AVATAR: "/images/avatar/avatar.jpg",
  PAGE_NOT_FOUND: "/images/404-page-not-found.jpg",
  // ANNOUNCE:"/images/DetailClass/announce.jpg"
};
export const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PRODUCTION_API
    : process.env.REACT_APP_DEVELOPMENT_API;

export const FE_ADMIN_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PRODUCTION_FE_ADMIN
    : process.env.REACT_APP_DEVELOPMENT_FE_ADMIN;

export const FE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PRODUCTION_FE
    : process.env.REACT_APP_DEVELOPMENT_FE;
