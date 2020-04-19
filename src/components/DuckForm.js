import React from 'react';
import {
	Button,
	Checkbox,
	FormControl,
	InputLabel,
	FormHelperText,
	Input,
} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';

import './DuckForm.css';

export default class DuckForm extends React.Component {
	constructor() {
		super();
		this.state = {
			form: {
				feedingTime: '2020-04-19',
				foodType: 'Bread',
				foodAmount: '10',
				location: 'The lake',
				numberOfDucks: 10,
				repeatFeeding: true,
			},
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange() {
		console.log('An input changed...');
	}
	async handleSubmit(e) {
		e.preventDefault();
		console.log('Form Submission');
		const { form } = this.state;
		console.log(form);
		const headers = new Headers();
		headers.append('Content-Tye', 'application/json');
		const options = {
			method: 'POST',
			headers,
			body: JSON.stringify(form),
		};
		const saveData = new Request('http://localhost:8080/feeding', options);
		try {
			const response = await fetch(saveData);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		const {
			feedingTime,
			foodType,
			foodAmount,
			location,
			numberOfDucks,
			repeatFeeding,
		} = this.state.form;
		return (
			<div>
				<form className={'form'} onSubmit={this.handleSubmit}>
					<FormControl>
						{/* <DateTimePicker
							value={feedingTime}
							disablePast
							onChange={this.handleChange}
							label='With Today Button'
							showTodayButton
						/> */}
					</FormControl>
					<FormControl>
						<InputLabel htmlFor='my-input'>Type of food</InputLabel>
						<Input id='my-input' aria-describedby='my-helper-text' />
					</FormControl>
					<FormControl>
						<InputLabel htmlFor='my-input'>Amount of food</InputLabel>
						<Input
							id='my-input'
							aria-describedby='my-helper-text'
							type='number'
						/>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor='my-input'>
							Where did you feed the ducks
						</InputLabel>
						<Input id='my-input' aria-describedby='my-helper-text' />
					</FormControl>
					<FormControl>
						<InputLabel htmlFor='my-input'>
							How many ducks did you feed
						</InputLabel>
						<Input
							id='my-input'
							aria-describedby='my-helper-text'
							type='number'
						/>
					</FormControl>
					<FormControl>
						Do you do this everyday?
						<Checkbox
							color='primary'
							value='checkedA'
							inputProps={{ 'aria-label': 'Checkbox A' }}
						/>
					</FormControl>

					<Button variant='contained' color='primary' type='submit'>
						Feed the ducks
					</Button>
				</form>
			</div>
		);
	}
}
