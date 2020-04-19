import React from 'react';
import './App.css';
import {
	Button,
	FormControl,
	InputLabel,
	FormHelperText,
	Input,
} from '@material-ui/core';

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				{/* <img src={logo} className='App-logo' alt='logo' /> */}
				<p>Feed those ducks.</p>
				<form>
					<FormControl>
						<InputLabel htmlFor='my-input'>Email address</InputLabel>
						<Input id='my-input' aria-describedby='my-helper-text' />
						<FormHelperText id='my-helper-text'>
							We'll never share your email.
						</FormHelperText>
					</FormControl>

					<Button>I've fed the ducks</Button>
				</form>
			</header>
		</div>
	);
}

export default App;
