import { styled } from '@mui/material/styles';

export const UploadFileContainer = styled('div')(() => ({
  backgroundColor: '#f7fff7',
  width: '420px',
  padding: '30px 60px',
  borderRadius: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 10px 20px, rgba(0, 0, 0, 0.28) 0px 6px 6px',
}));
export const DragFileArea = styled('div')(() => ({
  border: '2px dashed #7b2cbf',
  borderRadius: '40px',
  margin: '10px 0 15px',
  padding: '30px 50px',
  width: '350px',
  textAlign: 'center',
}));

export const CannotUploadMessage = styled('span')(() => ({
  backgroundColor: '#ffc6c4',
  fontSize: '17px',
  display: 'flex',
  alignItems: 'center',
  margin: ' 5px 0',
  padding: ' 5px 10px 5px 30px',
  borderRadius: '5px',
  color: '#BB0000',
}));

export const FileBlock = styled('div')(() => ({
  color: '#f7fff7',
  backgroundColor: '#7b2cbf',
  transition: ' all 1s',
  width: '390px',
  position: 'relative',
  display: 'none',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: ' 10px 0 15px',
  padding: '10px 20px',
  borderRadius: '25px',
  cursor: 'pointer',
}));

export const ProgressBar = styled('div')(() => ({
  display: 'flex',
  position: 'absolute',
  bottom: 0,
  left: '4.5%',
  width: 0,
  height: '5px',
  borderRadius: '25px',
  backgroundColor: '#4BB543',
}));

export const UploadButton = styled('button')(() => ({
  fontFamily: 'Montserrat',
  backgroundColor: '#7b2cbf',
  color: '#f7fff7',
  display: 'flex',
  alignItems: 'center',
  fontSize: '18px',
  border: 'none',
  borderRadius: '20px',
  margin: '10px',
  padding: '7.5px 50px',
  cursor: 'pointer',
}));
