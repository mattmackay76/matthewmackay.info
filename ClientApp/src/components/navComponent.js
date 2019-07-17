import React, { Component } from 'react';
import { NavLink, withRouter  } from 'react-router-dom';  
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
            <div className="nav-component">
                <div className="links"> 
                    <NavLink to="/resume" activeClassName="selected">Resume</NavLink>
                    <NavLink to="/skills" activeClassName="selected">Skills</NavLink>
                </div>
                {logInOutButton}
            </div>
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

export default withRouter(connect(mapStateToProps, { authLogin, authLogout })(NavComponent));