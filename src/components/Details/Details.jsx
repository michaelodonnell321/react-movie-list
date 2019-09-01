import React, { Component } from 'react';
import {connect} from 'react-redux';

class Details extends Component {

    handleBackClick = () => {
        //send user back to movie list on click
        console.log('in back click');
        this.props.history.push('/');
    }

    handleEditClick = (id) => {
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
                {this.props.details.map(movie => {
                    return (
                        <div>
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} />
                            <p>{movie.description}</p>
                            <p>{movie.genres}</p>
                            <button onClick={this.handleBackClick}>Back to List</button>
                            <button onClick={this.handleEditClick}>Edit</button>
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