/* eslint-disable no-unused-vars, react/prop-types */

import { useRemoveOrder } from "../../../hooks/order";
import {
    Dialog,
    DialogTitle,
    IconButton,
    Typography,
    Button,
    DialogActions
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";


const OrderDeleteModal = ({open, handleClose, hotelId, orderId}) => {

  const removeOrder = useRemoveOrder();

  const handleDelete = () => {
    removeOrder.mutateAsync({hotelId, orderId});
    handleClose();
  }

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
      <DialogTitle>
        <Typography variant="h4">Ar tikrai norite ištrinti užsakymą?</Typography>
      </DialogTitle>
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
          <Button onClick={handleDelete} variant="contained" color="error">
            Ištrinti
          </Button>
          <Button onClick={handleClose} variant="contained">
            Atšaukti
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  )
};

export default OrderDeleteModal;