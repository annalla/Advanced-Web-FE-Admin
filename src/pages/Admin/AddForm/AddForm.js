import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";
import { validateEmail, checkPhone } from "../../../utils/util";
import { FormHelperText } from "@mui/material";
import { CreateAdmin } from "../../../apis/admin";
import { ERROR_CODE } from "../../../constants/errorCode";
// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   // textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 0,
};

export default function AddForm({ AddAdmin, closeForm }) {
  const [open, setOpen] = React.useState(true);
  const [password, setPassword] = React.useState("");
  const [uploadFile, setUploadFile] = useState();
  const [preview, setPreview] = useState();
  const [error,setError]=useState(null)

  const handleUploadFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setUploadFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setUploadFile(e.target.files[0]);
  };
  useEffect(() => {
    if (!uploadFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(uploadFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [uploadFile]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    setOpen(false);
    closeForm();
  };

  const onSubmit = async (data) => {
    const dataArray = new FormData();
    dataArray.append("username", data.username);
    dataArray.append("password", data.password);
    dataArray.append("retypePassword", data.retypePassword);
    dataArray.append("name", data.name);
    dataArray.append("email", data.email);
    dataArray.append("phone", data.phone);
    dataArray.append("avatar", uploadFile);
    console.log(dataArray);
    CreateAdmin(dataArray)
    .then(async(res)=>{
      if(res.status===1){
        AddAdmin(res.data);
        console.log(res.data);
        closeForm();
      }
      else{
        setError(ERROR_CODE[res.code])
      }
    }).catch((error)=>setError("Register failed"))

  };

  const { ref, ...inputProps } = register("username", {
    required: "Username is required",
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card sx={{ width: "100%" }}>
            <CardContent>
              <Typography sx={{ fontSize: 18 }} gutterBottom>
                Add An Admin
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    <Stack spacing={1.5}>
                      <TextField
                        name="username"
                        label="Username"
                        error={!!errors.username}
                        helperText={errors?.username?.message}
                        inputRef={ref}
                        {...inputProps}
                        fullWidth
                        required
                      />
                      <TextField
                        name="name"
                        label="Full Name"
                        inputRef={register("name")}
                        {...register("name")}
                        fullWidth
                        required
                      />
                      <TextField
                        name="password"
                        label="Password"
                        type="password"
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                        inputRef={register("password")}
                        {...register("password", {
                          validate: {
                            check: (v) =>
                              v.length >= 4 || "Length of Password >= 4",
                          },
                        })}
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <TextField
                        type="password"
                        name="retypePassword"
                        label="Retype Password"
                        error={!!errors.retypePassword}
                        helperText={errors?.retypePassword?.message}
                        inputRef={register("retypePassword")}
                        {...register("retypePassword", {
                          validate: {
                            check: (v) =>
                              v === password ||
                              "Password and RetypePassword are not matched",
                          },
                        })}
                        fullWidth
                        required
                      />
                      <TextField
                        name="email"
                        label="Email"
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                        inputRef={register("email")}
                        {...register("email", {
                          validate: {
                            check: (v) =>
                              validateEmail(v) === true || "Email is not Valid",
                          },
                        })}
                        fullWidth
                        required
                      />
                      {/* <TextField
                        name="email"
                        label="Email"
                        // error={validateEmail}
                        inputRef={register("email")}
                        {...register("email")}
                        fullWidth
                        required
                      /> */}
                      <TextField
                        name="phone"
                        label="Phone"
                        error={!!errors.phone}
                        helperText={errors?.phone?.message}
                        inputRef={register("phone")}
                        {...register("phone", {
                          validate: {
                            check: (v) =>
                              checkPhone(v) === true || "Phone is not Valid",
                          },
                        })}
                        fullWidth
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1.5}>
                      <Grid item xs={12} sm={6}>
                        <Button
                          variant="contained"
                          component="label"
                          id="avatarImage"
                        >
                          {" "}
                          Avatar{" "}
                          <input
                            type="file"
                            hidden
                            onChange={handleUploadFile}
                          />{" "}
                        </Button>
                         <Grid item xs={12} sm={6}>
                        {uploadFile && <img alt="avatarImage" id="previewImage" src={preview} width="150" height="150"/>}
                      </Grid>
                      </Grid>
                     {error?<Grid container justifyContent="center">
                        <FormHelperText error>{error}</FormHelperText>
                      </Grid>:""}
                      
                    </Stack>
                  </Grid>
                </Grid>

                <Grid container justifyContent="flex-end">
                  <Button
                    sx={{ mt: 3 }}
                    color="error"
                    variant="outlined"
                    onClick={closeForm}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{ mt: 3, ml: 2 }}
                    color="primary"
                    type="submit"
                    variant="outlined"
                    // fullWidth
                  >
                    Register
                  </Button>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}
