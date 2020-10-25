import React from 'react';
import Searchbox from './Searchbox/Searchbox';
import Detectbutton from './Detectbutton/Detectbutton';
import './Detectbox.css';

const Detectbox = ({ onSubmit, onInputChange }) => {
	return (
		<div className = "centre">
			<p className = "tc f3">Enter the url of the image to detect faces.</p>
			<div className = "flexer">
				<Searchbox onInputChange = {onInputChange}/>
				<Detectbutton onSubmit = {onSubmit}/>
			</div>
		</div>
	);
}

export default Detectbox;