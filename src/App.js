import React, { Component } from 'react'; 
import './App.css';

import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Setup from './components/Setup/Setup'; 
import Room from './components/Room/Room';

import Particles from 'react-particles-js';
 
/*
Anonymous Activity Voter  
19/02/24 Timothy Ngai - got votes to save properly
19/02/23 Timothy Ngai - got the randomized lists to add dynamically to a dropdown, got randomized list to display with vote count (a bit sluggish to update at times though)
19/02/21 Timothy Ngai - create backend API /server for anonymous activ voter
*/ 
 
 
//this is originally part of Particles, moved it to it's own obj to make it look cleaner
const particlesOptions = {
		particles: {
			number: {
				value: 40,
				density: {
					enable: true,
					value_area: 800
				}
			}
		}
	  };

const initialState = {	 
		route: 'signin',
		isSignedIn: false,
		roomName: '',
		userName: '',
		activData: {},
		gameData: {},
		miscData: {},
		movieData: {} 
}
	  
class App extends Component {
	
	constructor() {
		super();
		this.state = { 
			route: 'signin',
			isSignedIn: false,
			roomName: '',
			userName: '',
			activData: {},
			gameData: {},
			miscData: {},
			movieData: {} 
		};
	} 
	
	setRoomState = (roomName1) => {	
		this.setState({roomName: roomName1})
	}
	setUserState = (userName1) => {	
		this.setState({userName: userName1})
	} 
	
	setActivData = (data) => {
		this.setState({activData: data}, () =>
			{
				//put a function here on set state to force this setstate to be ~synchronous, 
				//  so the call to createItems works properly
				console.log("yo yo yo",this.state.activData);
			}
		);
	}
	
	setMiscData = (data) => {
		this.setState({miscData: data}, () =>
			{
				//put a function here on set state to force this setstate to be ~synchronous, 
				//  so the call to createItems works properly
				console.log("HEYYY logged misc data: ",this.state.miscData);
			}
		);
	}
	setGameData = (data) => {
		this.setState({gameData: data}, () =>
			{
				//put a function here on set state to force this setstate to be ~synchronous, 
				//  so the call to createItems works properly
				console.log("HEYYY logged game data: ",this.state.gameData);
			}
		);
	}
	setMovieData = (data) => {
		this.setState({movieData: data}, () =>
			{
				//put a function here on set state to force this setstate to be ~synchronous, 
				//  so the call to createItems works properly
				console.log("HEYYY logged movie data: ",this.state.movieData);
			}
		);
	}
	
	onRouteChange = ( newRoute) => {
		if ( newRoute === 'signin') {
			this.setState(initialState);
			console.log("WE INITIALIZED STATE")
		} else if ( newRoute === 'signinReturn') {
			//if coming back from creating a room, don't re-initialize, so that room name defaults in
			//this.setState({isSignedIn: true});
			newRoute = 'signin'
		}  else if ( newRoute === 'home') {
			this.setState({isSignedIn: true});
		}   
		
		this.setState({route: newRoute});
	}  
	   
  render() {  
    return ( 
      <div className="App"> 
		<Particles className='particles'
				   params={particlesOptions} />
		
		<Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
		{ this.state.route === 'home'
			?  <div>		 
					<Room userName={this.state.userName} roomName={this.state.roomName} gameData={this.state.gameData} miscData={this.state.miscData} movieData={this.state.movieData}/>
				</div>
			:	( this.state.route === 'signin' 
					?  <Signin loadUser={this.loadUser} 
						setRoomState={this.setRoomState} setUserState={this.setUserState} onRouteChange={this.onRouteChange} 
						setGameData={this.setGameData} setMovieData={this.setMovieData} setMiscData={this.setMiscData}
						iniRoomName={this.state.roomName} /> 
					:  <Setup loadUser={this.loadUser} setRoomState={this.setRoomState} setActivData={this.setActivData}  onRouteChange={this.onRouteChange} appState= {this.state.roomName} />
			)
		}
      </div>
    );
  }
}

export default App;
