import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { PageNotFound } from "../pages/404/PageNotFound";
import {PATH} from "../constants/path";
import Detail from "../pages/Admin/DetailPage/Detail";
const AdminPage = lazy(() => import("../pages/Admin/index"));

// import CustomDrawer from "../pages/PageTest/Menu";



const AuthRoutes = () => {
  return (
    <Suspense fallback={<Loading/>}>
      <Routes>
        <Route exact path="*" element={<PageNotFound/>} />
        <Route exact path={PATH.ADMIN_MANAGE} element={<AdminPage />} />
        <Route exact path={PATH.HOME} element={<AdminPage />} />
        <Route exact path={PATH.ADMIN_DETAIL} element={<Detail />} />
      </Routes>
    </Suspense>
  );
};

export {AuthRoutes};