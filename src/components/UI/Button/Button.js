import React from 'react';
import './Button.css'

const button = (props) => {
    let btnClass = ['Button'];
    btnClass.push(props.btnType);
    btnClass = btnClass.join(' ');

    return (
        <button
            disabled={props.disabled}
            className={btnClass}
            onClick={props.clicked}>{props.children}</button>
    )
};

export default button;