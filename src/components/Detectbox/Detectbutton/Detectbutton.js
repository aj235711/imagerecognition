import React from 'react';
import './Detectbutton.css';

const Detectbutton = ({ onSubmit }) => {
	return(
		<div>
			<button className = "tc grow f3 pointer dim" onClick = {onSubmit}>Detect</button>
		</div>
	);
}

export default Detectbutton;