import React, { Component } from 'react';
import { withRouter  } from 'react-router-dom';  
import { connect } from 'react-redux';
import { authLogin } from '../actions';

class LoginComponent extends Component
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

    componentDidMount() {
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
    isLoggedIn: state.authReducer.isLoggedIn,
        isLoaded: state.testReducer !== null,
        auth: state.authReducer,
    };
};

export default withRouter(connect(mapStateToProps, { authLogin })(LoginComponent));