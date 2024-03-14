import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Modal = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNextClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleWearhousing = () => {
    setIsModalOpen(false);
    navigate('/wearhousing');
  };

  const handleAnotherPreDraft = () => {
    setIsModalOpen(false);
    // reaload the page
    window.location.reload();
  };

  const handleDiscardPreDraft = () => {
    setIsModalOpen(false);
    navigate('/dashboard');
  };

  return (
    <div>
      <Button variant="contained" onClick={handleNextClick}>Next</Button>

      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Modal Title"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* Your modal content goes here */}
            <Button variant="contained" onClick={handleAnotherPreDraft}>Create Another PreDraft</Button>
            <Button variant="contained" onClick={handleWearhousing}>Move to Wearhousing</Button>
            <Button variant="contained" onClick={handleCloseModal}>Go Back</Button>
            <Button variant="contained" onClick={handleDiscardPreDraft}>Discard this draft</Button>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* You can place additional actions or buttons here */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
