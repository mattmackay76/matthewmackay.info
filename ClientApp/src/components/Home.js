import React from 'react';
import { connect } from 'react-redux';

const Home = props => (
  <div>
        <h1>Hello world</h1>
        /api/Auth/Login with body: UserName, Password
  </div>
);

export default connect()(Home);
