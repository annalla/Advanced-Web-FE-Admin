import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { indigo } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    secondary: {
      main: "#e1e1e1",
    },
  },
});

export default function DetailAccount() {
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
              image="url(https://source.unsplash.com/random)"
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
                defaultValue=""
                variant="standard"
                disabled
              />
            </Box>
            <Box sx={{ display: "flex", width: "100%" }}>
              <Typography sx={{ p: 0.5, width: "20%" }}>Full name</Typography>
              <TextField
                sx={{ width: "75%" }}
                multiline={true}
                defaultValue=""
                variant="standard"
                disabled
              />
            </Box>
            <Box sx={{ display: "flex", width: "100%" }}>
              <Typography sx={{ p: 0.5, width: "20%" }}>Code</Typography>
              {/* <TextField
                sx={{ width: "75%" }}
                defaultValue=""
                variant="standard"
                disabled
              /> */}
              <TextField
                sx={{ width: "68%" }}
                defaultValue=""
                variant="standard"
                disabled
              />
              
              <IconButton aria-label="delete" size="small">
                <DeleteIcon fontSize="small" color="error"/>
              </IconButton>
              <IconButton aria-label="edit" size="small">
                <EditIcon fontSize="small" sx={{color:indigo[900]}} />
              </IconButton>
            </Box>{" "}
            <Box sx={{ display: "flex", width: "100%" }}>
              <Typography sx={{ p: 0.5, width: "20%" }}>Birthday</Typography>
              <TextField
                type="date"
                sx={{ width: "75%" }}
                variant="standard"
                disabled
              />
            </Box>
            <Box sx={{ display: "flex", width: "100%" }}>
              <Typography sx={{ p: 0.5, width: "20%" }}>Gender</Typography>
              <FormControl
                variant="standard"
                fullWidth
                disabled
                sx={{ width: "75%" }}
              >
                <Select labelId="genderId" id="gender" label="Gender" value={0}>
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
                defaultValue=""
                variant="standard"
                disabled
              />
            </Box>
            <Box sx={{ display: "flex", width: "100%" }}>
              <Typography sx={{ p: 0.5, width: "20%" }}>Email</Typography>
              <TextField
                sx={{ width: "75%" }}
                defaultValue=""
                variant="standard"
                disabled
              />
            </Box>
            <Box sx={{ display: "flex", width: "100%" }}>
              <Typography sx={{ p: 0.5, width: "20%" }}>
                Identity Card
              </Typography>
              <TextField
                sx={{ width: "75%" }}
                defaultValue=""
                variant="standard"
                disabled
              />
            </Box>
          </Stack>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
