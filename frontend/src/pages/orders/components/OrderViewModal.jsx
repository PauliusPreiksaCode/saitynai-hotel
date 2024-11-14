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

  if(getOrder.isLoading || getOrder.isFetching) {
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
      <DialogTitle>
        <Typography variant="h4">Order</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <img src={order?.hotel?.photo} alt={order?.hotel?.name} className={styles.HotelDialogPhoto} />
          </Grid>
          <Grid item xs={6}>
            <Grid item xs={12}>
              <Typography variant="h5">Hotel name: {order?.hotel?.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Location: {order?.hotel?.location}</Typography>
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
              editable={false}
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
              editable={false}
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
                label="Room type"
                editable={false}
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
      <DialogActions>
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
      </DialogActions>
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