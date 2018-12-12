import React, { Component } from 'react';
import Errorboundary from '../components/errorboundary/ErrorBoundary';
import ShipDetails from '../components/shipdetails/ShipDetails';
import SetTravelCard from '../components/SetTravelCard';
import Particles from 'react-particles-js';
import './App.css';

const starshipUrls = [
	'https://swapi.co/api/starships/',
	'https://swapi.co/api/starships/?page=2',
	'https://swapi.co/api/starships/?page=3',
	'https://swapi.co/api/starships/?page=4'
];

class App extends Component {

	state = {
		ships: [],
		chosenShip: {},
		currentShipPilots: [],
		planets: [],
		targetPlanet: {},
		travelTime: ['-', '-']
	}

	countTravelTime() {
		if (this.state.chosenShip.name && this.state.targetPlanet.climate) {
			const totalHours = 3 * Math.ceil(Number(this.state.chosenShip.hyperdrive_rating))
				* Number(this.state.targetPlanet.name.length)
				* Math.floor((Math.random() * 10) + 1);
			const days = Math.floor(totalHours / 24);
			const hours = totalHours % 24;
			this.setState({
				travelTime: [days, hours]
			})
		}
	}

	async fetchPlanets() {
		const fetchedPlanets = [];
		for (let j = 1; j < 62; j++) {
			const resp = await fetch(`https://swapi.co/api/planets/${j}/`);
			const jsonedResponse = await resp.json();
			fetchedPlanets.push(jsonedResponse);
		}
		return fetchedPlanets;
	}


	async fetchShips(starshipUrl) {
		const resp = await fetch(starshipUrl);
		const jsonedResponse = await resp.json();
		const fetchedShips = await jsonedResponse.results;
		return fetchedShips;
	}

	async fetchPilot(url) {
		if (url) {
			const resp = await fetch(url);
			const jsonedResponse = await resp.json();
			const fetchedPilot = await jsonedResponse.name;
			return fetchedPilot;
		} else {
			return await ("Free to drive");
		}
	}

	async choosePlanet(event) {
		await this.setState({ targetPlanet: this.state.planets[event.target.getAttribute('index')] });
		this.countTravelTime();
	}

	async chooseShip(event) {
		await this.setState({ chosenShip: this.state.ships[event.target.getAttribute('index')] });
		const { pilots } = this.state.chosenShip;
		let pilotsNames = '';
		if (pilots.length !== 0) {
			for (let i = 0; i < pilots.length; i++) {
				pilotsNames += await this.fetchPilot(pilots[i]) + ', ';
			}
		} else {
			pilotsNames = "No official driver. Feel free to drive.";
		}
		await this.setState({ currentShipPilots: pilotsNames });
		this.countTravelTime();
	}

	async componentDidMount() {
		const firstFetch = await this.fetchShips(starshipUrls[0]);
		const secondFetch = await this.fetchShips(starshipUrls[1]);
		const thirdFetch = await this.fetchShips(starshipUrls[2]);
		const fourthFetch = await this.fetchShips(starshipUrls[3]);
		const ships = firstFetch.concat(...secondFetch, ...thirdFetch, ...fourthFetch);
		this.setState({ ships: ships });
		const fetchedPlanets = await this.fetchPlanets();
		this.setState({ planets: fetchedPlanets });
	}

	render() {
		return (
			<Errorboundary>
				<div className="tc">
					<Particles
						style={{ display: "block", position: 'absolute', zIndex: -1 }}
						params={{
							particles: {
								number: {
									value: 130,
									density: { enable: true }
								}
							}
						}}
					/>
					<h1 className='header w-70'>Order your StarShip Ride now!</h1>
					<div className='flex justify-center flex-wrap-ns'>
						<div className='container container-small-size'>
							<p><span style={{ color: 'lightskyblue' }} >Your current location:</span> EARTH</p>
						</div>
						<div className='container container-small-size'>
							<p>
								<span style={{ color: 'lightskyblue' }} >Destination planet: </span>{this.state.targetPlanet.name}.
								<span style={{ color: 'lightskyblue' }}> Climate:</span> {this.state.targetPlanet.climate}
							</p>
						</div>
					</div>
					<div className='flex justify-around flex-wrap-ns'>
						<SetTravelCard
							data={this.state.planets}
							cardTitle='Choose a Destination'
							clickHandler={this.choosePlanet.bind(this)}
						/>
						<SetTravelCard
							data={this.state.ships}
							cardTitle='Choose a Vehicle'
							clickHandler={this.chooseShip.bind(this)}
						/>
						<ShipDetails
							data={this.state.chosenShip}
							pilots={this.state.currentShipPilots}
						/>
					</div>
					<div className='container container-small-size'>
						<p>The travel is going to take {this.state.travelTime[0]} days and {this.state.travelTime[1]} hours</p>
					</div>
					<div id='button' className="dib" onClick={function() {alert('Your starship has set off... in a galaxy far, far away...')}}>ORDER</div>
				</div>
			</Errorboundary>
		)
	}
}



export default App;

