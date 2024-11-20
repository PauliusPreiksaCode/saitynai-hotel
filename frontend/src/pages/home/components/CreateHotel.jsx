import {
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    TextField,
    Typography,
    Button,
    DialogActions,
  } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form } from 'formik';
import { hotelTemplate } from '../../../validation/hotelTemplate';
import { useCreateHotel } from '../../../hooks/hotels';

const CreateHotel = ({open, handleClose}) => {

    const createHotel = useCreateHotel();

    const initialValues = {
        breakfastPrice: 0,
        deluxePrice: 0,
        location: "",
        name: "",
        photo: "",
        standardPrice: 0,
        suitePrice: 0,
      }

    return (
        <>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <div
            style={{
            position: "absolute",
            top: "0",
            right: "0",
            padding: "0.5rem",
            cursor: "pointer",
            }}
        >
            <IconButton onClick={handleClose}>
                <CloseIcon />
            </IconButton>
        </div>
        <DialogTitle style={{background: '#EFFCFF'}}>
            <Typography variant="h4">Create hotel</Typography>
        </DialogTitle>
        <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
            await createHotel.mutateAsync({hotel: values});
            handleClose();
        }}
        validationSchema={hotelTemplate}
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
            <Form>
                <DialogContent style={{background: '#EFFCFF'}}>
                <Grid container rowSpacing={1} spacing={1}>
                  <Grid item xs={12} style={{ fontWeight: 'bold' }}>Hotel name:</Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      label="Hotel name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      fullWidth
                      error={errors.name && touched.name}
                      helperText={errors.name && touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ fontWeight: 'bold' }}>Hotel location:</Grid>
                  <Grid item xs={12}>
                      <TextField
                          name="location"
                          label="Hotel location"
                          value={values.location}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                            fullWidth
                          error={errors.location && touched.location}
                          helperText={errors.location && touched.location && errors.location}
                      />
                  </Grid>
                    <Grid item xs={12} style={{ fontWeight: 'bold' }}>Hotel photo url:</Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="photo"
                            label="Hotel photo url"
                            value={values.photo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined"
                            fullWidth
                            error={errors.photo && touched.photo}
                            helperText={errors.photo && touched.photo && errors.photo}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ fontWeight: 'bold' }}>Standard room price:</Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="standardPrice"
                            label="Standard room price"
                            value={values.standardPrice}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined"
                            fullWidth
                            type='number'
                            error={errors.standardPrice && touched.standardPrice}
                            helperText={errors.standardPrice && touched.standardPrice && errors.standardPrice}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ fontWeight: 'bold' }}>Deluxe room price:</Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="deluxePrice"
                            label="Deluxe room price"
                            value={values.deluxePrice}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined"
                            fullWidth
                            type='number'
                            error={errors.deluxePrice && touched.deluxePrice}
                            helperText={errors.deluxePrice && touched.deluxePrice && errors.deluxePrice}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ fontWeight: 'bold' }}>Suite room price:</Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="suitePrice"
                            label="Suite room price"
                            value={values.suitePrice}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined"
                            fullWidth
                            type='number'
                            error={errors.suitePrice && touched.suitePrice}
                            helperText={errors.suitePrice && touched.suitePrice && errors.suitePrice}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ fontWeight: 'bold' }}>Breakfast price:</Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="breakfastPrice"
                            label="Breakfast price"
                            value={values.breakfastPrice}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined"
                            fullWidth
                            type='number'
                            error={errors.breakfastPrice && touched.breakfastPrice}
                            helperText={errors.breakfastPrice && touched.breakfastPrice && errors.breakfastPrice}
                        />
                    </Grid>
                </Grid>
                </DialogContent>
                <DialogActions style={{background: '#EFFCFF'}}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "auto",
                        marginBottom: "1rem",
                        gap: "1rem",
                    }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                    >
                        Add hotel
                    </Button>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        color="error"
                    >
                        Cancel
                    </Button>
                </div>
                </DialogActions>
            </Form>
        )}
        </Formik>
        </Dialog>
        </>
    );
};

export default CreateHotel;
