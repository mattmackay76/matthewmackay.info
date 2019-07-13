import React from 'react';
import { connect } from 'react-redux';

import { authLogin } from './actions';
import LayoutComponent from './components/layoutComponent';

class App extends React.Component
{
    componentDidMount() {
        
    }

    loginClick = (e) => { //use lambda (arrow function) so that *this* is App
        this.props.authLogin();
    };

    render() {
        return (
            <div>
                <LayoutComponent />
                <br />
                <br /><br />
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