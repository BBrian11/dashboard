import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';


const ConfirmDialog = (props) => {
    const { title, body, open, setOpen, onConfirm } = props;

    const handleCancel = () => {
        setOpen(false);
    }

    const handleConfirm = () => {
        setOpen(false);
        onConfirm();
    }

    return (
        <Dialog
            open={open}
            onClose={handleCancel}
            fullWidth={true}>
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {body}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="primary" autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog;

ConfirmDialog.defaultProps = {
    setOpen: () => { },
    onConfirm: () => { },
    open: false,
    title: 'Default title',
    body: 'Default text'
}