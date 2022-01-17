import * as React from "react";
import Box from "@mui/material/Box";
import { MenuAdmin } from "../../../components/Menu/MenuAdmin";
import Nav from "../../../components/Nav/Nav";
import DetailUserAccount from "./DetailAccount/DetailUserAccount";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { splitPathToGetId } from "../../../utils/util";
import Loading from "../../../components/Loading/Loading";
import { ERROR_CODE } from "../../../constants/errorCode";
import { Alert } from "@mui/material";
import { AlertTitle } from "@mui/material";
import { GetUserById } from "../../../apis/user";

export default function DetailUser() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const location = useLocation();
  const id = splitPathToGetId(location.pathname, "/users/");
  const [data, setData] = useState({});

  useEffect(() => {
    GetUserById(id)
      .then(async (res) => {
        console.log(res);
        if (res.status === 1) {
          console.log(res.data);
          setData(res.data);
          setLoading(false);
        } else {
          setError(ERROR_CODE[res.code]);
          setLoading(false);
        }
      })
      .catch((error) => {
        setError("Some errors happen!");
        setLoading(false);
      });
  }, [id]);
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <MenuAdmin isAdmin={false} isClass={false} isUser={true} />
      <Box sx={{ width: "83%" }}>
        <Nav />
        {loading ? <Loading /> : ""}
        {error ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>{error}</strong>
          </Alert>
        ) : (
          ""
        )}
        <DetailUserAccount data={data} />
      </Box>
    </Box>
  );
}
