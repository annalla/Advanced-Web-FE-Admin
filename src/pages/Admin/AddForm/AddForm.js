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
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";

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

export default function AddForm({ closeForm }) {
  const [open, setOpen] = React.useState(true);
  const [birthday, setBirthday] = React.useState("1989-01-01");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    setOpen(false);
    closeForm();
  };

  const onSubmit = async (data) => {};
  const { ref, ...inputProps } = register("username", {
    required: "Username is required",
  });

  const handleBirthday = (event) => {
    setBirthday(event.target.value);
  };
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
                        error={!!errors.username}
                        label="Username"
                        helperText={errors?.username?.message}
                        inputRef={ref}
                        {...inputProps}
                        fullWidth
                        required
                      />
                      <TextField
                        name="code"
                        label="Code"
                        inputRef={register("code")}
                        {...register("code")}
                        fullWidth
                        required
                      />
                      <TextField
                        name="fullname"
                        label="Full Name"
                        inputRef={register("fullname")}
                        {...register("fullname")}
                        fullWidth
                        required
                      />
                       <TextField
                        name="password"
                        label="Password"
                        inputRef={register("password")}
                        {...register("password")}
                        fullWidth
                        required
                      />
                       <TextField
                        name="retypePassword"
                        label="Retype Password"
                        inputRef={register("retypePassword")}
                        {...register("retypePassword")}
                        fullWidth
                        required
                      />
                      <TextField
                        name="email"
                        label="Email"
                        inputRef={register("email")}
                        {...register("email")}
                        fullWidth
                        required
                      />
                      <TextField
                        name="phone"
                        label="Phone"
                        inputRef={register("phone")}
                        {...register("phone")}
                        fullWidth
                        required
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
                          // onChange={handleUploadFile}
                        />{" "}
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {/* {uploadFile && <img alt="avatarImage" id="previewImage" src={preview} width="150" height="150"/>} */}
                    </Grid>
                    <TextField
                      fullWidth
                      id="birthday"
                      type="date"
                      label="Birthday"
                      name="birthday"
                      autoComplete="birthday"
                      value={birthday}
                      onChange={handleBirthday}
                    />
                    <FormControl variant="standard" fullWidth>
                      <InputLabel id="genderInputLabel">Gender</InputLabel>
                      <Select labelId="genderId" id="gender" label="Gender">
                        <MenuItem value={0}>
                          None
                        </MenuItem>
                        <MenuItem value={1}>Male</MenuItem>
                        <MenuItem value={2}>Female</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                        name="identityCard"
                        label="Identity Card"
                        inputRef={register("identityCard")}
                        {...register("identityCard")}
                        fullWidth
                        
                      />
                    <Grid container justifyContent="center">
                      {/* <FormHelperText error>{errorResponse}</FormHelperText> */}
                    </Grid>
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
