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

    movieClickHandler = () => {
        console.log('in movie click handler')
    }

    render() {
        return (
            <div>
                {this.props.reduxStore.movies.map(movie => {
                    return (
                        <div>
                            {/* {JSON.stringify(movie)} */}
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} onClick={this.movieClickHandler} />
                            <p>{movie.description}</p>
                            </div>
                    )
                })}
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