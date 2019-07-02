import React from 'react';
import { connect } from 'react-redux';

import { authLogin } from './actions';
import FakeComponent from './components/fakeComponent';

class App extends React.Component
{
    componentDidMount() {
        
    }

    loginClick = (e) => { //use lambda (arrow function) so that *this* is App
        this.props.authLogin();
    };

    render() {
        var loggedInOrNot = !this.props.isLoggedIn ? 'not ' : '';
        return (
            
            <div>Hello world is {loggedInOrNot} logged in
            <FakeComponent />
                <img src="/favicon.ico" />
                <button onClick={this.loginClick} className="ui button primary">Login</button>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authReducer.isLoggedIn
    };
};

export default connect(mapStateToProps, { authLogin })(App);
//export default App;