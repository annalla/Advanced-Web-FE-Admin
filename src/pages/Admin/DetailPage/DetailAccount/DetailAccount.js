import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { SRC_IMG } from "../../../../constants/const";
import { blue, red } from "@mui/material/colors";

import { useState } from "react";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#e1e1e1",
    },
  },
});

export default function DetailAccount({ data }) {
  const [account, setAccount] = useState(data);
  const [date, setDate] = useState(new Date());
  React.useEffect(() => {
    if (data.createdAt !== undefined) {
      setDate(new Date(data.createdAt * 1000).toISOString().slice(0, 16));
    }
    setAccount(data);
  }, [data]);
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: 590,
          width: "100%",
          display: "flex",
          backgroundColor: "secondary.main",
        }}
      >
        <Paper sx={{ width: "25%", my: 2, ml: 4, height: 300 }}>
          <Card sx={{ m: 6 }}>
            <CardMedia
              component="img"
              height="160"
              image={
                account.avatar === "" ? SRC_IMG.DEFAULT_AVATAR : account.avatar
              }
              alt="green iguana"
            />
          </Card>
        </Paper>
        <Paper sx={{ width: "70%", m: 2, p: 4 }}>
          <Stack spacing={1.5}>
            <Box sx={{ display: "flex", width: "100%" }}>
              <Typography sx={{ p: 0.5, width: "20%" }}>Username</Typography>
              <TextField
                sx={{ width: "75%" }}
                multiline={true}
                defaultValue={account.username}
                variant="standard"
                disabled
              />
            </Box>
            <Box sx={{ display: "flex", width: "100%" }}>
              <Typography sx={{ p: 0.5, width: "20%" }}>Full name</Typography>
              <TextField
                sx={{ width: "75%" }}
                multiline={true}
                defaultValue={account.name}
                variant="standard"
                disabled
              />
            </Box>
            <Box sx={{ display: "flex", width: "100%" }}>
              <Typography sx={{ p: 0.5, width: "20%" }}>Created At</Typography>
              <TextField
                type="datetime-local"
                sx={{ width: "75%" }}
                variant="standard"
                value={date}
                disabled
              />
            </Box>

            <Box sx={{ display: "flex", width: "100%" }}>
              <Typography sx={{ p: 0.5, width: "20%" }}>Phone</Typography>
              <TextField
                sx={{ width: "75%" }}
                multiline={true}
                defaultValue={account.phone}
                variant="standard"
                disabled
              />
            </Box>
            <Box sx={{ display: "flex", width: "100%", position: "relative" }}>
              <Typography sx={{ p: 0.5, width: "20%" }}>Email</Typography>
              <TextField
                sx={{ width: "75%" }}
                multiline={true}
                defaultValue={account.email}
                variant="standard"
                disabled
              />
              {account.isEmailVerified === true ? (
                <Box
                  sx={{
                    width: 100,
                    height: 30,
                    backgroundColor: red[50],
                    position: "absolute",
                    right: 45,
                    top: 0,
                    borderRadius: 20,
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <Typography color={red[900]} sx={{ mt: 0.5 }}>
                    Xác thực
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    width: 150,
                    height: 30,
                    backgroundColor: blue[50],
                    position: "absolute",
                    right: 45,
                    top: 0,
                    borderRadius: 20,
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <Typography color={blue[900]} sx={{ mt: 0.5 }}>
                    Chưa xác thực
                  </Typography>
                </Box>
              )}
            </Box>
          </Stack>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
