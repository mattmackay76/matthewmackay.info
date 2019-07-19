import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTests, authLogin } from '../actions';

class FakeComponent extends Component {

    componentDidMount() {
    }

    render() {
        if (this.props.isLoggedIn) {
            if(!this.props.isLoaded)
                this.props.fetchTests();
        }
        else
            return null;
        

        var test = <p></p>;

        if (this.props.isLoggedIn && this.props.isLoaded)
            test = (
                <div>
                    <div>
                        Generated Key: {JSON.stringify(this.props.test)}
                    </div>
                    <button onClick={this.props.fetchTests}>Re-fetch</button>
                </div>
            );
        
        return (
            <div style={{ width: '75%', overflowWrap: 'break-word' }}>
                <p>
                    fakeComponent IsLoggedIn {this.props.isLoggedIn.toString()}
                </p>
                {test}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.authReducer.isLoggedIn,
        isLoaded: state.testReducer !== null,
        auth: state.authReducer,
        test: state.testReducer
    };
};

export default connect(mapStateToProps, { fetchTests, authLogin } )(FakeComponent);