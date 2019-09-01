import React, { Component } from 'react';
import {connect} from 'react-redux';

class Edit extends Component {
    state = {
        description: '',
        name: ''
    }

    handleDescriptionChange = (event) => {
        console.log(this.state.description);
        this.setState({
            description: event.target.value
        })
    }

    handleNameChange = (event) => {
        console.log(this.state.name);
        this.setState({
            name: event.target.value
        })
    }

    handleSaveChanges = (id) => {
        console.log('handle save changes clicked');
        this.props.dispatch({
            type: 'CHANGE_INFO',
            payload: this.state
        })
    }

    handleCancelChanges = (id) => {
        console.log('cancel changes clicked');
        this.props.dispatch({
            type: 'GET_DETAILS',
            payload: id
        })
        this.props.history.push(`/details/`)
    }

    render() {
        console.log('state is:', this.state);
        return (
            <div>
                <button onClick={() => this.handleCancelChanges(this.props.details.id)}>Cancel Changes</button>
                <button onClick={() => this.handleSaveChanges(this.props.details.id)}>Save Changes</button>
                <p>Change movie name:</p>
                <input onChange={this.handleNameChange} />
                <p>Change movie description:</p>
                <input onChange={this.handleDescriptionChange} />
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        details: reduxStore.details,
    }
}
export default connect(mapStateToProps)(Edit);