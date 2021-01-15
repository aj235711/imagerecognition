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
			value: 30,
			density: {
				enable: true,
				value_area: 175
			}
		},
	}
}

const app = new Clarifai.App({apiKey: 'b7a335f3bd9444378fe53481f839e244'});

const originalState = {
	input: '',
	imageUrl: '',
	boxes: [],
	route: 'signIn',
	isSignedIn: false, 
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: ''
	}
}

class App extends Component {
	constructor() {
		super();
		this.state = originalState;
	}

	loadUser = (data) => {
		const { id, name, email, entries, joined} = data;
		this.setState({user: {
			id: id,
			name: name,
			email: email,
			entries: entries,
			joined: joined
		}})
	}

	calculateFaceBox = (data) => {
		console.log(data.outputs[0].data.regions);
		const faceArray = data.outputs[0].data.regions;
		const thisimage = document.getElementById("inputimage");
		const width = Number(thisimage.width);
		const height = Number(thisimage.height);
		const faceBoxes = faceArray.map((face) => {
			const faceBox = face.region_info.bounding_box;
			return {
				leftCol: faceBox.left_col * width,
				topRow: faceBox.top_row * height,
				rightCol: (width - (faceBox.right_col * width)),
				bottomRow: height - ((faceBox.bottom_row * height))
			}
		});
		return faceBoxes;
	}

	setBoxState = (boxes) => {
		this.setState({boxes: boxes});
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	onSubmit = () => {
		this.setState({boxes: []});
		this.setState({imageUrl: this.state.input});
		app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
		.then(response => {
			if(response) {
				fetch('https://murmuring-beach-02776.herokuapp.com/image', {
					method: 'put',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						id: this.state.user.id
					})
				})
				.then(response => response.json())
				.then(cnt => {
					this.setState(Object.assign(this.state.user, {entries: cnt}));
				})
			}
			this.setBoxState(this.calculateFaceBox(response))
		})
		.catch(error => console.log(error))
	}

	onRouteChange = (route) => {
		this.setState({route: route})
		if(route==='signIn') {
			this.setState(originalState);
			
		}
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
			        <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
			        <Detectbox onSubmit = {this.onSubmit} onInputChange = {this.onInputChange} />
			        <Image className = "absolute" imageUrl = {this.state.imageUrl} boxes = {this.state.boxes} />
		        </div> 
		        : this.state.route === 'signIn'
		        ?
		        <SignInForm loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
		        :
		        <RegisterForm loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
	    	}
	      </div>
	    );
    }
}

export default App;