import * as React from "react";
import Box from "@mui/material/Box";
import { MenuAdmin } from "../../components/Menu/MenuAdmin";
import Nav from "../../components/Nav/Nav";
import Loading from "../../components/Loading/Loading";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import ClassTable from "./ClassTable/ClassTable";
import { GetClassList } from "../../apis/class";

export default function ClassPage() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  // const [isEmpty,setIsEmpty]= React.useState(null);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    GetClassList("")
      .then(async (res) => {
        if (res.status === 1) {
          console.log(res.data);
          setData(res.data);
          setLoading(false);
        } else {
          setError("Some errors happen!");
          setLoading(false);
        }
      })
      .catch((error) => {
        setError("Some errors happen!");
        setLoading(false);
      });
  }, []);
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <MenuAdmin isAdmin={false} isClass={true} isUser={false} />
      <Box sx={{ width: "83%" }}>
        <Nav />
        {loading ? <Loading /> : <ClassTable data={data} />}
        {error ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>{error}</strong>
          </Alert>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}
