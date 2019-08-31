import React, { Component } from 'react';
import {connect} from 'react-redux';

class Details extends Component {

    handleBackClick = () => {
        //send user back to movie list on click
        console.log('in back click');
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
            <div>
                <button onClick={this.handleBackClick}>Back to List</button>
            </div>
            <div>
                {this.props.details.map(movie => {
                    return (
                        <div>
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} />
                            <p>{movie.description}</p>
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
        details: reduxStore.details
    }
}

export default connect(mapStateToProps)(Details);