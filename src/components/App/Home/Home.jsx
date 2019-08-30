import React, { Component } from 'react';
import {connect} from 'react-redux';

class Home extends Component {

    componentDidMount() {
        console.log('component mount log');
        this.getMovies();
        
    }

    //dispatch to saga to call for movies
    getMovies = () => {
        this.props.dispatch({
            type: 'GET_MOVIES'
        })
    }

    render() {
        return (
            <div>
                <p>Hello from home</p>
            </div>
        );
    }
}

const mapStateToProps = reduxStore => {
    return {
        reduxStore
    }
}

export default connect(mapStateToProps)(Home);