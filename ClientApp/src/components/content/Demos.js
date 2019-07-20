﻿import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';  
import FakeComponent from '../Fake';

class Demos extends Component {

    componentDidMount() {
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!this.props.isLoggedIn)
            this.props.history.push('/'); //redirects us back to the root since user is not logged in
        return true;
    }


    render() {
  
        return (
            <article className="content">
                <h4>Demos</h4>
                <FakeComponent />
            </article>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authReducer.isLoggedIn,
        isLoaded: state.testReducer !== null,
        auth: state.authReducer,
        test: state.testReducer
    };
};

//withRouter so that we have access to this.pops.history
export default withRouter(connect(mapStateToProps, {})(Demos)); 