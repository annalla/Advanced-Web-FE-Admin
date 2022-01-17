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
import SaveIcon from "@mui/icons-material/Save";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LockIcon from "@mui/icons-material/Lock";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { indigo } from "@mui/material/colors";
import { useState } from "react";
import { convertUnixToDate } from "../../../../utils/util";
import SimpleSnackbar from "../../../../components/SnackBar/SnackBar";
import { Fragment } from "react";
import { MapNewIdForUser } from "../../../../apis/user";
import { ERROR_CODE } from "../../../../constants/errorCode";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#e1e1e1",
    },
  },
});

export default function DetailUserAccount({ data }) {
  const [account, setAccount] = useState(data);
  const [date, setDate] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [code, setCode] = useState(null);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  const handleChangeCode = (e) => {
    console.log(e.target.value);
    setIsSave(true);
    setCode(e.target.value);
  };
  const handleChangeCodeClick = () => {
    if (code.length !== 0) {
      var dataCode = {
        userId: account.id,
        studentCode: code,
        isCodeLocked: true,
      };
      console.log(dataCode);
      MapNewIdForUser(dataCode)
        .then((res) => {
          console.log(res);
          if (res.status === 1) {
            setMessage("Map successfully");
            account.code = res.data.code;
            setAccount(account);
            setOpenSnackBar(true);
            setIsEdit(false);
          } else {
            setMessage(ERROR_CODE[res.code]);
            setOpenSnackBar(true);
            setIsEdit(false);
            setAccount(account);
          }
        })
        .catch((error) => {
          setMessage("Map failed");
          setOpenSnackBar(true);
          setIsEdit(false);
          setAccount(account);
        });
    } else {
      setMessage("Code empty");
      setOpenSnackBar(true);
      setAccount(account);
    }
  };
  React.useEffect(() => {
    try {
      if (data.createdAt !== undefined && data.createdAt !== null) {
        setDate(new Date(data.createdAt * 1000).toISOString().slice(0, 16));
      }
      if (data.birthday !== undefined && data.birthday !== null) {
        setBirthday(convertUnixToDate(data.birthday));
      }
    } catch (error) {}
    setAccount(data);
  }, [data]);
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            minHeight: 590,
            width: "100%",
            display: "flex",
            backgroundColor: "secondary.main",
          }}
        >
          <Paper
            position="relative"
            sx={{ width: "25%", my: 2, ml: 4, height: 300 }}
          >
            <Card sx={{ m: 6 }}>
              <CardMedia
                component="img"
                height="160"
                image={
                  account.avatar === ""
                    ? SRC_IMG.DEFAULT_AVATAR
                    : account.avatar
                }
                alt={account.name}
              />
              {account.enabled===false ? (
                <LockIcon
                  sx={{
                    position: "absolute",
                    left: 300,
                    top: 120,
                    color: red[500],
                  }}
                  fontSize="large"
                />
              ) : (
                ""
              )}
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
              {isEdit ? (
                <Box sx={{ display: "flex", width: "100%" }}>
                  <Typography sx={{ p: 0.5, width: "20%" }}>Code</Typography>
                  <TextField
                    multiline={true}
                    sx={{ width: "68%" }}
                    defaultValue={account.code}
                    variant="standard"
                    onChange={(e) => handleChangeCode(e)}
                  />
                  {isSave ? (
                    <IconButton aria-label="edit" size="small">
                      <SaveIcon
                        onClick={handleChangeCodeClick}
                        fontSize="small"
                        sx={{ color: indigo[900] }}
                      />
                    </IconButton>
                  ) : (
                    <IconButton aria-label="edit" size="small" disabled>
                      <SaveIcon fontSize="small" sx={{ color: indigo[900] }} />
                    </IconButton>
                  )}
                </Box>
              ) : (
                <Box sx={{ display: "flex", width: "100%" }}>
                  <Typography sx={{ p: 0.5, width: "20%" }}>Code</Typography>
                  <TextField
                    multiline={true}
                    sx={{ width: "68%" }}
                    value={account.code}
                    variant="standard"
                    disabled
                  />
                  <IconButton aria-label="edit" size="small">
                    <EditIcon
                      onClick={() => {
                        setIsEdit(true);
                        setIsSave(false);
                        setOpenSnackBar(false);
                      }}
                      fontSize="small"
                      sx={{ color: indigo[900] }}
                    />
                  </IconButton>
                </Box>
              )}

              <Box sx={{ display: "flex", width: "100%" }}>
                <Typography sx={{ p: 0.5, width: "20%" }}>
                  Created At
                </Typography>
                <TextField
                  type="datetime-local"
                  sx={{ width: "75%" }}
                  variant="standard"
                  value={date}
                  disabled
                />
              </Box>
              <Box sx={{ display: "flex", width: "100%" }}>
                <Typography sx={{ p: 0.5, width: "20%" }}>Birthday</Typography>
                <TextField
                  multiline={true}
                  type="date"
                  sx={{ width: "75%" }}
                  variant="standard"
                  value={birthday}
                  disabled
                />
              </Box>
              <Box sx={{ display: "flex", width: "100%" }}>
                <Typography sx={{ p: 0.5, width: "20%" }}>Gender</Typography>
                <FormControl
                  variant="standard"
                  fullWidth
                  sx={{ width: "75%" }}
                  disabled
                >
                  <Select
                    labelId="genderId"
                    id="gender"
                    label="Gender"
                    value={account.gender || 0}
                  >
                    <MenuItem value={0}>None</MenuItem>
                    <MenuItem value={1}>Male</MenuItem>
                    <MenuItem value={2}>Female</MenuItem>
                  </Select>
                </FormControl>
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
              <Box
                sx={{ display: "flex", width: "100%", position: "relative" }}
              >
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
              <Box sx={{ display: "flex", width: "100%" }}>
                <Typography sx={{ p: 0.5, width: "20%" }}>
                  Identity Card
                </Typography>
                <TextField
                  multiline={true}
                  sx={{ width: "75%" }}
                  defaultValue={account.identityCard}
                  variant="standard"
                  disabled
                />
              </Box>
            </Stack>
          </Paper>
        </Box>
      </ThemeProvider>
      {openSnackBar ? (
        <SimpleSnackbar
          message={message}
          onClose={() => setOpenSnackBar(false)}
        />
      ) : (
        ""
      )}
    </Fragment>
  );
}
