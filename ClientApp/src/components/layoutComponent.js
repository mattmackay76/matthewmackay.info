import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';        

import { connect } from 'react-redux';
import { fetchTests, authLogin } from '../actions';

import './layoutComponent.css'
import NavComponent from './navComponent';
import Login from './Login';
import Resume from './content/resumeComponent';
import Skills from './content/skillsComponent';
import Demos from './content/demosComponent';

class LayoutComponent extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <BrowserRouter>
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
                            <img src="../mugshot.png" />
                        </div>
                        <ul>
                            <li>one</li>
                            <li>two</li>
                            <li>three</li>
                        </ul>
                    </aside>
                    <nav className="nav">
                        <NavComponent />
                        <Login hidden="true"/>
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