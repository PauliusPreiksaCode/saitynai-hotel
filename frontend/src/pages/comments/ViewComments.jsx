import { useContext, useEffect, useState } from "react"
import { useGetComments, useCreateComment, useRemoveComment } from "../../hooks/comments";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    TextField,
    CircularProgress,
    Typography,
    Button,
    DialogActions,
  } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EditComments from "./EditComments";
import { UserContext } from "../../services/authProvider";


const ViewComments = ({open, handleClose, hotelId, orderId}) => {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [editComment, setEditComment] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);

    const getComments = useGetComments(hotelId, orderId);
    const createComment = useCreateComment();
    const removeComment = useRemoveComment();

    const userCtx = useContext(UserContext);
    const username = userCtx?.user?.decodedJwt?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]

    useEffect(() => {
        setComments(getComments.data);
    }, [getComments.data]);

    if(getComments.isLoading || getComments.isFetching) {
        return <CircularProgress />
    }

    const handleDelete = (commentId) => {
        removeComment.mutateAsync({hotelId, orderId, commentId});
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
        <DialogTitle>
            <Typography variant="h4">Comments</Typography>
        </DialogTitle>
        <DialogContent>
            <Grid containerstyle={{margin: '0.5rem'}}>
                {comments?.map((comment) => (
                    <Grid container key={comment.id} style={{margin: '0.5rem'}}>
                    <Grid item xs={11}>
                        <TextField
                            fullWidth
                            value={`${comment.username}: ${comment.text} (${comment.modifiedAt.split('T')[0]})`}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {username === comment.username && (
                        <>
                            <IconButton
                                onClick={() => handleDelete(comment.id)}
                            >
                                <DeleteForeverIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    setEditComment(comment); 
                                    setOpenEdit(true)}}
                                >
                                <EditNoteIcon />
                            </IconButton>
                        </>
                        )}
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            <Grid container>
                <Grid item xs={11} style={{ margin: 'auto'}}>
                    <TextField
                        multiline
                        fullWidth
                        rows={4}
                        label="Comment"
                        variant="outlined"
                        onChange={(e) => setComment(e.target.value)}
                        style={{ margin: "1rem" }}
                    />
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
                onClick={() => {
                    const data = {
                            "text": comment
                        }
                        createComment.mutateAsync({hotelId, orderId, comment: data});
                    }}
            >
                Add Comment
            </Button>
            </div>
        </DialogActions>
        </Dialog>
        {openEdit && (
            <EditComments 
                open={openEdit} 
                handleClose={() => setOpenEdit(false)} 
                hotelId={hotelId} 
                orderId={orderId} 
                comment={editComment}
            />
        )}
        </>
    );
}

export default ViewComments;