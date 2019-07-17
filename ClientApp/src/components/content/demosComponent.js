import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';  

class DemosComponent extends Component {

    componentDidMount() {
    }

    render() {
        if (!this.props.isLoggedIn)
            this.props.history.push('/'); //redirects us back to the root since user is not logged in

        return (
            <article className="content">
                <h4>Demos</h4>
                <p>nothing but us chickens</p>
                <NavLink to="/">Go Home</NavLink>
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
export default withRouter(connect(mapStateToProps, {})(DemosComponent)); 