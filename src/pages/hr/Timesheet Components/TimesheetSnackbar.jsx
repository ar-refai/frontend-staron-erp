import { Alert, Snackbar } from "@mui/material";

const CustomizedSnackbars = ({ open, handleClose, severity, message }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomizedSnackbars;