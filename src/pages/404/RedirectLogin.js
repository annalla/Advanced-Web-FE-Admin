import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import  {PATH} from "../../constants/path";

function RedirectLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isAuth")!=="1"){
      navigate(PATH.LOGIN);
    }
  }, [navigate]);
  return <div></div>;
}
export { RedirectLogin };
