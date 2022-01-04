import React from "react";
import "./index.css";
import { AuthContextProvider } from "./store/context";
import { BrowserRouter } from "react-router-dom";
import { RouterManage } from "./RouterManage";
function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <React.StrictMode>
          <RouterManage/>
        </React.StrictMode>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
export default App ;
