import React, { Component } from 'react';
import './ShipDetails.css';

class ShipDetails extends Component {
      
    render() {
        const { 
            name, 
            model, 
            starship_class, 
            crew, 
            cargo_capacity, 
            hyperdrive_rating 
        } = this.props.data;

        return (
            <div className='container container-big-size' > 
            <h3>Ship Details</h3>
            <ul id='details-list' className='details-list'>
                <li>Name: <span>{name}</span></li>
                <li>Model: <span>{model}</span></li>
                <li>Class: <span>{starship_class}</span></li>
                <li>Pilots: <span>{this.props.pilots}</span></li> 
                <li>Crew: <span>{crew}</span></li>
                <li>Cargo Capacity: <span>{cargo_capacity}</span></li>
                <li>Hyperdrive Rating: <span>{hyperdrive_rating}</span></li>
            </ul>
			
            </div>
        );
    }
}

export default ShipDetails;