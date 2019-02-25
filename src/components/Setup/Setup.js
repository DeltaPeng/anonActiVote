import React from 'react';  
  
class Setup extends React.Component {
	 
	 //set up contructor with props and state
	 constructor(props) {
		 super(props);
		 this.state = {
			 setupUserName: 'deltapeng',
			 setupRoomName: '',
			 setupNumActivs: '15',
			 chkNameDisplay: 1
		 }
	 }
	 
	 //create some events to update state based on change value of fields
	 onUserNameChange = (event) => {
		 this.setState({ setupUserName: event.target.value})
	 }
	 onRoomNameChange = (event) => {
		 this.setState({ setupRoomName: event.target.value})
	 }
	 onNumActivsChange = (event) => {
		 this.setState({ setupNumActivs: event.target.value})
	 }
	 
	 handleChkboxChange(e) {
		 if ( e.target.checked)			 
			this.setState({ chkNameDisplay: 1});
		else
			this.setState({ chkNameDisplay: 0});
	}
		 
	 //create an event to send data on submit
	 onSubmitSignIn = () => {  
	 console.log("c'mon!!11");
		console.log("check state of union ",this.state);
		
		  fetch('http://localhost:3000/setup',
		  { method:'post',
			 headers: {'Content-Type': 'application/json'},
			 body: JSON.stringify({
				 userName: 'deltapeng',
				 roomName: this.state.setupRoomName,
				 setupNumActivs: this.state.setupNumActivs,
				 chkNameDisp: this.state.chkNameDisplay
			 })		 
		  }
		 ).then(response => response.json())
		  .then(user => {
			  console.log("setup, final stretch? user is:", user," and user length ",user.length);
			  //if this exists, we are on user login
			if (user === "incorrect form submission1" ) {
			}
			else if (user.length > 0) {
			  console.log("std setup0 prior to signinreturn: ", this.state.setupRoomName);		
			  this.props.setRoomState(this.state.setupRoomName);
			  console.log("std setup");			  
			  this.props.onRouteChange('signinReturn');
			  console.log("std setup2");		
			} else 
			{  
			  console.log("twas a failure, remain on page"); 
			}
		})	 
	 }
	 
	 render() {
	 const {onRouteChange} = this.props;
	 console.log(this.props);
	 return (
		 <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa4 black-80">
			  <div className="measure">
			  { this.props.appState === 'setupMaster' 
					?  
					<div>
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
						  <legend className="f1 fw6 ph0 mh0">Anonymous Activity Voter - Set up</legend>
						  <div className="mt3">
							<label className="db fw6 lh-copy f6" htmlFor="userName">Rand user name</label>
							<input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="email" name="userName"  id="userName" 
									onChange={this.onUserNameChange} />
						  </div>
						  <div className="mv3">
							<label className="db fw6 lh-copy f6" htmlFor="password">Room to Join: {this.props.appState}</label>
							<input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="email" name="roomName"  id="roomName" 
									onChange={this.onRoomNameChange} />
						  </div> 
						</fieldset>
						<div className="">
						  <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
								 type="submit" value="Create Room" 
								 onClick={this.onSubmitSignIn}
								 />
						</div> 
					</div>
					:  
						<div className="">
							<h1>You are about to go to room {this.props.appState} with these settings...someday once it is created -fin for now-</h1>
							
							<div className="mv3">
								<label className="db fw6 lh-copy f6" >RoomName to Create:</label>
								<input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
										type="text" name="roomName"  id="roomName" 
										onChange={this.onRoomNameChange} />
							  </div> 
							  
							 <div className="mv3">
								<label className="db fw6 lh-copy f6" >How many random activities should be created for this room?:</label>
								<input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
										type="text" name="setupActivNum"  id="setupActivNum" 
										defaultValue="15"
										onChange={this.onNumActivsChange} />
							  </div> 
							  
								  <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
										 type="submit" value="Create Room" 
										 onClick={this.onSubmitSignIn}
										 /> 
						</div> 
			  }  
			  </div>
			</main>
		 </article>
	);
}}

export default Setup;