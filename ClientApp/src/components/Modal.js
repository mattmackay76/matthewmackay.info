import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
    return ReactDOM.createPortal(
        <div className="ui dimmer fullscreen modals visible active">
            <div className="ui standard modal visible active">
                <div className="header">
                    title here
                </div>

                <div className="content">
                    content here
                </div>

                <div className="actions">
                    <button className="ui primary button">Ok</button>
                    <button className="ui button">Cancel</button>
                </div>
            </div>
        </div>,
        document.querySelector('#modal'));
};

export default Modal;