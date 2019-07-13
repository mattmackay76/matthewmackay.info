import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTests, authLogin } from '../actions';

import './layoutComponent.css'

class LayoutComponent extends Component {

    componentDidMount() {
    }

    render() {
        const resume = (
            <div className='layoutResume'>
                My resume stuff
            </div>
        );
        return (
            <div className='layoutContainer'>
                <div className='layoutName'>My name</div>
                <div className='layoutMugShot'>
                    <img src='https://via.placeholder.com/150' />
                </div>
                <div className='layoutMenu'>Menu</div>
                    {!this.props.isLoggedIn ? resume : '' }
                <div className='layoutContent'>
                    my content
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authReducer.isLoggedIn,
        auth: state.authReducer,
    };
};

export default connect(mapStateToProps, { fetchTests, authLogin })(LayoutComponent);