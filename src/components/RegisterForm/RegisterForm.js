import React from 'react';
import './RegisterForm.css';

class RegisterForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			registerName: '',
			registerEmail: '',
			registerPassword: ''
		}
	}

	onNameChange = (event) => {
		this.setState({registerName: event.target.value});
	}

	onEmailChange = (event) => {
		this.setState({registerEmail: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({registerPassword: event.target.value});
	}

	onSubmitRegister = () => {
		fetch('https://murmuring-beach-02776.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.registerName,
				email: this.state.registerEmail,
				password: this.state.registerPassword
			})
		})
		.then(response => response.json())
		.then(user => {
			if(user.id) {
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
		})
	}

	render() {
		const { onRouteChange } = this.props;
		return (
			<div className = "centerall pad">
				<div className = "form-center">
					<div className = "pad"><h3>Register</h3></div>
						<div className = "pad">
							<div className = "pad" htmlFor="name">Name</div>
							<input type = "text" name = "name" className = "input nooutline" id= "name" onChange = {this.onNameChange}/>
						</div>
						<div className = "pad">
							<div className = "pad" htmlFor="email-address">Email</div>
							<input type = "email" name = "email-address" className = "input nooutline" id="email-address" onChange = {this.onEmailChange}/>
						</div>
						<div className = "pad">
							<div className = "pad" htmlFor="password">Password</div>
							<input type = "password" name = "password" className = "input nooutline" id="password" onChange = {this.onPasswordChange}/>
						</div>
						<div className = "pad">
							<button className = "button nooutline" onClick = {this.onSubmitRegister}>Register</button>
						</div>
						<div className = "pad">
							<p className = "paragraph" onClick = {() => onRouteChange('signIn')}>Sign In</p>
						</div>
				</div>
			</div>
		);
	}
}

export default RegisterForm;