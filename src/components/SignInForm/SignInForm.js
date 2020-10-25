import React from 'react';
import './SignInForm.css';

class SignInForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}


	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value});
	}

	onSubmitSignIn = () => {
		fetch('http://localhost:3001/signIn', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
			.then(response => response.json())
			.then(data => {
				if(data == "success") {
					this.props.onRouteChange('home');
				}
			})

	}

	render() {
		const { onRouteChange } = this.props;
		return (
			<div className = "centerall pad">
				<div className = "form-center">
					<div className = "pad"><h3>Sign In</h3></div>
						<div className = "pad">
							<div className = "pad" htmlFor="email-address">Email</div>
							<input type = "email" name = "email-address" className = "input nooutline"   id="email-address" onChange = {this.onEmailChange}/>
						</div>
						<div className = "pad">
							<div className = "pad" htmlFor="password">Password</div>
							<input type = "password" name = "password" className = "input nooutline" id="password" onChange = {this.onPasswordChange}/>
						</div>
						<div className = "pad">
							<button className = "button nooutline" onClick = {this.onSubmitSignIn}>Sign In</button>
						</div>
						<div className = "pad">
							<p className = "paragraph" onClick = {() => onRouteChange('register')}>Register</p>
						</div>
				</div>
			</div>
		);
	}
}

export default SignInForm;