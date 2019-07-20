import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { connect } from 'react-redux';
import { fetchTests, authLogin } from '../actions';

import './Layout.css'
import Nav from './Nav';
import Login from './Login';
import Resume from './content/Resume';
import Skills from './content/Skills';
import Demos from './content/Demos';

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
                                <img src="../mugshot.png" alt="Matthew Mackay, software engineer!" />
                            </div>
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
                    <ToastContainer />
                </div>
            </BrowserRouter>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authReducer.isLoggedIn,
        auth: state.authReducer,
    };
};

export default connect(mapStateToProps, { fetchTests, authLogin })(Layout);