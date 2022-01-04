import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';


const theme = createTheme({
  palette: {
      secondary: {
          main: '#e1e1e1',
      },
  },
});

export default function DetailAccount() {
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ minHeight:580,width: "100%",display:"flex", backgroundColor: 'secondary.main', }}>
        <Paper sx={{width:"25%",my:2,ml:4,height:300}} >
        <Card sx={{ m:6}}>
      <CardMedia
        component="img"
        height="160"
        image="url(https://source.unsplash.com/random)"
        alt="green iguana"
      />
    </Card>
        </Paper >
        <Paper sx={{width:"70%",m:2,p:4}} >
          <Box sx={{display:"flex"}}>
          <Typography sx={{p:0.5,width:100}}>djfhj</Typography>
          <TextField  defaultValue="jdkjf" variant="standard" disabled/>
          </Box>
        </Paper>
    </Box>
    </ThemeProvider>
  );
}
