import React, { useState } from 'react'

const usePasswordToggle = () => {
  const[visible, setVisible] = useState(false);

  const Icon = (
    <i className={visible ? 'fas fa-eye-slash' : 'fas fa-eye'} 
    onClick={() => setVisible(visible => !visible)}/>
  )

  const InputType = visible ? "text" : "password";

  return[InputType, Icon]
}

export default usePasswordToggle