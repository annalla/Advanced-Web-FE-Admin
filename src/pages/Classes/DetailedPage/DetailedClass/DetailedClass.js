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
import { useState } from "react";
import { Avatar } from "@mui/material";
import { PATH } from "../../../../constants/path";
import { FE_URL } from "../../../../constants/const";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ListPeople from "../../../../components/List/ListPeople";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#e1e1e1",
    },
  },
});
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{my:2}}>{children}</Box>}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DetailClass({ data }) {
  const [classInfo, setClassInfo] = useState(data);
  const [date, setDate] = useState(new Date());
  //handle Tab
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //
  React.useEffect(() => {
    if (data.createdAt !== undefined) {
      setDate(new Date(data.createdAt * 1000).toISOString().slice(0, 16));
    }
    if (
      data.inviteTeacherCode !== undefined &&
      data.inviteStudentCode !== undefined
    ) {
      console.log(FE_URL);
      data.inviteStudentCode =
        FE_URL + PATH.JOIN_CLASS_INVITATION + data.inviteStudentCode;
      data.inviteTeacherCode =
        FE_URL + PATH.JOIN_CLASS_INVITATION + data.inviteTeacherCode;
    }
    setClassInfo(data);
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
        <Paper sx={{ width: "25%", my: 2, ml: 4, height: 350 }}>
          <Card sx={{ mx: 6, mt: 6, mb: 2 }}>
            <CardMedia
              component="img"
              height="160"
              image={
                classInfo.coverImageUrl === ""
                  ? SRC_IMG.COVER_IMAGE_CLASS
                  : classInfo.coverImageUrl
              }
              alt="background Class"
            />
          </Card>
          <Typography sx={{ mx: 5.5, fontWeight: 500, mb: 1 }}>
            Owner
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Stack spacing={2} direction="row">
              <Avatar src={classInfo.ownerAvatar}></Avatar>
              <Typography sx={{ pt: 1 }}>{classInfo.ownerName}</Typography>
            </Stack>
          </Box>
        </Paper>
        <Paper sx={{ width: "70%", m: 2, p: 4 }}>
          <Box></Box>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="General" {...a11yProps(0)} />
                <Tab label="People" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Stack spacing={1.5}>
                <Box sx={{ display: "flex", width: "100%" }}>
                  <Typography sx={{ p: 0.5, width: "20%" }}>Name</Typography>
                  <TextField
                    sx={{ width: "75%" }}
                    multiline={true}
                    defaultValue={classInfo.name}
                    variant="standard"
                    disabled
                  />
                </Box>
                <Box sx={{ display: "flex", width: "100%" }}>
                  <Typography sx={{ p: 0.5, width: "20%" }}>Code</Typography>
                  <TextField
                    sx={{ width: "75%" }}
                    multiline={true}
                    defaultValue={classInfo.code}
                    variant="standard"
                    disabled
                  />
                </Box>
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
                  <Typography sx={{ p: 0.5, width: "20%" }}>
                    Description
                  </Typography>
                  <TextField
                    sx={{ width: "75%" }}
                    multiline={true}
                    defaultValue={classInfo.description}
                    variant="standard"
                    disabled
                  />
                </Box>
                <Box sx={{ display: "flex", width: "100%" }}>
                  <Typography sx={{ p: 0.5, width: "20%" }}>
                    Invite Teacher Link
                  </Typography>
                  <TextField
                    sx={{ width: "75%" }}
                    multiline={true}
                    defaultValue={classInfo.inviteTeacherCode}
                    variant="standard"
                    disabled
                  />
                </Box>
                <Box sx={{ display: "flex", width: "100%" }}>
                  <Typography sx={{ p: 0.5, width: "20%" }}>
                    Invite Student Link
                  </Typography>
                  <TextField
                    sx={{ width: "75%" }}
                    multiline={true}
                    defaultValue={classInfo.inviteStudentCode}
                    variant="standard"
                    disabled
                  />
                </Box>
              </Stack>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ListPeople isTeacher={true} data={classInfo}/>
              <ListPeople isTeacher={false} data={classInfo}/>

            </TabPanel>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
