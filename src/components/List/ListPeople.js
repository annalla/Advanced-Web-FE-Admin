import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { SRC_IMG } from "../../constants/const";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333333",
    },
    secondary: {
      main: "#f44336",
    },
  }
});

export default function ListPeople({ data, isTeacher}) {
  const header = isTeacher ? "Teachers" : "Students";
  let array = isTeacher ? data.teacherArray : data.studentArray;
  array = array ? array : [];
  return (
    <Fragment>
      <Box sx={{ display: "flex", bgcolor: "background.paper" }}>
        <ThemeProvider theme={theme}>
          <Typography
            sx={{
              width: "70%",
              fontSize: "18px",
              fontWeight: "440",
              color: "primary.main",
            }}
          >
            {header}
          </Typography>
        </ThemeProvider>
         
      </Box>
      <Box
        sx={{
          bgcolor: "#000000",
          height: "2px",
          width: "100%",
        }}
      />
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {array.map((item, index) => (
          <Fragment>
            {index === 0 ? (
              ""
            ) : (
              <Divider variant="inset" component="li" sx={{ width: "89%" }} />
            )}

            <ListItem
              alignItems="flex-start"
              sx={{ width: "100%", height: "10vh" }}
              key={item.username}
            >
              <ListItemAvatar align="center">
                <Avatar
                  sx={{ mb: "5px" }}
                  alt="avatar"
                  src={
                    item.avatar === "" ? SRC_IMG.DEFAULT_AVATAR : item.avatar
                  }
                />
              </ListItemAvatar>
              <ListItemText sx={{ width: "60%" }}>
                <Typography
                  noWrap={true}
                  sx={{
                    fontWeight: "400",
                    pt: "8px",
                    pl: "20px",
                  }}
                >
                  {item.name}
                </Typography>
              </ListItemText>
              {!isTeacher ? (
                <ListItemText sx={{ width: "40%" }}>
                  <Typography
                    align="right"
                    noWrap={true}
                    sx={{
                      pt: "8px",
                      pr: "20px",
                      fontWeight: "400",
                    }}
                  >
                    {item.code}
                  </Typography>
                </ListItemText>
              ) : (
                ""
              )}
            </ListItem>
          </Fragment>
        ))}
      </List>
    </Fragment>
  );
}
