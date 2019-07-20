import React from 'react';
import { connect } from 'react-redux';
import { authLogin } from './actions';
import Layout from './components/Layout';
  

class App extends React.Component
{
    componentDidMount() {
        
    }

    render() {
        return (
            <Layout />
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