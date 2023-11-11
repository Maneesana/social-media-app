import { createContext, useCallback, useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { type AlertColor, Snackbar, Alert, Slide, type SnackbarCloseReason } from '@mui/material';

import { ErrorMessages, Severity } from '../enum';

// eslint-disable-next-line no-unused-vars
export type ISnackBar = (message: string, severity: AlertColor, duration?: number) => void;
interface ISnackbarContext {
  snackbarShowMessage: ISnackBar;
}
interface ISnackbarProvider {
  children: React.ReactNode;
}

export const SnackbarContext = createContext<ISnackbarContext>({} as ISnackbarContext);

export const SnackbarProvider = ({ children }: ISnackbarProvider) => {
  // split message if it is more than 1 error messages
  const renderMessage = (message: string) => {
    let updatedMessage = message;
    // check if message is empty
    if (!updatedMessage)
      return severity === Severity.Error ? ErrorMessages.FallbackMessage : 'Success';

    if (updatedMessage.includes(ErrorMessages.ErrorMessage))
      updatedMessage = ErrorMessages.FallbackMessage;

    if (updatedMessage.split('*|').length <= 1) {
      return updatedMessage;
    }
    return (
      <ul>
        {' '}
        {updatedMessage.split('*|').map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>('Im a custom snackbar');

  const [duration, setDuration] = useState(3000);
  const [severity, setSeverity] = useState<AlertColor>('success');

  const snackbarShowMessage: ISnackBar = (
    message: string,
    severity: AlertColor,
    duration = 3000,
  ) => {
    setMessage(message);
    setSeverity(severity);
    setDuration(duration);
    setOpen(true);
  };

  const handleClose = (
    event: Event | React.SyntheticEvent<Element, Event>,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const SnackbarPortal = useCallback(
    () =>
      ReactDOM.createPortal(
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          autoHideDuration={duration}
          open={open}
          onClose={handleClose}
          TransitionComponent={Slide}
        >
          <Alert variant='filled' onClose={handleClose} severity={severity}>
            {renderMessage(message)}
          </Alert>
        </Snackbar>,
        document.body,
      ),
    [open, message, duration],
  );

  const contextValue = useMemo(() => ({ snackbarShowMessage }), [snackbarShowMessage]);

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <SnackbarPortal />
    </SnackbarContext.Provider>
  );
};
