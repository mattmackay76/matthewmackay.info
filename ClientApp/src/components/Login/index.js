import React, { Component } from 'react';
import { withRouter  } from 'react-router-dom';  
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { authLogin } from '../../services/auth/actions';
import { setFlag } from '../../actions';
import { INVALID_LOGIN_ATTEMPT, EXPIRED_LOGIN_ATTEMPT } from '../../actions/constants';

class Login extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        //I didn't think you needed this with an arrow (lambda) but apparently you do!
        this.loginClicked = this.loginClicked.bind(this); 
    }

    loginClicked = (e) => {
        this.props.authLogin(this.state.username, this.state.password);
        this.props.onCloseLogin(e);
    };

    handleChange = (event) => {
        //straight out'a reactjs.org
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    //Gets run when state changes but even if render not needed/called
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.flags[INVALID_LOGIN_ATTEMPT]) {
            toast.error("Invalid login");
            this.props.setFlag({ [INVALID_LOGIN_ATTEMPT]: undefined });
            return false; //no need to update/re-render this component in this case
        }
        if (nextProps.flags[EXPIRED_LOGIN_ATTEMPT ]) {
            toast.error("Login Expired");
            this.props.setFlag({ [EXPIRED_LOGIN_ATTEMPT]: undefined });
            this.props.history.push('/');
            return false; //no need to update/re-render this component in this case
        }
        
        return true;
    }

    render() {

        let divProps = {
            display: this.props.visible ? '' : 'none'
        };

        return (
            <form onSubmit={(e)=>e.preventDefault()} className="login" style={divProps} >
                <div className="ui mini labeled input">
                    <div className="ui label">
                        username:
                    </div>
                    <input value={this.state.username} name="username" onChange={this.handleChange} type="text" placeholder="" autoComplete="username" />
                </div><br/>
                <div className="ui mini labeled input">
                    <div className="ui label">
                        password:
                    </div>
                    <input value={this.state.password} name="password" onChange={this.handleChange} type="password" placeholder="" autoComplete="current-password" />
                </div><br />
                <button onClick={this.loginClicked} className="mini ui button primary">login</button>
                <button onClick={this.props.onCloseLogin} className="mini ui button primary">cancel</button>
            </form>  
        );
    }
}

const mapStateToProps = (state) => {
    return {
    isLoggedIn: state.auth.isLoggedIn,
        isLoaded: state.testReducer !== null,
        auth: state.auth,
        flags: state.flags
    };
};

export default withRouter(connect(mapStateToProps, { authLogin, setFlag })(Login));