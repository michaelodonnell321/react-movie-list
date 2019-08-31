import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button} from '@material-ui/core'

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
                {this.props.reduxStore.movies.map(movie => {
                    return (
                        <div>
                            {/* {JSON.stringify(movie)} */}
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} onClick={() => this.movieClickHandler(movie.id)} />
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