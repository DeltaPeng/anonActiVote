import React from 'react'; 

//where for tachyon style, 
// dim is dimmed when clicking on it
// pointer is change mouse icon on hover?
//
// for onClick, use () => so that the function is only called onClick, and not called when rendering
const Navigation = ({onRouteChange, isSignedIn}) => { 
	 if(isSignedIn) {	 
		 return (
			 <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p className='f3 link dim black underline pa3 pointer'
					onClick={() => onRouteChange('signin')}
					>Sign Out</p>
			 </nav>
		 );
	 } else
	 {
		 return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p className='f3 link dim black underline pa3 pointer'
					onClick={() => onRouteChange('signin')}
					>Sign In</p> 
			 </nav> 
		 );
	 } 
}

export default Navigation;