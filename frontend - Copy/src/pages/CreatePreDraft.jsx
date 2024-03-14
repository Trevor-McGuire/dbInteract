import React, { useState } from 'react';
import { TextField, TextareaAutosize, Button, Box } from '@mui/material';
import Camera from '../components/Camera';
import Modal from '../components/Modal';
import IOSCamera from '../components/IOSCamera';

const CreatePreDraft = () => {
  const [formState, setFormState] = useState({
    title: '',
    rawDescription: '',
    quantity: 1,
    photoes: [],
  });

  const handleInputChange = (field, value) => {
    setFormState({ ...formState, [field]: value });
  };

  return (
    <Box component="form" sx={{ maxWidth: 600, margin: 'auto', mt: 3 }}>
      <TextField
        label="Title"
        type="text"
        name="title"
        value={formState.title}
        onChange={(e) => handleInputChange('title', e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextareaAutosize
        minRows={3}
        placeholder="Raw Description"
        name="rawDescription"
        value={formState.rawDescription}
        onChange={(e) => handleInputChange('rawDescription', e.target.value)}
        style={{ width: '100%', resize: 'none', marginTop: '1rem' }}
      />

      <TextField
        label="Quantity"
        type="number"
        name="quantity"
        value={formState.quantity}
        onChange={(e) => handleInputChange('quantity', e.target.value)}
        fullWidth
        margin="normal"
      />

      <Camera />
      {/* <IOSCamera /> */}

      <Modal />
    </Box>
  );
};

export default CreatePreDraft;
