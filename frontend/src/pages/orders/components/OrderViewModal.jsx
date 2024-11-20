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
  DialogActions,
  Button
} from "@mui/material";
import { useGetOrderById } from "../../../hooks/order";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import styles from "./Modal.module.css";
import ViewComments from "../../comments/ViewComments";

const OrderViewModal = ({open, handleClose, hotelId, orderId}) => {

  const [order, setOrder] = useState(null);
  const [openComments, setOpenComments] = useState(false);

  const getOrder = useGetOrderById(hotelId, orderId);

  useEffect(() => {
    setOrder(getOrder.data);
  }, [getOrder.data]);

  if(getOrder.isLoading || getOrder.isFetching || !order) {
    return <CircularProgress />
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
        <Typography fontSize={35}>Order</Typography>
      </DialogTitle>
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
            <TextField
              fullWidth
              name="dayCount"
              label="Number of days"
              type="number"
              value={order?.period}
              variant="outlined"
            />
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
              value={order?.peopleCount}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            Room type
          </Grid>
          <Grid item xs={12}>
            <FormControl
              variant="outlined"
              fullWidth
            >
              <InputLabel id="Type">Room type</InputLabel>
              <Select
                labelId="Type"
                name="roomType"
                value={order?.roomType}
                defaultValue={0}
                label="Room type"
              >
                <MenuItem value="0">Standard</MenuItem>
                <MenuItem value="1">Deluxe</MenuItem>
                <MenuItem value="2">Suite</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            Breakfast
          </Grid>
          <Grid item xs={12}>
            <ToggleButton
              value={order?.breakfast}
              selected={order?.breakfast}
            >
              <CheckIcon />
            </ToggleButton>
          </Grid>
          <Grid item xs={6}>
            Total price: {order?.price}
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
            variant="contained"
            color="primary"
            onClick={() => setOpenComments(true)}
          >
            View comments
          </Button>
        </div>
      </DialogActions >
    </Dialog>
    {openComments && (
      <ViewComments 
        open={openComments} 
        handleClose={() => setOpenComments(false)} 
        hotelId={hotelId} orderId={orderId} 
      />
    )}
  </>
  )
};

export default OrderViewModal;