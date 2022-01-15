import * as React from "react";
import Box from "@mui/material/Box";
import { MenuAdmin } from "../../components/Menu/MenuAdmin";
import Nav from "../../components/Nav/Nav";
import AdminTable from "./AdminTable/AdminTable";
import { GetAdminList } from "../../apis/admin";
import Loading from "../../components/Loading/Loading";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";

export default function AdminPage() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  // const [isEmpty,setIsEmpty]= React.useState(null);
  const [data,setData]= React.useState([]);

  React.useEffect(() => {
    GetAdminList()
      .then(async (res) => {
        if (res.status === 1) {
          setData(res.data);
          // console.log(res.data);
          setLoading(false);
        } else {
          setError("Some errors happen!");
        }
      })
      .catch((error) => setError("Some errors happen!"));
    setLoading(false);
  }, []);
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <MenuAdmin isAdmin={true} isClass={false} isUser={false} />
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
        <AdminTable data={data} />
      </Box>
    </Box>
  );
}
