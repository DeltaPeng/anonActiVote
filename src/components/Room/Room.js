import React from 'react';  
  
class Room extends React.Component {
	 
	 //set up contructor with props and state
	 constructor(props) {
		 super(props);
		 
		 //state is special in that it is handled by React, and causes re-renders. Can create 
		 this.state = { 
			 theVote1: -1,
			 theVote2: -1,
			 listItemsDisp: "Play game 1|Watch movie 23|iniState 1"
		 }
		   
		 this.loadIniVotes()
		 this.printListOfVoted();
		 console.log("ini load, about to createSelectITems");
		 this.createSelectItems(true);  
		 console.log("ini load, finish createSelectITems");
	 }
	  
	 //load and set ini votes
	 loadIniVotes = () => {
		 console.log("made it to Roomjs load ini votes ------------")
		const {roomName, userName} = this.props;	

		fetch('https://murmuring-taiga-33770.herokuapp.com/roomLoadVote',
		  { method:'post',
			 headers: {'Content-Type': 'application/json'},
			 body: JSON.stringify({
				 userName: userName,
				 roomName: roomName 
			 })		 
		  }
		 ).then(response => response.json())
		  .then(vote => {
			  console.log("setup, final stretch? user is:", vote," and user length ",vote.length);
			  //if this exists, we are on user login
			if (vote === "incorrect form submission1" ) {
				
			  console.log("twas a failure, remain on page 2 ");
			}
			else if (vote.length > 0) { 
			  console.log("length > 0  2");
			  console.log("data returned vote1 ",vote);
			  console.log("data1 and 2: ", vote[0].data, "  ", vote[1].data);
			  //set state of both votes
			  this.setState({ theVote1: vote[0].data})
			  this.setState({ theVote2: vote[1].data})
			} else 
			{  
			  console.log("twas else what  2  ??"); 
			}
		}) 
	 }
	 
	 printListOfVoted = () => {
		 console.log('befin printListofVoted')
		  var text = "bbba"//"Play game 1\nWatch movie 23\nWatch movie 1\ncustom activity 4\ngo to eat 1"
		  var text1="apples" 
		 
		fetch('https://murmuring-taiga-33770.herokuapp.com/roomItems',
		  { method:'post',
			 headers: {'Content-Type': 'application/json'},
			 body: JSON.stringify({ 
				 roomName: this.props.roomName 
			 })		 
		  }
		 ).then(response => response.json())
		  .then(outputData => {
			  console.log("setup, final stretch? user is:", outputData );
			  //if this exists, we are on user login
			if (outputData === "incorrect form submission1" ) {
				
			  console.log("twas a failure, remain on page");
			}  
			  else 
			{ 
				console.log("load items reset text, fill it with the output data:", outputData)
				text1 = ''
				for (let i = 0; i < outputData.length; i++) {             
					text1 += "(" + outputData[i].category + ") " + outputData[i].data + " - " + outputData[i].numentries + "|"
				}
				console.log("the new text var: ", text1)
			}
			
			console.log("here's the orig text: ",text);
			console.log("here's the new text: ",text1);
			text = text1;
			
			//couldn't use the output text1 directly outside of fetch, have to set to state to access outside of it for parsing below 
			var itemsDisplay = (
			<div>
				{text1.split("|").map((i,key) => {
					return <div key={key}>{i}</div>; 
				})}
			</div>
			);
			
			console.log("the items diplay is here: ", itemsDisplay)
			
			//set the display items state up
			this.setState({ listItemsDisp: itemsDisplay},() => {
				//testing
				}
			) 
			 
		})
		.catch(err => console.log("err at the very end?? ",err)) 
	   
	}
	
