import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { PageNotFound } from "../pages/404/PageNotFound";
import {PATH} from "../constants/path";
import Detail from "../pages/Admin/DetailPage/Detail";
import DetailUser from "../pages/UserAccount/DetailPage";
import UserPage from "../pages/UserAccount/index";
import DetailedClassPage from "../pages/Classes/DetailedPage";
import ClassPage from "../pages/Classes";

const AdminPage = lazy(() => import("../pages/Admin/index"));

const AuthRoutes = () => {
  return (
    <Suspense fallback={<Loading/>}>
      <Routes>
        <Route exact path="*" element={<PageNotFound/>} />
        <Route exact path={PATH.ADMIN_MANAGE} element={<AdminPage />} />
        <Route exact path={PATH.HOME} element={<AdminPage />} />
        <Route exact path={PATH.ADMIN_DETAIL} element={<Detail />} />
        <Route exact path={PATH.USER_MANAGE} element={<UserPage />} />
        <Route exact path={PATH.USER_DETAIL} element={<DetailUser />} />
        <Route exact path={PATH.CLASS_MANAGE} element={<ClassPage />} />
        <Route exact path={PATH.CLASS_DETAIL} element={<DetailedClassPage />} />

      </Routes>
    </Suspense>
  );
};

export {AuthRoutes};