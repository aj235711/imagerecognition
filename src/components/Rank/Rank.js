import React from 'react';

const Rank = ({ name, entries }) => {
	return(
		<div>
			<p className = "white tc ma2 mt3 f3">{ `${name}, your current entry count is...` }</p>
			<p className = "white tc ma2 f3">{entries}</p>
		</div>
	);
}

export default Rank;