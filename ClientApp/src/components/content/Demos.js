import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';  
import "./Demos.css";
//import { toast } from 'react-toastify';

import { postTest } from '../../actions';

class Demos extends Component {

    constructor(props) {

        super(props);
        //NOTE: If you do not initialize these form elements you'll get a warning
        //because the component doesn't have an initial value, react will think it's uncontrollered
        this.state = {
            formData: {
                someData: '',
                someOtherData: '',
            }
        };
    }

    handleChange = (event) => {
        //straight out'a reactjs.org
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        //NOTE: notice how ...this.state.formData is *first* before [name]:value
        //any other way the previous data overwrites what we're trying to update on this event
        this.setState(
            {
                formData: {
                    ...this.state.formData,
                    [name]: value
                }
            });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        var id = this.props.test ? this.props.test.id : undefined;
        this.props.postTest(this.state.formData, id);
    };

    componentDidMount() {
    }

    render() {

        //Required logged in
        if (!this.props.isLoggedIn) {
            this.props.history.push('/'); //redirects us back to the root since user is not logged in
            return null; //do not render anything
        }

        return (
            <article id="demos" className="content">
                
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input name="someData" value={this.state.formData.someData} onChange={this.handleChange} />
                        <input type="submit" value="Add" className="ui primary button" />
                    </label>

                    <div className="ui divider" />
                        <div className="ui pointing above label" style2={{ display: 'none' }}>
                            Please enter a value
                        </div>
                    <input name="someOtherData" value={this.state.formData.someOtherData} onChange={this.handleChange} />

                    
                    <div className="ui divider" />

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