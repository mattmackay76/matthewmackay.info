import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';  
import { Segment, Sidebar } from 'semantic-ui-react'


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
            },
            sideBarVisible: false,
            sideBarTwoVisible: false,
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

    toggleSidebar = () =>
        this.setState({
            sideBarVisible: !this.state.sideBarVisible
        });

    toggleSidebarTwo = () =>
        this.setState({
            sideBarTwoVisible: !this.state.sideBarTwoVisible
        });
    

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

        let inputJsx = (label, name, id) => (
        <label key={id}>
                <span>{label}: </span>
            <input
                name={name} placeholder=""
                value={this.state.formData[name]}
                className={shouldMarkError(name) ? 'error' : ''}
                onChange={this.handleChange}
                onBlur={this.handleBlur(name)} />
            <div
                className="ui pointing above label"
                style={!shouldMarkError(name) ? { display: 'none' } : {}}>
                    {messages[name].map((e,i) => (
                        <p key={i}>{e}</p>
                    ))}
            </div>
        </label>);

        return (
            <article id="demos" className="content">

                <Sidebar.Pushable as={Segment}>
                    <Sidebar
                        animation='push'
                        icon='labeled'
                        onHide={this.handleSidebarHide}
                        direction='top'
                        visible={this.state.sideBarVisible}
                        style={{backgroundColor: 'white'}}
                    >
                        <form onSubmit={this.handleSubmit}>

                            {inputJsx("someDataLabel", "someData", 1)}
                            <div className="ui divider" />
                            {inputJsx("someOtherDataLabel", "someOtherData", 2)}
                            <div className="ui divider" />

                            <input disabled={isDisabled} type="submit" value={!this.props.isLoaded ? 'Add' : 'Update'} className="ui primary button" />
                        </form>  
                        <button onClick={this.toggleSidebar} className="ui button primary">close</button>
                    </Sidebar>
                    <Sidebar
                        animation='push'
                        icon='labeled'
                        onHide={this.handleSidebarHide}
                        direction='top'
                        visible={this.state.sideBarTwoVisible}
                        style={{ backgroundColor: 'white' }}
                    >
                        <ul>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>5</li>
                        </ul>
                        <ul>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>5</li>
                        </ul>
                        <button onClick={this.toggleSidebarTwo} className="ui button primary">close</button>
                    </Sidebar>
                    
                    <ul>
                        <li>3</li>
                        <li>4</li>
                        <li>3</li>
                        <li>4</li>
                        <li>3</li>
                        <li>4</li>
                        <li>3</li>
                        <li>4</li>
                        <li>main panel</li>
                    </ul>
                    <button onClick={this.toggleSidebar}>Sidebar</button>
                    <button onClick={this.toggleSidebarTwo}>Sidebar2</button>

                </Sidebar.Pushable>
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