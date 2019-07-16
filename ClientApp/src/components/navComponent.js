import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authLogin, authLogout } from '../actions';

class NavComponent extends Component {

    componentDidMount() {
    }

    //use lambda (arrow function) so that *this* is App
    loginClick = (e) => {
        this.props.authLogin();
    };
    logoutClick = (e) => {
        this.props.authLogout();
    };
       
    render() {
        var logInOutButton = this.props.isLoggedIn ?
            <button onClick={this.logoutClick} className="mini ui button primary">Logout</button> :
            <button onClick={this.loginClick} className="mini ui button primary">Login</button>;

        return (
            <ul>
                <li>
                    <a href="/" style={{ fontSize: '1.5em' }}>
                        <i className="home icon" />
                    </a>
                </li>
                <li>
                    <a href="#">Resume</a>
                </li>
                <li>
                    {logInOutButton}
                </li>
            </ul>
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

export default connect(mapStateToProps, { authLogin, authLogout })(NavComponent);