import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
	return (
			<Tilt className="Tilt logo f1 pointer" options={{ max : 60, reverse: true, perspective: 400, scale: 1.2,}}>
			 <div className="Tilt-inner"><img alt = "loading..." src = {brain} /></div>
			</Tilt>
	);
}

export default Logo;