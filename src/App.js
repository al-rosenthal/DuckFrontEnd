import React from 'react';
import DuckForm from './components/DuckForm';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './App.css';

class App extends React.Component {
	render() {
		return (
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<div className='App'>
					<header className='App-header'>
						<p>Feed those ducks.</p>
						<DuckForm />
					</header>
				</div>
			</MuiPickersUtilsProvider>
		);
	}
}

export default App;
