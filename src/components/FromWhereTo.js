import React, { Component } from 'react';

class FromWhereTo extends Component {

    render() {

        const { name, climate } = this.props.data;

        return (
            <div className='flex justify-center flex-wrap-ns'>
                <div className='container container-small-size'>
                    <p><span style={{ color: 'lightskyblue' }} >Your current location:</span> EARTH</p>
                </div>
                <div className='container container-small-size'>
                    <p>
                        <span style={{ color: 'lightskyblue' }} >Destination planet: </span>{name}.
								<span style={{ color: 'lightskyblue' }}> Climate:</span> {climate}
                    </p>
                </div>
            </div>

        );
    }
}

export default FromWhereTo;