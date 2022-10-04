import React from 'react'
import './Popup.css'
import CloseIcon from '@mui/icons-material/Close';

const Popup = (props) => {
  return (props.trigger) ? (
    <div className='popup-window'>
        <div className='popup-container'>
            <button className="popup-close" onClick={() => props.setTrigger(false)}>
            <CloseIcon className='popup-closeIcon'/>
            </button>
            { props.children }
        </div>
    </div>
  ) : "";
}

export default Popup