import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';  
import "./Demos.css";
//import { toast } from 'react-toastify';

import { postTest } from '../../actions';

function validate(someData, someOtherData) {
    // true means invalid, so our conditions got reversed
    let validation = {
        errors: {
            someData: someData.length === 0,
            someOtherData: someOtherData.length === 0,
        },
        messages: {
            someData: someData.length === 0 ? ['Please, a value is required'] : [],
            someOtherData: someOtherData.length === 0 ? ['Please, a value is required', 'and also another'] : [],
        }
    };
    return validation;
}

class Demos extends Component {

    constructor(props) {

        super(props);
        //NOTE: If you do not initialize these form elements you'll get a warning
        //because the component doesn't have an initial value, react will think it's uncontrollered
        this.state = {
            formData: {
                someData: '',
                someOtherData: '',
            },
            touched: {
                someData: false,
                someOtherData: false
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

        if (!this.canBeSubmitted()) 
            return;

        var id = this.props.isLoaded ? this.props.test.id : undefined;
        this.props.postTest(this.state.formData, id);
    };

    handleBlur = field => evt => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    };

    canBeSubmitted() {
        const validation = validate(this.state.formData.someData, this.state.formData.someOtherData);
        const isDisabled = Object.keys(validation.errors).some(x => validation.errors[x]);
        return !isDisabled;
    }

    componentDidMount() {
    }

    render() {
        //Required logged in
        if (!this.props.isLoggedIn) {
            this.props.history.push('/'); //redirects us back to the root since user is not logged in
            return null; //do not render anything
        }

        const { errors, messages } = validate(this.state.formData.someData, this.state.formData.someOtherData);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        const shouldMarkError = field => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
            return hasError ? shouldShow : false;
        };


        return (
            <article id="demos" className="content">
                
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <span>someData: </span><input
                            name="someData" placeholder=""
                            value={this.state.formData.someData}
                            className={shouldMarkError("someData") ? 'error' : ''}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur("someData")} />
                        <div
                            className="ui pointing above label"
                            style={!shouldMarkError("someData") ? { display: 'none' } : {}}>
                            {messages["someData"].map(e => (
                                <p>{e}</p>
                            ))}
                        </div>
                    </label>
                    
                    <div className="ui divider" />

                    <label>
                        <span>someOtherData: </span><input
                            name="someOtherData"
                            className={shouldMarkError("someOtherData") ? 'error' : ''}
                            value={this.state.formData.someOtherData}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur("someOtherData")} />
                        <div
                            className="ui pointing above label"
                            style={!shouldMarkError("someOtherData") ? { display: 'none' } : {}}>
                            {messages["someOtherData"].map(e => (
                                <p>{ e }</p>
                            ))}
                        </div>
                    </label>

                    <div className="ui divider" />
                    <input disabled={isDisabled} type="submit" value={ !this.props.isLoaded ? 'Add': 'Update'} className="ui primary button" />
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