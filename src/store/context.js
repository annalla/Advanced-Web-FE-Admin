import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isAuthenticated: false,
  user: {
    token: "",
    id: "",
    name: "",
    avatarUrl: "",
  },
  onLogout: () => {},
  onLogin: (data) => {},
});

export const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUserLoggedInInformation =
      localStorage.getItem("isAuth");
    if (storedUserLoggedInInformation === "1") {
      setIsAuthenticated(true);
      const storedUserTokenInformation = localStorage.getItem("tokenAd");
      const storedUserIdInformation = localStorage.getItem("idAd");
      const storedUserNameInformation = localStorage.getItem("nameAd");
      var storedUserAvatarInformation = localStorage.getItem("avatarUrlAd");
      if (storedUserAvatarInformation === null) {
        storedUserAvatarInformation = "";
      }
      const currentUser = {
        token: storedUserTokenInformation,
        id: storedUserIdInformation,
        name: storedUserNameInformation,
        avatarUrl: storedUserAvatarInformation,
      };
      setUser(currentUser);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const logoutHandler = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuth", "0");
    localStorage.removeItem("idAd");
    localStorage.removeItem("nameAd");
    localStorage.removeItem("avatarUrlAd");
    localStorage.removeItem("tokenAd");
    setUser(null);
  };
  
  const loginHandler = (data) => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuth", "1");
    localStorage.setItem("idAd", data.id);
    localStorage.setItem("nameAd", data.name);
    localStorage.setItem("avatarUrlAd", data.avatarUrl);
    localStorage.setItem("tokenAd", data.token);
    const currentUser = {
      token: data.token,
      id: data.id,
      name: data.name,
      avatarUrl: data.avatarUrl,
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
