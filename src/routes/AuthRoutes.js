import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { PageNotFound } from "../pages/404/PageNotFound";
import {PATH} from "../constants/path";


const AuthRoutes = () => {
  return (
    <Suspense fallback={<Loading/>}>
      <Routes>
        <Route exact path="*" element={<PageNotFound/>} />
      </Routes>
    </Suspense>
  );
};

export {AuthRoutes};