/* eslint-disable no-unused-vars, react/prop-types */

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  CircularProgress,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButton,
  FormHelperText,
  DialogActions,
  Button
} from "@mui/material";
import { useGetOrderById } from "../../../hooks/order";
import { updateOrder } from "../../../services/api";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import styles from "./Modal.module.css";
import dayjs from "dayjs";
import { bookingValidation } from "../../../validation/bookingValidation";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Form, Formik } from "formik";


const OrderEditModal = ({open, handleClose, hotelId, orderId}) => {

    const [order, setOrder] = useState(null);
    const [price, setPrice] = useState(order?.price);
    const getOrder = useGetOrderById(hotelId, orderId);
    const [startDate, setStartDate] = useState(dayjs(new Date()));
    const [endDate, setEndDate] = useState(dayjs(new Date()));

    useEffect(() => {
        const data = getOrder.data;
        setOrder(data);
        setPrice(data?.price);
        setStartDate(dayjs(data?.orderDate));
        setEndDate(dayjs(data?.orderDate).add(data?.period, 'day'));

    }, [getOrder.data]);

    if(getOrder.isLoading || getOrder.isFetching) {
        return <CircularProgress />
    }

    const initialValues = order
    ? {
        peopleCount: order?.peopleCount,
        roomType: order?.roomType,
        breakfast: order?.breakfast,
        startDate: dayjs(order?.orderDate),
        endDate: dayjs(order?.orderDate).add(order?.period, "day"),
      }
    : null;

  if (!order) {
    return null;
  }

    const handleFormChange = async (values) => {

        const valuesForPrice = {
            peopleCount: values.peopleCount,
            roomType: Number(values.roomType),
            breakfast: values.breakfast,
            period: dayjs(values.endDate).startOf('day').diff(dayjs(values.startDate).startOf('day'), 'day')
        };

        let price = 20;
        if (Number(valuesForPrice.roomType) === 0) price += order?.hotel?.standardPrice * valuesForPrice.period;
        if (Number(valuesForPrice.roomType) === 1) price += order?.hotel?.deluxePrice * valuesForPrice.period;
        if (Number(valuesForPrice.roomType) === 2) price += order?.hotel?.suitePrice * valuesForPrice.period;
        if (valuesForPrice.breakfast) price += order?.hotel?.breakfastPrice * valuesForPrice.period * valuesForPrice.peopleCount;

        setPrice(price);
    };

    return (
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
            <Typography variant="h4">Edit order</Typography>
        </DialogTitle>
        <Formik
            initialValues={initialValues}
            onSubmit={ async (values) => {

                const period = dayjs(values.endDate).startOf('day').diff(dayjs(values.startDate).startOf('day'), 'day')
                const newOrder = {
                    roomType: Number(values.roomType),
                    breakfast: values.breakfast,
                    orderDate: new Date().toISOString(),
                    peopleCount: values.peopleCount,
                    period: period,
                };

                const hotelId = order?.hotel?.id;
                const orderId = order?.id;

                await updateOrder(hotelId, orderId, newOrder);
                handleClose();
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
                            <img src={order?.hotel?.photo} alt={order?.hotel?.name} className={styles.HotelDialogPhoto} />
                        </Grid>
                        <Grid item xs={6}>
                        <Grid item xs={12}>
                            <Typography variant="h5" style={{ borderBottom: '.1rem solid grey'}}>Hotel name: {order?.hotel?.name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" style={{ borderBottom: '.1rem solid grey'}}>Location: {order?.hotel?.location}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" style={{ borderBottom: '.1rem solid grey'}}>Standard price: {order?.hotel?.standardPrice}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" style={{ borderBottom: '.1rem solid grey'}}>Deluxe price: {order?.hotel?.deluxePrice}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" style={{ borderBottom: '.1rem solid grey'}}>Suite price: {order?.hotel?.suitePrice}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" style={{ borderBottom: '.1rem solid grey'}}>Breakfast price: {order?.hotel?.breakfastPrice}</Typography>
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
                                initialValues={initialValues.peopleCount}
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
                                    initialValues={initialValues.roomType}
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
                                    initialValues={initialValues.breakfast}
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
                        <Button
                            type="submit"
                            disabled={isSubmitting || price <= 0}
                            variant="contained"
                            color="success"
                        >
                            Update reservation
                        </Button>
                    <Button
                        onClick={() => handleClose(resetForm)}
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
    );

};

export default OrderEditModal;