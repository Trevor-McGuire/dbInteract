import React, { useState } from 'react'

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
        <label>
          Photoes:
          <input
            type="file"
            name="photoes"
            value={formState.photoes}
            onChange={(e) => setFormState({ ...formState, photoes: e.target.value })}
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default CreatePreDraft