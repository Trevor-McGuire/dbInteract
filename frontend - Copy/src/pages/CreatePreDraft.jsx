import React, { useState } from 'react'
import Camera from '../components/Camera'
import Modal from '../components/Modal'

const CreatePreDraft = () => {
  const [formState, setFormState] = useState({
    title: '',
    rawDescription: '',
    quantity: 1,
    photoes: [],
  })

  return (
    <>
      <form>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formState.title}
            onChange={(e) => setFormState({ ...formState, title: e.target.value })}
          />
        </label>
        <label>
          Raw Description:
          <textarea
            name="rawDescription"
            value={formState.rawDescription}
            onChange={(e) => setFormState({ ...formState, rawDescription: e.target.value })}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={formState.quantity}
            onChange={(e) => setFormState({ ...formState, quantity: e.target.value })}
          />
        </label>
        <Camera />

        <Modal />

      </form>
    </>
  )
}

export default CreatePreDraft