import React from 'react';
import './Image.css';

const Image = ({ imageUrl, boxes }) => {
	if(imageUrl === '') {
		return(
			<div />
		);
	} else {
		return(
			<div className = "absolute si">
				<img id = "inputimage" alt = "loading" src = {imageUrl} className = "sizer" />
				{boxes.map(box => (<div className = "bounding-box" style = {{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>))}
			</div>
		);
	}
}

export default Image;