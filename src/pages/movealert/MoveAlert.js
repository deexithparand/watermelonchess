import React, { useState } from 'react';
import { forwardRef } from 'react';
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from '@mui/material';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MoveAlert({ snackBarAlert, snackBarOpenState, closeSnackBar }) {

  return (
    <>
      {/* SnackBar Component */}
      <Snackbar
        open={snackBarOpenState}
        autoHideDuration={2000}
        onClose={closeSnackBar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={closeSnackBar} severity="warning">
          {snackBarAlert}
        </Alert>
      </Snackbar>
    </>
  );
}

export default MoveAlert;
