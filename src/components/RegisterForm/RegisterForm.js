import React from 'react';
import './RegisterForm.css';

const RegisterForm = ({onRouteChange}) => {
	return (
		<div className = "centerall pad">
			<form className = "form-center">
				<div className = "pad"><h3>Register</h3></div>
					<div className = "pad">
						<div className = "pad" htmlFor="name">Name</div>
						<input type = "text" name = "name" className = "input nooutline"   id= "name" />
					</div>
					<div className = "pad">
						<div className = "pad" htmlFor="email-address">Email</div>
						<input type = "email" name = "email-address" className = "input nooutline"   id="email-address" />
					</div>
					<div className = "pad">
						<div className = "pad" htmlFor="password">Password</div>
						<input type = "password" name = "password" className = "input nooutline" id="password" />
					</div>
					<div className = "pad">
						<input type = "submit" value = "Register" className = "button nooutline" onClick = {() => onRouteChange('home')} />
					</div>
					<div className = "pad">
						<p className = "paragraph" onClick = {() => onRouteChange('signIn')}>Sign In</p>
					</div>
			</form>
		</div>
	);
}

export default RegisterForm;