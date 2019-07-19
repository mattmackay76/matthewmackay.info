import React, { Component } from 'react';
import { NavLink, withRouter  } from 'react-router-dom';  
import { connect } from 'react-redux';
import { authLogout } from '../actions';

class NavComponent extends Component {

    componentDidMount() {
    }

    render() {
        const demosLink = this.props.isLoggedIn ?
            <NavLink to="/demos" activeClassName="selected">Demos</NavLink> : null;
        const buttonClass = 'mini ui button primary' + (this.props.loginDisabled ? ' disabled ' : ''); //watch those ()'s else the string concat fails
        const logInOutButton = this.props.isLoggedIn ?
                <button onClick={this.props.authLogout} className={buttonClass}>Logout</button>  
            :   <button onClick={this.props.onClick} className={buttonClass}>Login</button>

        return (
            <div className="nav-component">
                <div className="links"> 
                    <NavLink to="/resume" activeClassName="selected">Resume</NavLink>
                    <NavLink to="/skills" activeClassName="selected">Skills</NavLink>
                    {demosLink}
                </div>
                {logInOutButton}
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authReducer.isLoggedIn,
    };
};

export default withRouter(connect(mapStateToProps, { authLogout } )(NavComponent));