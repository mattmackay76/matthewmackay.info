import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';        
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { connect } from 'react-redux';
import { fetchTests, authLogin } from '../actions';

import './layoutComponent.css'
import NavComponent from './navComponent';
import Login from './Login';
import Resume from './content/resumeComponent';
import Skills from './content/skillsComponent';
import Demos from './content/demosComponent';

class LayoutComponent extends Component {

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
                        <NavComponent
                            loginDisabled={this.state.loggingIn}
                            onClick={() => this.setState({ loggingIn: !this.state.loggingIn })} />
                        <Login
                            visible={this.state.loggingIn}
                            onCloseLogin={() => this.setState({ loggingIn: false })} />
                    </nav>
                    <Switch>
                        <Route path="/" exact component={()=><Resume />} />
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

export default connect(mapStateToProps, { fetchTests, authLogin })(LayoutComponent);