import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';  
import { toast } from 'react-toastify';

import { postTest } from '../../actions';

class Demos extends Component {

    constructor(props) {

        super(props);
        this.state = {};
    }

    handleChange = (event) => {
        //straight out'a reactjs.org
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        var id = this.props.test ? this.props.test.id : undefined;
        this.props.postTest(this.state.someData, id);
    };

    componentDidMount() {
    }

    render() {
        if (!this.props.isLoggedIn)
            this.props.history.push('/'); //redirects us back to the root since user is not logged in
        let newId = this.props.test ?
            <span>InsertedId: {this.props.test.id}</span> : null;
        return (
            <article className="content">
                {newId}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input name="someData" value={this.state.someData} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Add" className="ui primary button" />
                </form>                
            </article>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authReducer.isLoggedIn,
        isLoaded: state.testReducer !== null,
        auth: state.authReducer,
        test: state.testReducer
    };
};

//withRouter so that we have access to this.pops.history
export default withRouter(connect(mapStateToProps, { postTest })(Demos)); 