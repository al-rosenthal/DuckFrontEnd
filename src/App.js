import React from 'react';
import DuckForm from './components/DuckForm';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import './App.css';

class App extends React.Component {
	render() {
		return (
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<div className='App'>
					<header className='App-header'>
						<h2>
							Have you fed some ducks today?{' '}
							<span role='img' aria-label='duck'>
								🦆
							</span>
						</h2>
						<p>
							Please fill out this form if you have, it helps with a lot with my
							research!
						</p>
						<DuckForm />
					</header>
				</div>
			</MuiPickersUtilsProvider>
		);
	}
}

export default App;