	 //create an event to load dropdowns with data
	 createSelectItems = (setIniIndices) => {
		 //should only need to run in the very beginning, and then only iff custom entries or dropdown values of the room (unlikely) change
		console.log("made it to Roomjs create select items")
		const {roomName, gameData, miscData, movieData} = this.props;		 
		
		//TO DO: this should prob be loading the latest data, on the offchance the room data changes while in the room, not using what's passed in
		//TO DO: add a dynamic load of the custom entered items
		  fetch('https://murmuring-taiga-33770.herokuapp.com/room',
		  { method:'post',
			 headers: {'Content-Type': 'application/json'},
			 body: JSON.stringify({
				 roomName: roomName,
				 gameData: gameData,
				 movieData: movieData,
				 miscData: miscData
			 })		 
		  }
		 ).then(response => response.json())
		  .then(optionsData => {
			  console.log(optionsData," and user length ",optionsData.length);
			  //if this exists, we are on user login
			if (optionsData === "incorrect form submission1" ) {
			}
			else if (optionsData.length >0) { 
			    console.log("std setup");			  
				var dynSelect = document.getElementById("dynDropdown");
				var dynSelect2 = document.getElementById("dynDropdown2");
			var lastCategory = '' 
			for(let k = 0; k < optionsData.length; k++) { 
			
				if (optionsData[k].key !== lastCategory) {
					console.log("in loop ",k);
					lastCategory = optionsData[k].key
					console.log("last cat ",lastCategory); 
					dynSelect.options[dynSelect.options.length] = new Option("--".concat(lastCategory).concat("-----------------"),"-1");
					dynSelect2.options[dynSelect2.options.length] = new Option("--".concat(lastCategory).concat("-----------------"),"-1");
				}  							
					dynSelect.options[dynSelect.options.length] = new Option(optionsData[k].data,optionsData[k].id);
					dynSelect2.options[dynSelect2.options.length] = new Option(optionsData[k].data,optionsData[k].id); 
			 }
			  
			 console.log("test setting index:", setIniIndices)
			 if (setIniIndices) {				 
			 	 console.log("val1 ",dynSelect.value," val2 -",dynSelect2.value)
				 dynSelect.value = this.state.theVote1
				 dynSelect2.value = this.state.theVote2
			 }
			 console.log("state items1 ",dynSelect.value," val2 -",dynSelect2.value)
			 console.log("after val1 ",this.state.theVote1," val2 -",this.state.theVote2)
			 console.log("test end set indices") 
			 
			} else 
			{  
			  console.log("hrrrrmmmm??!?!?")
			}
		})	 
		.catch(err => console.log)
	 }
	 
	 onVote1Change = (event) => {
		 console.log(event.target, " and then the direct value: ", event.target.value); 
		 this.setState({ theVote1: event.target.value})
	 }
	 onVote2Change = (event) => {
		console.log(event.target, " and then the direct value: ", event.target.value);
		 this.setState({ theVote2: event.target.value})
	 }
	 //create an event to submit two votes, should replace/delete any existing votes for this user-room
	 onVoteSubmit = () => {  
	   
		 const {roomName, userName} = this.props;	
		 const {theVote1, theVote2} = this.state;
		 
		 console.log("Room submit vote1 and2 and check vote indices: ",theVote1," and v2 is: ", theVote2);
		 
		 
		 fetch('https://murmuring-taiga-33770.herokuapp.com/roomVote',
			  { method:'post',
				 headers: {'Content-Type': 'application/json'},
				 body: JSON.stringify({
					 userName: userName,
					 roomName: roomName,
					 voteID1: theVote1,
					 voteID2: theVote2
				 })		 
			  }
			 ).then(response => response.json())
			  .then(user => {
				  console.log("setup, final stretch? user is:", user," and user length ",user.length);
				  //if this exists, we are on user login
				if (user === "incorrect form submission1" ) {
					
				  console.log("twas a failure, remain on page");
				}
				else if (user.length > 0) { 
				  console.log("length > 0");
				} else 
				{  
				  console.log("twas else what??");
				    
				}
			})
			
			console.log("refreshing test??");			   
			//run a refresh to delete old categories and check/add new ones
			this.onRefreshRoom();  
	 }
	 
	  //create an event to refresh room in case votes were added or new custom entries were submitted
	 onRefreshRoom = () => {  
		 console.log("Room refresh c'mon!!11");
		  
		 this.printListOfVoted();
		 this.createSelectItems(false);  
	 } 	 
	   
	 render() {
	 const { onRouteChange } = this.props; 
	 return (
		 <div>
					<h1>{this.state.theVote1} Anonymous Activity Voter {this.state.theVote2}</h1>
					<h1>Welcome friend, {this.props.userName}, to room: {this.props.roomName} !</h1> 
					<div> 
						---------Current Activities for consideration----------
						<br /><br />
						{this.state.listItemsDisp}
						<br /> 
						------------------- end of list ------------------------
					</div>
	
					<select id="dynDropdown" onChange={this.onVote1Change}> 
						<option value="-1">First activity vote:</option> 
				    </select> 
					
					<br /> <br />
					
					<select id="dynDropdown2" onChange={this.onVote2Change}> 
						<option value="-1">Second activity vote:</option> 
				    </select> 
					
					<br /><br /><br />
					
					<div>
						<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
									 type="submit" value="Submit Votes + Refresh" 
									 onClick={this.onVoteSubmit}
						/> 
					 
					</div>
			
					
					<br /><br />
					Custom Entry (pending): <input type="text" defaultValue='pika' /> 
					<br />
					<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
										 type="submit" value="Submit custom idea" 
										 onClick={this.onVoteSubmit}
					/> 
		 </div>
	);
}}

export default Room;