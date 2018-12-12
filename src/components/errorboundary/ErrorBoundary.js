import React, { Component } from 'react';

class Errorboundary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        }
    }

    // static getDerivedStateFromError(error) {
    //     return { hasError: true};
    // }

    componentDidCatch( error, info ) {
      //  this.setState.hasError = true;
      console.log(error);
      this.setState({
          hasError: true
      });
    }

    render() {
        return (
            this.state.hasError ? 
                <h1>Ooops. That is not gooood at all.</h1> 
                : this.props.children
        )
    }
}
export default Errorboundary;