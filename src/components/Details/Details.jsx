import React, { Component } from 'react';
import {connect} from 'react-redux';

class Details extends Component {
    render() {
        return (
            <div>
                <p>Hello from details</p>
                {JSON.stringify(this.props.details)}
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