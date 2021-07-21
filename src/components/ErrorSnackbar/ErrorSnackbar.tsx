import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";
import { setAppErrorAC } from "../../state/app-reducer";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function ErrorSnackbar() {
  // const [open, setOpen] = React.useState(true)
  const dispatch=useDispatch()

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setAppErrorAC(null))
    //  setOpen(false)
  };
  
  const error = useSelector<AppRootStateType, string | null>(
    (state) => state.app.error
  );
//   const isOpen = error !== null;
  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {/* This is a success message! */}
        {error}
      </Alert>
    </Snackbar>
  );
}
