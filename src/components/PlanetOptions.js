import React, { Component } from 'react';

class PlanetOptions extends Component {
    render() {
        return (
            <div className='container'>
                <h3>Choose a Destination</h3>
                <div className='starships-list'>
					
					{
						!this.props.shipData
							?
							<h1>Loading...</h1>
							:
							<ul>
								{
									this.props.shipData.map((ship, index) => {
										return (
											<a href='' key={index} /*onClick={handleClick}*/><li>{ship.name}</li></a>
										)
									})
								}
							</ul>
					}
				</div>
            </div>
        );
    }
}

export default PlanetOptions;