import {
    Dialog,
    DialogTitle,
    IconButton,
    Typography,
    Button,
    DialogActions
} from "@mui/material";
import { useRemoveHotel } from "../../../hooks/hotels";
import CloseIcon from "@mui/icons-material/Close";

const DeleteHotel = ({open, handleClose, hotelId, handleOrderClose}) => {

    const removeHotel = useRemoveHotel();

    const handleDelete = async () => {
        await removeHotel.mutateAsync({id: hotelId});
        handleClose();
        handleOrderClose();
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
      <DialogTitle style={{background: '#EFFCFF'}}>
        <Typography style={{display: 'flex', justifyContent: 'center', marginTop: '2rem', fontSize: '2rem'}}>
            Are you sure you want to delete this hotel?
        </Typography>
      </DialogTitle>
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
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
        </div>
      </DialogActions>
    </Dialog>
    );
};

export default DeleteHotel;