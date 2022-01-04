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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 0,
};

export default function AddForm({ closeForm }) {
  const [open, setOpen] = React.useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    setOpen(false);
    closeForm();
  };
  const onSubmit = async () => {};
  const { ref, ...inputProps } = register("classname", {
    required: "Classname is required",
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
                Add a Class
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  name="classname"
                  error={!!errors.classname}
                  label="Class name"
                  helperText={errors?.classname?.message}
                  sx={{ mt: 3 }}
                  inputRef={ref}
                  {...inputProps}
                  fullWidth
                  required
                />
                <TextField
                  name="code"
                  sx={{ mt: 3 }}
                  label="Code"
                  inputRef={register("code")}
                  {...register("code")}
                  fullWidth
                  required
                />
                <TextField
                  name="description"
                  id="description"
                  sx={{ mt: 3 }}
                  label="Description (Option)"
                  inputRef={register("description")}
                  {...register("description")}
                  fullWidth
                />
                <Grid container id="imageContainer">
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      component="label"
                      id="coverImage"
                    >
                      {" "}
                      Cover Image{" "}
                      <input
                        type="file"
                        hidden
                        // onChange={handleUploadFile}
                      />{" "}
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* {uploadFile && <img alt="coverImage" id="previewImage" src={preview} width="150" />} */}
                  </Grid>
                </Grid>
                <Grid container justifyContent="center">
                  {/* <FormHelperText error>{errorResponse}</FormHelperText> */}
                </Grid>
                <Grid container justifyContent="flex-end">
                  <Button
                    sx={{ mt: 3 }}
                    color="primary"
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
                    Add
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
