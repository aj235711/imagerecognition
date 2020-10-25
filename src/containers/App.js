import React, { Component } from 'react';
import './App.css';
import Navbar from '../components/Navbar/Navbar';
import Clarifai from 'clarifai';
import Detectbox from '../components/Detectbox/Detectbox';
import Rank from '../components/Rank/Rank';
import Particles from 'react-particles-js';
import Image from '../components/Image/Image';
import SignInForm from '../components/SignInForm/SignInForm';
import RegisterForm from '../components/RegisterForm/RegisterForm';


const particles = {
	particles: {
		number: {
			value: 15,
			density: {
				enable: true,
				value_area: 175
			}
		},
	}
}

const app = new Clarifai.App({apiKey: 'b7a335f3bd9444378fe53481f839e244'});

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'signIn'
		}
	}

	calculateFaceBox = (data) => {
		const faceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
		const thisimage = document.getElementById("inputimage");
		const width = Number(thisimage.width);
		const height = Number(thisimage.height);
		return {
			leftCol: faceBox.left_col * width,
			topRow: faceBox.top_row * height,
			rightCol: (width - (faceBox.right_col * width)),
			bottomRow: height - ((faceBox.bottom_row * height))
		};
	}

	setBoxState = (box) => {
		this.setState({box: box});
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	onSubmit = () => {
		this.setState({imageUrl: this.state.input});
		app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
		.then(response => {
			console.log(response);
			this.setBoxState(this.calculateFaceBox(response))
		})
		.catch(error => console.log(error))
	}

	onRouteChange = (route) => {
		this.setState({route: route})
	}

    render() {
	    return (
	      <div>
	      	<Particles className = "zaxis"
	              params={particles}
	        />
	        <Navbar onRouteChange = {this.onRouteChange} route = {this.state.route}/>
	        {this.state.route === 'home' 
		        ? 
		        <div>
			        <Rank />
			        <Detectbox onSubmit = {this.onSubmit} onInputChange = {this.onInputChange} />
			        <Image className = "absolute" imageUrl = {this.state.imageUrl} box = {this.state.box} />
		        </div> 
		        : this.state.route === 'signIn'
		        ?
		        <SignInForm onRouteChange = {this.onRouteChange} />
		        :
		        <RegisterForm onRouteChange = {this.onRouteChange} />
	    	}
	      </div>
	    );
    }
}

export default App;
