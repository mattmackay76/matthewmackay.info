import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';  
import { toast } from 'react-toastify';

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
        toast('form submitted');
        event.preventDefault();
    };

    componentDidMount() {
    }

    render() {
        if (!this.props.isLoggedIn)
            this.props.history.push('/'); //redirects us back to the root since user is not logged in

        return (
            <article className="content">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input name="name" value={this.state.name} onChange={this.handleChange} />
                    </label>
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
export default withRouter(connect(mapStateToProps, {})(Demos)); 