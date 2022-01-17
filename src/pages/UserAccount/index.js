import * as React from "react";
import Box from "@mui/material/Box";
import { MenuAdmin } from "../../components/Menu/MenuAdmin";
import Nav from "../../components/Nav/Nav";
import Loading from "../../components/Loading/Loading";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import UserTable from "./UserTable/UserTable";
import {GetUserList} from "../../apis/user";
import {useState} from "react";

export default function UserPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [isEmpty,setIsEmpty]= React.useState(null);
  const [data,setData]= React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    console.log(true);
    GetUserList("")
      .then((res) => {
        if (res.status === 1) {
          setData(res.data);
          console.log(res.data);
          setLoading(false);
        } else {
          setError("Some errors happen!");
          setLoading(false);
        }
      })
      .catch((error) => {
        setError("Some errors happen!");
      setLoading(false);})
      
  }, []);
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <MenuAdmin isAdmin={false} isClass={false} isUser={true} />
      <Box sx={{ width: "83%" }}>
        <Nav />
        {loading===true ? <Loading/> : ""}
        {error ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>{error}</strong>
          </Alert>
        ) : (
         ""
        )}
        <UserTable data={data} />
      </Box>
    </Box>
  );
}
