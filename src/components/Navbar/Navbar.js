import React from 'react';
import Logo from './Logo/Logo';
import SignIn from './SignIn/SignIn';
import './Navbar.css';

const Navbar = ({onRouteChange, route}) => {
	return(
		<nav className = "center">
			<Logo />
			<SignIn className = "shifter"onRouteChange = {onRouteChange} route = {route}/>
		</nav>
	);
}

export default Navbar;