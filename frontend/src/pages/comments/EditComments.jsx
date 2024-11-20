import { useState } from 'react';
import { useUpdateComment } from '../../hooks/comments';
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

const EditComments = ({open, handleClose, hotelId, orderId, comment}) => {

    const [commentText, setCommentText] = useState(comment?.text);
    const updateComment = useUpdateComment();

    const handleUpdate = () => {
        updateComment.mutateAsync({hotelId, orderId, commentId: comment.id, comment: {text: commentText}});
    }

    return(
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
            <Typography style={{fontSize: '2rem'}}>Edit Comment</Typography>
        </DialogTitle>
        <DialogContent style={{background: '#EFFCFF'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        rows={2}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
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
                    size='large'
                    variant="contained"
                    color="primary"
                    onClick={handleUpdate}
                >
                    Update
                </Button>
            </div>
        </DialogActions>
        </Dialog>
        </>
    )
}

export default EditComments;