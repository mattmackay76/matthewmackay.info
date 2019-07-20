import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTests, authLogin } from '../actions';

class Fake extends Component {

    componentDidMount() {
    }

    render() {
        if (this.props.isLoggedIn) {
            if(!this.props.isLoaded)
                this.props.fetchTests();
        }
        else
            return null;

        return (
            <React.Fragment>
                <p>
                    fakeComponent IsLoggedIn {this.props.isLoggedIn.toString()}
                </p>
                <button onClick={this.props.fetchTests}>Re-fetch</button>
                {this.props.test}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.authReducer.isLoggedIn,
        isLoaded: state.testReducer !== null,
        auth: state.authReducer,
        test: state.testReducer
    };
};

export default connect(mapStateToProps, { fetchTests, authLogin })(Fake);