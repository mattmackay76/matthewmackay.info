import React, { Component } from 'react';
import { NavLink, withRouter  } from 'react-router-dom';  
import { connect } from 'react-redux';
import { authLogin, authLogout } from '../actions';

class LoginComponent extends Component
{

    componentDidMount() {
    }

    render() {
        var hidden = this.props.hidden;
        return (
            <div className="login">
                <div class="ui mini labeled input">
                    <div class="ui label">
                        username:
                    </div>
                    <input type="text" placeholder="" />
                </div><br/>
                <div class="ui mini labeled input">
                    <div class="ui label">
                        password:
                    </div>
                    <input type="password" placeholder="" />
                </div><br />
                <button className="mini ui button primary">login</button>
                <button className="mini ui button primary">cancel</button>
            </div>  
        );
    }
}

const mapStateToProps = (state) => {
    return {
    isLoggedIn: state.authReducer.isLoggedIn,
        isLoaded: state.testReducer !== null,
        auth: state.authReducer,
    };
};

export default withRouter(connect(mapStateToProps, { authLogin, authLogout })(LoginComponent));