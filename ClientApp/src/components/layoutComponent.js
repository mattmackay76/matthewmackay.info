import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTests, authLogin } from '../actions';

import './layoutComponent.css'
import NavComponent from './navComponent';

class LayoutComponent extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <div className="wrapper">
                <header className="main-head">MatthewMackay.info</header>
                <nav className="main-nav">
                    <NavComponent />
                </nav>
                <aside className="profile">
                    <section >
                        <span className="name" >Matthew Mackay</span><br />
                        <span>software engineer</span>
                    </section>
                    <img src="../mugshot.png" />
                    <ul>
                        <li>one</li>
                        <li>two</li>
                        <li>three</li>
                    </ul>
                </aside>
                <article className="resume">
                    <h4>My Resume</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </article>
                <footer className="main-footer">
                    <span className="copyright">
                        MatthewMackay.info - Copyright 2019, all rights reserved.
                    </span>
                </footer>
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