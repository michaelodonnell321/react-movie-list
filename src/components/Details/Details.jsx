import React, { Component } from 'react';
import {connect} from 'react-redux';

class Details extends Component {

    handleBackClick = () => {
        //send user back to movie list on click
        console.log('in back click');
        this.props.history.push('/');
    }

    handleEditClick = (id) => {
        //moves users to /edit on click
        console.log('in edit click');
        this.props.history.push('/edit');
    }

    render() {
        console.log('genre list is', this.props.genres);
        return (
            <div>
                {/* {JSON.stringify(this.props.details[0])} */}
                {/* why doesn't this work?  */}
                {/* {JSON.stringify(this.props.details[0].title)} */}
            <div>
                
            </div>
            <div>
                {/* map over details reducer array to load details of the movie that was clicked */}
                {this.props.details.map(movie => {
                    return (
                        <div>
                            <button onClick={this.handleBackClick}>Back to List</button>
                            <button onClick={this.handleEditClick}>Edit</button> 
                            <h3>{movie.title}</h3>
                            <img alt={movie.description} src={movie.poster} />
                            <p>{movie.description}</p>
                            {/* genres is coming from GENRES reducer */}
                            <p>{movie.genres}</p>
                           
                        </div>
                    )
                })}
                {/* {JSON.stringify(this.props.details)} */}
            </div>
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        details: reduxStore.details,
        genres: reduxStore.details.genres,
    }
}

export default connect(mapStateToProps)(Details);