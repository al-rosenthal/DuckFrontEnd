import React from 'react';
import {
	Button,
	Checkbox,
	FormControl,
	InputLabel,
	FormHelperText,
	Input,
} from '@material-ui/core';

export default class DuckForm extends React.Component {
	constructor() {
		super();
		this.state = {
			feedingTime: '',
			foodType: '',
			foodAmount: '',
			location: '',
			numberOfDucks: '',
			repeatFeeding: '',
		};
		console.log(new Date());
	}
	handleChange() {
		console.log('An input changed...');
	}
	handleSubmit() {
		console.log('Handle Submission');
	}

	render() {
		const {
			feedingTime,
			foodType,
			foodAmount,
			location,
			numberOfDucks,
			repeatFeeding,
		} = this.state;
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<FormControl>
						<InputLabel htmlFor='datetime-local'>Feeding time</InputLabel>
						<DateTimePicker
							value={feedingTime}
							disablePast
							onChange={this.handleChange}
							label='With Today Button'
							showTodayButton
						/>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor='my-input'>Type of food</InputLabel>
						<Input id='my-input' aria-describedby='my-helper-text' />
						<FormHelperText id='my-helper-text'>
							We'll never share your email.
						</FormHelperText>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor='my-input'>Amount of food</InputLabel>
						<Input id='my-input' aria-describedby='my-helper-text' />
						<FormHelperText id='my-helper-text'>
							We'll never share your email.
						</FormHelperText>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor='my-input'>
							Where did you feed the ducks
						</InputLabel>
						<Input id='my-input' aria-describedby='my-helper-text' />
						<FormHelperText id='my-helper-text'>
							We'll never share your email.
						</FormHelperText>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor='my-input'>
							How many ducks did you feed
						</InputLabel>
						<Input id='my-input' aria-describedby='my-helper-text' />
						<FormHelperText id='my-helper-text'>
							We'll never share your email.
						</FormHelperText>
					</FormControl>
					<FormControl>
						<Checkbox
							color='primary'
							value='checkedA'
							inputProps={{ 'aria-label': 'Checkbox A' }}
						/>
					</FormControl>

					<Button variant='contained' color='primary'>
						Feed the ducks
					</Button>
				</form>
			</div>
		);
	}
}
