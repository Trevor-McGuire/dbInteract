import React from 'react'
import Camera from '../components/Camera'

const StartTakingPicturesBtn = () => {
  return (
    <>
      <h1>Start Taking Pictures</h1>
      <Camera />

      <button>Next Product</button>
      <button>Continue to Pre Draft</button>
    </>
  )
}

export default StartTakingPicturesBtn