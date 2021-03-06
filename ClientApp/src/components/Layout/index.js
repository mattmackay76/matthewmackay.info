﻿import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';

import './style.css'
import 'react-toastify/dist/ReactToastify.min.css';

import { authLogin } from '../../services/auth/actions';
import Nav from '../Nav';
import Login from '../Login';
import Resume from '../../scenes/Resume';
import Skills from '../../scenes/Skills';
import Demos from '../../scenes/Demos';

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = { loggingIn: false };
    }

    componentDidMount() {
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <div className="layout">

                        <header className="header">
                            <a href="/">MatthewMackay.info</a>
                        </header>

                        <aside className="profile">
                            <section >
                                <span className="name" >Matthew Mackay</span><br />
                                <span>software engineer</span>
                            </section>
                            <div className="center">
                                <img src="/mugshot.png" alt="Matthew Mackay, software engineer!" />
                            </div>
                            <ul>
                                <li>one</li>
                                <li>two</li>
                                <li>three</li>
                            </ul>
                            <ul>
                                <li>one</li>
                                <li>two</li>
                                <li>three</li>
                            </ul>
                            <ul>
                                <li>one</li>
                                <li>two</li>
                                <li>three</li>
                            </ul>
                            <ul>
                                <li>one</li>
                                <li>two</li>
                                <li>three</li>
                            </ul>
                        </aside>

                        <nav className="nav">
                            <Nav
                                loginDisabled={this.state.loggingIn}
                                onClick={() => this.setState({ loggingIn: !this.state.loggingIn })} />
                            <Login
                                visible={this.state.loggingIn}
                                onCloseLogin={() => this.setState({ loggingIn: false })} />
                        </nav>

                        <Switch>
                            <Route path="/" exact component={() => <Resume />} />
                            <Route path="/resume" component={() => <Resume />} />
                            <Route path="/skills" component={() => <Skills />} />
                            <Route path="/demos" component={() => <Demos />} />
                        </Switch>

                        <footer className="footer">
                            <span className="copyright">
                                Copyright 2019, all rights reserved.
                            </span>
                        </footer>

                    </div>
                    <ToastContainer autoClose={2000} hideProgressBar={true} />
                </div>
            </BrowserRouter>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        auth: state.auth,
    };
};

export default connect(mapStateToProps, { authLogin })(Layout);