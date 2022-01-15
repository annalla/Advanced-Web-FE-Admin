import React, { useState, useEffect } from "react";
import { SRC_IMG } from "../constants/const";

const AuthContext = React.createContext({
  isAuthenticated: false,
  user: {
    token: "",
    id: "",
    name: "",
    avatarUrl: "",
    isVerifiedEmail: "",
  },
  onLogout: () => {},
  onLogin: (data) => {},
});

export const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isAuth");
    if (storedUserLoggedInInformation === "1") {
      setIsAuthenticated(true);
      const storedUserTokenInformation = localStorage.getItem("token");
      const storedUserIdInformation = localStorage.getItem("id");
      const storedUserNameInformation = localStorage.getItem("name");
      var storedUserAvatarInformation = localStorage.getItem("avatarUrl");
      var storedIsVerifiedEmail = localStorage.getItem("isVerifiedEmail");

      if (storedUserAvatarInformation === null) {
        storedUserAvatarInformation = "";
      }
      const currentUser = {
        token: storedUserTokenInformation,
        id: storedUserIdInformation,
        name: storedUserNameInformation,
        avatarUrl: storedUserAvatarInformation,
        isVerifiedEmail: storedIsVerifiedEmail === "true" ? true : false,
      };
      setUser(currentUser);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const logoutHandler = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuth", "0");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("avatarUrl");
    localStorage.removeItem("token");
    localStorage.removeItem("isVerifiedEmail");
    setUser(null);
  };

  const loginHandler = (data) => {
    setIsAuthenticated(true);
    const img = data.avatarUrl === "" ? SRC_IMG.DEFAULT_AVATAR : data.avatarUrl;
    localStorage.setItem("isAuth", "1");
    localStorage.setItem("id", data.id);
    localStorage.setItem("name", data.name);
    localStorage.setItem("avatarUrl", img);
    localStorage.setItem("token", data.token);
    localStorage.setItem("isVerifiedEmail", data.isEmailVerified);
    const currentUser = {
      token: data.token,
      id: data.id,
      name: data.name,
      avatarUrl: data.avatarUrl,
      isVerifiedEmail: data.isEmailVerified,
    };
    setUser(currentUser);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        user: user,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
