import { Fragment, useContext } from "react";
import AuthContext from "./store/context";
import { AuthRoutes } from "./routes/AuthRoutes";
import { UnAuthRoutes } from "./routes/UnAuthRoutes";
function RouterManage() {
  const ctx = useContext(AuthContext);
  return (
    <Fragment>
      {ctx.isAuthenticated ? <AuthRoutes /> : <UnAuthRoutes />}
    </Fragment>
  );
}

export {RouterManage };
