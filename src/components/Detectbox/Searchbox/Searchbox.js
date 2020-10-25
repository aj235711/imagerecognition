import React from 'react';
import './Searchbox.css';

const Searchbox = ({ onInputChange }) => {
	return (
		<div className = "nooutline f3">
			<input  className = "setwidth" type = "text" onChange = {onInputChange}/>
		</div>
	);
}

export default Searchbox;