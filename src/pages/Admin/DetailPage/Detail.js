import * as React from 'react';
import Box from '@mui/material/Box';
import { MenuAdmin } from '../../../components/Menu/MenuAdmin';
import Nav from '../../../components/Nav/Nav';
import DetailAccount from './DetailAccount/DetailAccount';
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { splitPathToGetId } from '../../../utils/util';
import Loading from '../../../components/Loading/Loading';
import { GetAdminById } from '../../../apis/admin';
import {ERROR_CODE} from '../../../constants/errorCode';
import { Alert } from '@mui/material';
import { AlertTitle } from '@mui/material';

export default function Detail() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const location=useLocation();
  const id=splitPathToGetId(location.pathname,"/admins/");
  const dataAccount={
    avatar:"",
    email:"",
    phone:"",
    username:"",
    name:""
  }
  const [data,setData]=useState(dataAccount);

  useEffect(()=>{
    GetAdminById(id)
    .then(async (res) => {
      if (res.status === 1) {
        setData(res.data);
        setLoading(false);
      } else {
        setError(ERROR_CODE[res.code]);
      }
    })
    .catch((error) => setError("Some errors happen!"));
  setLoading(false);
  },[id])
  return (
    <Box sx={{ display: 'flex',width:"100%"}}>
      <MenuAdmin isAdmin={true} isClass={false} isUser={false}/>
      <Box sx={{width:"83%"}}>
        <Nav/>
        {loading ? <Loading /> : ""}
        {error ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>{error}</strong>
          </Alert>
        ) : (
         ""
        )}
        <DetailAccount data={data}/>
      </Box>
    </Box>
  );
}
