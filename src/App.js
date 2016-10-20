// http://academy.plot.ly/react/3-with-plotly/
import React from 'react';
import './App.css';
import xhr from 'xhr';

import Plot from './Plot.js';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			timeUnit: 'week',
			dates   : [],
			scores  : [],
			maxItems: 30
		};
	};

	componentDidMount = function () {
		this.fetchData();
	};

	fetchData = () => {
		var url = process.env.REACT_APP_PAGE_SPEED_API_URL;
		if ('day' === this.state.timeUnit) {
			url += '?period=day';
		}

		var self = this;

		xhr({
			url: url
		}, function (err, data) {
			var slice = [];
			var dates = [];
			var scores = [];
			var response = JSON.parse(data.body);

			if (parseInt(self.state.maxItems, 10) === 0) {
				slice = response.data;
			} else {
				slice = response.data.slice(Math.max(response.data.length - self.state.maxItems, 1));
			}

			for (var i = 0; i < slice.length; i++) {
				dates.push(slice[i].timestamp);
				scores.push(Math.round(slice[i].t));
			}

			self.setState({
				dates : dates,
				scores: scores
			});

		});
	};

	changeTimeUnit = (evt) => {
		this.setState({
			timeUnit: evt.target.value,
			dates   : [],
			scores  : []
		}, this.fetchData);
	};

	changeMaxItems = (evt) => {
		this.setState({
			maxItems: evt.target.value
		}, this.fetchData);
	};

	render() {
		return (
			<div>
				<div className="row">
					<div className="col-xs-12">
						<h1 className="text-xs-center">Average page speed</h1>
						<Plot
							xData={this.state.dates}
							yData={this.state.scores}
							type="bar"
						/>
					</div>
				</div>
				<div className="row">
					<form className="col-xs-12 col-md-6 offset-md-3">
						<fieldset className="form-group">
							<div className="form-check">
								<label className="form-check-label">
									<input name="timeUnit" type="radio" checked={this.state.timeUnit === 'week'} value="week" onChange={this.changeTimeUnit} className="form-check-input" />
									Weeks
								</label>
							</div>
							<div className="form-check">
								<label className="form-check-label">
									<input name="timeUnit" type="radio" checked={this.state.timeUnit === 'day'} value="day" onChange={this.changeTimeUnit} className="form-check-input" />
									Days
								</label>
							</div>
							<div className="form-group">
								<label htmlFor="maxItems">Number of items</label>
								<select className="form-control" id="maxItems" name="maxItems" onChange={this.changeMaxItems} value={this.state.maxItems}>
									<option>20</option>
									<option>30</option>
									<option>40</option>
									<option>50</option>
									<option value="0">max</option>
								</select>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		);
	}
}

export default App;
