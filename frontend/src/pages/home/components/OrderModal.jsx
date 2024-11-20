/* eslint-disable no-unused-vars, react/prop-types */

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    ToggleButton,
    Typography,
  } from "@mui/material";
import { Form, Formik } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../Home.module.css";
import { bookingValidation } from "../../../validation/bookingValidation";
import CheckIcon from "@mui/icons-material/Check";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState, useContext } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../../constants/routePaths";
import { UserContext } from "../../../services/authProvider";
import { createOrder } from "../../../services/api";
import DeleteHotel from "./DeleteHotel";
import EditHotel from "./EditHotel";
  
const OrderModal = ({ open, setOpen, hotel }) => {
    const [startDate, setStartDate] = useState(dayjs(new Date()));
    const [endDate, setEndDate] = useState(dayjs(new Date()));
    const [price, setPrice] = useState(20);
    const [deleteHotel, setDeleteHotel] = useState(false);
    const [editHotel, setEditHotel] = useState(false);
    const navigate = useNavigate();

    const userCtx = useContext(UserContext);
    const userRole = userCtx?.user?.decodedJwt?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    const initialValues = {
        peopleCount: 0,
        roomType: "0",
        breakfast: false,
        startDate: dayjs(new Date()),
        endDate: dayjs(new Date()),
    };

    const handleFormChange = async (values) => {

        const valuesForPrice = {
            peopleCount: values.peopleCount,
            roomType: Number(values.roomType),
            breakfast: values.breakfast,
            period: dayjs(values.endDate).startOf('day').diff(dayjs(values.startDate).startOf('day'), 'day')
        };

        let price = 20;
        if (Number(valuesForPrice.roomType) === 0) price += hotel.standardPrice * valuesForPrice.period;
        if (Number(valuesForPrice.roomType) === 1) price += hotel.deluxePrice * valuesForPrice.period;
        if (Number(valuesForPrice.roomType) === 2) price += hotel.suitePrice * valuesForPrice.period;
        if (valuesForPrice.breakfast) price += hotel.breakfastPrice * valuesForPrice.period * valuesForPrice.peopleCount;

        setPrice(price);
    };

    const handleClose = (resetForm) => {
        resetForm();
        setStartDate(dayjs(new Date()));
        setEndDate(dayjs(new Date()));
        setPrice(20);
        setOpen(false);
    }

    return (
        <>
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <div
            style={{
                position: "absolute",
                top: "0",
                right: "0",
                padding: "0.5rem",
                cursor: "pointer",
            }}
        >
            <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
            </IconButton>
        </div>
        <DialogTitle style={{background: '#EFFCFF'}}>
            <Typography fontSize={35}>Book a hotel</Typography>
        </DialogTitle>
        <Formik
            initialValues={initialValues}
            onSubmit={ async (values) => {

                const period = dayjs(values.endDate).startOf('day').diff(dayjs(values.startDate).startOf('day'), 'day')
                const order = {
                    roomType: Number(values.roomType),
                    breakfast: values.breakfast,
                    orderDate: new Date().toISOString(),
                    peopleCount: values.peopleCount,
                    period: period,
                };

                await createOrder(hotel.id, order);

                setOpen(false);

                if (userRole === "Admin") 
                    navigate('/hotelOrders') 
                else
                    navigate(ROUTE_PATHS.ORDERS);
            }}
            validationSchema={bookingValidation}
        >
            {({
                values,
                handleBlur,
                errors,
                touched,
                isSubmitting,
                setFieldValue,
                resetForm,
            }) => (
            <Form>
                <DialogContent style={{background: '#EFFCFF'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <img src={hotel?.photo} alt={hotel?.name} className={styles.HotelDialogPhoto} />
                        </Grid>
                        <Grid item xs={6}>
                            <Grid item xs={12}>
                                <Typography variant="h5" style={{ borderBottom: '.1rem solid grey'}}>Hotel name: {hotel?.name}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" style={{ borderBottom: '.1rem solid grey'}}>Location: {hotel?.location}</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h5" style={{ borderBottom: '.1rem solid grey'}}>Standard price: {hotel?.standardPrice}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" style={{ borderBottom: '.1rem solid grey'}}>Deluxe price: {hotel?.deluxePrice}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" style={{ borderBottom: '.1rem solid grey'}}>Suite price: {hotel?.suitePrice}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" style={{ borderBottom: '.1rem solid grey'}}>Breakfast price: {hotel?.breakfastPrice}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            Stay duration
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        fullWidth
                                        disablePast
                                        name="startDate"
                                        label="Start date"
                                        value={dayjs(startDate)}
                                        onChange={(newValue) => {
                                            setStartDate(newValue);
                                            setFieldValue("startDate", newValue);
                                            handleFormChange({ ...values, startDate: newValue });
                                        }}
                                        sx={{ marginRight: "1rem"}}
                                    />
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        fullWidth
                                        disablePast
                                        name="endDate"
                                        label="End date"
                                        minDate={dayjs(startDate)}
                                        value={dayjs(endDate)}
                                        onChange={(newValue) => {
                                            setEndDate(newValue);
                                            setFieldValue("endDate", newValue);
                                            handleFormChange({ ...values, endDate: newValue });
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        <Grid item xs={6}>
                            Number of people
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="peopleCount"
                                label="Number of people"
                                type="number"
                                value={values.peopleCount}
                                onChange={(e) => {
                                    setFieldValue("peopleCount", Number(e.target.value));
                                    handleFormChange({ ...values, peopleCount: Number(e.target.value) });
                                }}
                                onBlur={handleBlur}
                                variant="outlined"
                                error={errors.peopleCount && touched.peopleCount}
                                helperText={errors.peopleCount && touched.peopleCount ? errors.peopleCount : " "}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            Room type
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl
                                variant="outlined"
                                fullWidth
                                error={errors.roomType && touched.roomType}
                            >
                                <InputLabel id="Type">Room type</InputLabel>
                                <Select
                                    labelId="Type"
                                    name="roomType"
                                    value={values.roomType}
                                    onChange={(e) => {
                                        setFieldValue("roomType", e.target.value);
                                        handleFormChange({ ...values, roomType: e.target.value});
                                    }}
                                    onBlur={handleBlur}
                                    label="Room type"
                                >
                                    <MenuItem value="0">Standard</MenuItem>
                                    <MenuItem value="1">Deluxe</MenuItem>
                                    <MenuItem value="2">Suite</MenuItem>
                                </Select>
                                {errors.roomType && touched.roomType && (
                                    <FormHelperText>{errors.roomType}</FormHelperText>
                                )}
                            </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                Breakfast
                            </Grid>
                            <Grid item xs={12}>
                                <ToggleButton
                                    value={values.breakfast}
                                    selected={values.breakfast}
                                    onChange={() => {
                                        setFieldValue("breakfast", !values.breakfast)
                                        handleFormChange({ ...values, breakfast: !values.breakfast });
                                    }}
                                >
                                    <CheckIcon />
                                </ToggleButton>
                        </Grid>
                        <Grid item xs={6}>
                            Total price: {price > 0 ? price : "Wrong data"}
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
                    { (userRole === "Admin" || userRole === "Client") && 
                        <Button
                            type="submit"
                            disabled={isSubmitting || price <= 0}
                            variant="contained"
                            color="success"
                        >
                            Add reservation
                        </Button>
                    }
                    { (userRole === "Admin" || userRole === "HotelPersonnel") && 
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => setDeleteHotel(true)}
                        >
                            Delete Hotel
                        </Button>
                    }
                    { (userRole === "Admin" || userRole === "HotelPersonnel") &&
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={() => setEditHotel(true)}
                        >
                            Edit Hotel
                        </Button>
                    }
                    <Button
                        onClick={() => handleClose(resetForm)}
                        variant="contained"
                        color="primary"
                    >
                        Cancel
                    </Button>
                </div>
                </DialogActions>
            </Form>
            )}
        </Formik>
        </Dialog>
        {deleteHotel && (
            <DeleteHotel 
                open={deleteHotel} 
                handleClose={() => setDeleteHotel(false)} 
                hotelId={hotel.id}
                handleOrderClose={() => setOpen(false)}
            />
        )}
        {editHotel && (
            <EditHotel 
                open={editHotel} 
                handleClose={() => setEditHotel(false)} 
                id={hotel.id}
                handleOrderClose={() => setOpen(false)}
            />
        )}
        </>
    );
};

export default OrderModal;
