import React from 'react';
import './SignIn.css';

const SignIn = ({onRouteChange, route}) => {
	if(route === 'home') {
		return(
			<div>
				<p className = "dim pointer underline" onClick = {() => onRouteChange('signIn')}>Sign Out</p>
			</div>
		);
	} else {
		return(
			<div className = "dib">
				<p className = "dim dib pointer ma2 underline" onClick = {() => onRouteChange('register')}>Register</p>
				<p className = "dim dib pointer ma2 underline" onClick = {() => onRouteChange('signIn')}>Sign In</p>
			</div>
		);
	}
}

export default SignIn;