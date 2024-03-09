import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

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
  }

  const handleAnotherPreDraft = () => {
    setIsModalOpen(false);
    // reaload the page
    window.location.reload();
  }

  const handleDiscardPreDraft = () => {
    setIsModalOpen(false);
    navigate('/dashboard');
  }

  return (
    <div>
      <button type="button" onClick={handleNextClick}>Next</button>

      {isModalOpen && (
        <div className="modal">
          {/* Your modal content goes here */}
          <div className="modal-content">
            <button type="button" onClick={handleAnotherPreDraft}>Create Another PreDraft</button>
            <button type="button" onClick={handleWearhousing}>Move to Wearhousing</button>
            <button type="button" onClick={handleCloseModal}>Go Back</button>
            <button type="button" onClick={handleDiscardPreDraft}>Discard this draft</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
