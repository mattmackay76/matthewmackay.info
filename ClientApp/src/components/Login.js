import React, { Component } from 'react';
import { NavLink, withRouter  } from 'react-router-dom';  
import { connect } from 'react-redux';
import { authLogin, authLogout } from '../actions';

class LoginComponent extends Component
{

    componentDidMount() {
    }

    render() {
        let divProps = {
            display: this.props.show ? '' : 'none'
        };
        
        return (
            <div className="login" style={divProps} >
                <div className="ui mini labeled input">
                    <div className="ui label">
                        username:
                    </div>
                    <input type="text" placeholder="" />
                </div><br/>
                <div className="ui mini labeled input">
                    <div className="ui label">
                        password:
                    </div>
                    <input type="password" placeholder="" />
                </div><br />
                <button className="mini ui button primary">login</button>
                <button onClick={this.props.onCancelClick} className="mini ui button primary">cancel</button>
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