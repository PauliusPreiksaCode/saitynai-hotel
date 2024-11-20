import {
    Dialog,
    DialogContent,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const FooterModal = ({open, handleClose}) => {

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
      <DialogContent style={{background: '#EFFCFF'}}>
        <Typography style={{display: 'flex', justifyContent: 'center', marginTop: '2rem', fontSize: '2rem'}}>
            Made by Paulius Preikša
        </Typography>
        <Typography style={{display: 'flex', justifyContent: 'center', marginTop: '2rem', fontSize: '2rem'}}>
            T120B165 Saityno taikomųjų programų projektavimas
        </Typography>
        <Typography style={{display: 'flex', justifyContent: 'center', marginTop: '2rem', fontSize: '2rem'}}>
            2024
        </Typography>
      </DialogContent>
    </Dialog>
    );
};

export default FooterModal;