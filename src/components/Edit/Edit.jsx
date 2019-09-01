import React, { Component } from 'react';
import {connect} from 'react-redux';

class Edit extends Component {
    state = {
        description: '',
        name: '',
        id: 0
    }
    //id is held here
    componentDidMount() {
        this.setState({
            id: this.props.idHolder
        })
    }

    //TODO - combine these two change handlers
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

    // dispatch with ID from click from details reducer
    handleSaveChanges = (id) => {
        console.log('handle save changes clicked');
        //return if description or name are blank, tell user to fill out both
        if (this.state.description === '' || this.state.name === '') {
            alert('Updated name and description needed to save');
            return;
        }
        //dispatch to change_info with the state
        this.props.dispatch({
            type: 'CHANGE_INFO',
            payload: this.state
        })
        //dispatch to get_details to re-load details page with new DB info
        this.props.dispatch({
            type: 'GET_DETAILS',
            payload: id
        })
        this.props.history.push('/details')
    }

    //on cancel, reload details page, same dispatch as click on the details from home page
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
                {/* use id from redux store details reducer to send to sagas to DB with cancel and save buttons */}
                <button onClick={() => this.handleCancelChanges(this.props.details.id)}>Cancel Changes</button>
                <button onClick={() => this.handleSaveChanges(this.props.details.id)}>Save Changes</button>
                {/* save inputs in local state before dispatch on button click */}
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
        idHolder: reduxStore.idHolder
    }
}

export default connect(mapStateToProps)(Edit);