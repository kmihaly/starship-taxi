import React, { Component } from 'react';


class SetTravelCard extends Component {

	render() {
		return (
			<div className="container container-big-size" >
				<h3>{this.props.cardTitle}</h3>
				<div className='starships-list'>
					
					{
						!this.props.data.length
							?
							<h3 className='tc'>Loading...</h3>
							:
							<ul id='options-list'>
								{
									this.props.data.map((item, index) => {
										return (
											<li key={index} onClick={this.props.clickHandler} index={index}>{item.name}</li>
										)
									})
								}
							</ul>
					}
				</div>
			</div>
		);
	}
};


/*
StarShips.PropTypes = {
	shipData: []
}*/

/*OR

StarShips.propTypes = {
	shipData: arrayOf(PropTypes.shape({
		name: PropTypes.string,
		shipClass: PropTypes.string,
		pilots: PropTypes.array,
		crew: PropTypes.number,
		cargo: PropTypes.number,
	}))
}
*/

export default SetTravelCard;

//A next-et használva további hajókat lehet lekérni!!!
