import React from 'react'

function Logo({width='30px'}) {
  return (
    <div>
      <img src={'src/assets/logo.jpeg'} alt="app logo" style={{width}} />
    </div>
  )
}

export default Logo