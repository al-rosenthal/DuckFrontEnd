import React from 'react';
import {
	Button,
	FormControl,
	InputLabel,
	FormHelperText,
	Input,
} from '@material-ui/core';

export default class DuckForm extends React.Component {
	render() {
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
}
