import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import {PATH} from "../constants/path";
import { RedirectLogin } from "../pages/404/RedirectLogin";
import CustomDrawer from "../pages/PageTest/Menu";
import Detail from "../pages/PageTest/Detail";

// const DetailClassGrade = lazy(() => import("../pages/Class/DetailClassGrade"));
const Login = lazy(() => import("../pages/Login/Login"));


const UnAuthRoutes = () => {
  return (
    <Suspense fallback={<Loading/>}>
      <Routes>
      <Route exact path={PATH.LOGIN} element={<Login />} />
      <Route exact path={PATH.DEMO} element={<CustomDrawer />} />
      <Route exact path={PATH.DETAIL} element={<Detail />} />
        <Route exact path="*" element={<RedirectLogin/>} />
      </Routes>
    </Suspense>
  );
};

export {UnAuthRoutes};