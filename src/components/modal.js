import React from 'react';
import ReactDOM from 'react-dom';

import history from '../history';

const Modal = props => {
    return ReactDOM.createPortal (
        <div onClick={()=>history.push('/')} className="modal-main">
            <div onClick={(e)=>e.stopPropagation()} className="modal-box">
                <div className="modal-text">
                    {props.title}
                </div>
                <div className="modal-buttons">
                    {props.actions}
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    )
}

export default Modal;