import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {

    //get movies on load from DB
    componentDidMount() {
        console.log('component mount log');
        this.getMovies();

    }

    //dispatch to saga to call for movies on mount
    getMovies = () => {
        this.props.dispatch({
            type: 'GET_MOVIES'
        })
    }
    //on clicking the poster, user is sent to the details page for each movie
    movieClickHandler = (id) => {
        console.log('in movie click handler')
        this.props.dispatch({
            type: 'GET_DETAILS',
            payload: id
        })
        this.props.history.push(`/details/`)
    }

    render() {
        return (
            <div>
                {/* map over data from movies reducer for full list of movies in DB */}
                {this.props.reduxStore.movies.map(movie => {
                    return (
                        <div key={movie.id}>
                            {/* {JSON.stringify(movie)} */}
                            <h3>{movie.title}</h3>
                            <img alt={movie.description} src={movie.poster} onClick={() => this.movieClickHandler(movie.id)} />
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