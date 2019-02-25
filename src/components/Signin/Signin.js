import React from 'react';   

class Signin extends React.Component {
	 
	 //set up contructor with props and state
	 constructor(props) {
		 super(props);
		 this.state = {
			 signInUserName: '',
			 signInRoomName: this.props.iniRoomName
		 }
	 }
	 
	 //create some events to update state based on change value of fields
	 onUserNameChange = (event) => {
		 this.setState({ signInUserName: event.target.value})
	 }
	 onRoomNameChange = (event) => {
		 this.setState({ signInRoomName: event.target.value})
	 }
	 
	 //create an event to send data on submit
	 onSubmitSignIn = () => { 
		console.log("signin prior to server ", this.state.signInRoomName)
		
		  fetch('https://murmuring-taiga-33770.herokuapp.com/signin',
		  { method:'post',
			 headers: {'Content-Type': 'application/json'},
			 body: JSON.stringify({
				 userName: this.state.signInUserName,
				 roomName: this.state.signInRoomName
			 })		 
		  }
		 ).then(response => response.json())
		  .then(user => {
			  console.log(user," and user length ",user.length);
			  //if this exists, we are on user login
			if (user === "incorrect form submission1" ) {
					//do nothing if error
					console.log("Signin you errored");
			}
			else if (user === "roomSetup" ) { 
			  console.log("dandy setup master room name only?");
			  this.props.setRoomState('Undecided yet, decide in master setup!');
			  this.props.onRouteChange('setupMaster');
			  
			  
			} else if (user.length > 0) 
			{ 
				//if returned a list of room's indices
				  console.log("HOWDY std setup here is the return value::", user, " and ", user.length) ;	
				  this.props.setUserState(this.state.signInUserName);
				  this.props.setRoomState(this.state.signInRoomName);	 	 
				  
				  //parse through returned data, split it out into state
				  for (let i = 0; i < user.length; i++) {             
					if (user[i].catlist === 'anonActivRoommisc') {
						this.props.setMiscData(user[i]);
					} else if (user[i].catlist === 'anonActivRoomgame')  {
						this.props.setGameData(user[i]);
					} else if (user[i].catlist === 'anonActivRoommovie') {
						this.props.setMovieData(user[i]);
					} 
					
					console.log("pass ",i) 
				  }
						 
			      console.log("loaded activ data into state, end") 
						 
				  //go to home to go to room
				  this.props.onRouteChange('home');
			  
			}
		})
		.catch(err => console.log)
	 }
	 
	 render() {
	 const { onRouteChange } = this.props;
	 var iniRoom = this.props.iniRoomName
	 return (
		 <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa4 black-80">
			  <div className="measure">
				<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				  <legend className="f1 fw6 ph0 mh0">Anonymous Activity Voter - Log in</legend>
				  <div className="mt3">
					<label className="db fw6 lh-copy f6" htmlFor="userName">Rand user name</label>
					<input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
							type="text" name="userName"  id="userName" 
							onChange={this.onUserNameChange} />
				  </div>
				  <div className="mv3">
					<label className="db fw6 lh-copy f6" htmlFor="password">Room to Join</label>
					<input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
							type="text" name="roomName"  id="roomName" 
							defaultValue={iniRoom}
							onChange={this.onRoomNameChange} />
				  </div> 
				</fieldset>
				<div className="">
				  <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
						 type="submit" value="Sign in" 
						 onClick={this.onSubmitSignIn}
						 />
				</div> 
			  </div>
			</main>
		 </article>
	);
}}

export default Signin;