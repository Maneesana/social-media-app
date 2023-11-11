import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '800px',
  height: '700px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  p: 4,
};

interface ICommonModalProps {
  children: React.ReactNode;
  isModalOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  modalHandler: (action: 'close') => void;
}

export default function CommonModal({ children, modalHandler, isModalOpen }: ICommonModalProps) {
  return (
    <Modal
      open={isModalOpen}
      onClose={() => modalHandler('close')}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
}
