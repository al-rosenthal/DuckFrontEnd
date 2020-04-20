import React from 'react';
import {
	Button,
	Checkbox,
	FormControl,
	IconButton,
	InputLabel,
	Input,
	Snackbar,
	FormControlLabel,
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
			numberOfDucks: '',
			repeatFeeding: false,
			loading: false,
			openSnack: false,
			formSuccess: false,
			formError: false,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
		this.toggleLoading = this.toggleLoading.bind(this);
		this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
		this.handleCloseSnackBar = this.handleCloseSnackBar.bind(this);
	}

	handleChange(e) {
		e.preventDefault();
		console.log(e);
		const { target } = e;
		this.setState({
			[target.name]: target.value,
		});
	}
	handleCheckBoxChange() {
		this.setState({
			repeatFeeding: !this.state.repeatFeeding,
		});
	}
	handleDatePickerChange(date) {
		this.setState({
			feedingTime: date,
		});
	}
	handleCloseSnackBar() {
		this.setState({
			openSnack: false,
			formSuccess: false,
			formError: false,
		});
	}
	formSuccess() {
		this.setState({
			openSnack: true,
			formSuccess: true,
		});
	}

	formFailure() {
		this.setState({
			openSnack: true,
			formError: true,
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
				this.formFailure();
			} else {
				this.formSuccess();
			}
			this.toggleLoading();
		} catch (error) {
			this.formFailure();
		}
	}

	renderRepeatFeeding() {
		return (
			<div className={'Repeat-Message'}>
				<p>
					That's great! With this you won't have to fill in this form daily,
					we'll take care of that for you.
				</p>
			</div>
		);
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
			openSnack,
			formSuccess,
			formError,
		} = this.state;
		let snackMessage = '';
		if (formSuccess) {
			snackMessage = 'Success!';
		}
		if (formError) {
			snackMessage = 'Uh oh, refresh the page and try again';
		}
		return (
			<div>
				<form className={'Form'} onSubmit={this.handleSubmit}>
					<FormControl>
						<DateTimePicker
							name={'feedingTime'}
							value={feedingTime}
							disablePast
							onChange={this.handleDatePickerChange}
							label='When did you feed them'
							showTodayButton
						/>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor='food-type'>Type of food</InputLabel>
						<Input
							id='food-type'
							value={foodType}
							name={'foodType'}
							onChange={this.handleChange}
						/>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor='food-amount'>Amount of food</InputLabel>
						<Input
							id='food-amount'
							value={foodAmount}
							name={'foodAmount'}
							onChange={this.handleChange}
						/>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor='feed-location'>
							Where did you feed the ducks
						</InputLabel>
						<Input
							id='feed-location'
							aria-describedby='my-helper-text'
							value={location}
							name={'location'}
							onChange={this.handleChange}
						/>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor='amount-ducks'>
							How many ducks did you feed
						</InputLabel>
						<Input
							id='amount-ducks'
							aria-describedby='my-helper-text'
							type='number'
							value={numberOfDucks}
							name={'numberOfDucks'}
							onChange={this.handleChange}
						/>
					</FormControl>
					<FormControl>
						<FormControlLabel
							value='Start'
							control={
								<Checkbox
									color='primary'
									checked={repeatFeeding}
									onChange={this.handleCheckBoxChange}
								/>
							}
							label='Do you do this everyday?'
						/>
					</FormControl>
					{repeatFeeding ? this.renderRepeatFeeding() : ''}
					<div className={'Submit-Button'}>
						<Button
							variant='contained'
							color='primary'
							type='submit'
							disabled={loading}
						>
							Submit Data
						</Button>
					</div>
				</form>

				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					open={openSnack}
					autoHideDuration={6000}
					onClose={this.handleCloseSnackBar}
					message={snackMessage}
					action={
						<React.Fragment>
							<Button
								color='secondary'
								size='small'
								onClick={this.handleCloseSnackBar}
							>
								X
							</Button>
						</React.Fragment>
					}
				/>
			</div>
		);
	}
}
