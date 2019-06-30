import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTests, authLogin } from '../actions';

class FakeComponent extends Component {

    componentDidMount() {
        this.props.fetchTests();
        this.props.authLogin();
    }

    render() {
        return (
            <div>
                <p>
                    fakeComponent isLoggedIn {this.props.auth.isLoggedIn.toString()}
                </p>
                <p>
                    fakeComponent token {this.props.auth.token}
                </p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer,
        test: state.testReducer
    };
};

export default connect(mapStateToProps, { fetchTests, authLogin } )(FakeComponent);