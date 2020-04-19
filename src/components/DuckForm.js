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
import moment from 'moment';

import './DuckForm.css';

export default class DuckForm extends React.Component {
	constructor() {
		super();
		this.state = {
			feedingTime: moment(),
			foodType: '',
			foodAmount: '',
			location: '',
			numberOfDucks: 0,
			repeatFeeding: true,
			loading: false,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleDatePicker = this.handleDatePicker.bind(this);
		this.toggleLoading = this.toggleLoading.bind(this);
	}

	handleChange(e) {
		e.preventDefault();
		const { target } = e;
		this.setState({
			[target.name]: target.value,
		});
	}
	handleDatePicker(date) {
		this.setState({
			feedingTime: date,
		});
	}
	toggleLoading() {
		this.setState({
			loading: !this.state.loading,
		});
	}

	async handleSubmit(e) {
		e.preventDefault();

		this.toggleLoading();

		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		const options = {
			method: 'POST',
			headers,
			body: JSON.stringify(this.state),
		};

		const saveData = new Request('http://localhost:8080/feeding', options);
		try {
			const response = await fetch(saveData);
			if (response.status === 400) {
				console.log('Oops');
				// display error
			}
			this.toggleLoading();
		} catch (error) {
			// display error
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
			loading,
		} = this.state;
		return (
			<div>
				<form className={'form'} onSubmit={this.handleSubmit}>
					<FormControl>
						<DateTimePicker
							name={'feedingTime'}
							value={feedingTime}
							disablePast
							onChange={this.handleDatePicker}
							label='When did you feed the ducks'
							showTodayButton
						/>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor='my-input'>Type of food</InputLabel>
						<Input
							id='my-input'
							aria-describedby='my-helper-text'
							value={foodType}
							name={'foodType'}
							onChange={this.handleChange}
						/>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor='my-input'>Amount of food</InputLabel>
						<Input
							id='my-input'
							aria-describedby='my-helper-text'
							type='number'
							value={foodAmount}
							name={'foodAmount'}
							onChange={this.handleChange}
						/>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor='my-input'>
							Where did you feed the ducks
						</InputLabel>
						<Input
							id='my-input'
							aria-describedby='my-helper-text'
							value={location}
							name={'location'}
							onChange={this.handleChange}
						/>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor='my-input'>
							How many ducks did you feed
						</InputLabel>
						<Input
							id='my-input'
							aria-describedby='my-helper-text'
							type='number'
							value={numberOfDucks}
							name={'numberOfDucks'}
							onChange={this.handleChange}
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

					<Button
						variant='contained'
						color='primary'
						type='submit'
						disabled={loading}
					>
						Feed the ducks
					</Button>
				</form>
			</div>
		);
	}
}
