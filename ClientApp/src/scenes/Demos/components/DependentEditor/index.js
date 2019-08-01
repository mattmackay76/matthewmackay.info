﻿import React, { Component } from 'react';
import { Image, List } from 'semantic-ui-react'

import "./style.css";




class DependentEditor extends Component {
    
    constructor(props) {

        super(props);
        this.state = {
            dependents: {},
            dependent: {},
            formData: {
                name: '',
            },
            touched: {
                name: false,
            },
        };

        //handleSubmit is called by a control and despite being an arrow function *this* is wrong
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        //TODO: add some fake dependents
        let dependent = this.state.formData;
        dependent.id = this.state.dependent.id;
        
        let dependents = {
            ...this.state.dependents,
            [dependent.id]: dependent,
        };
        
        if (this.props.onSubmit)
            this.props.onSubmit(dependents);

    };



    //This is allegedly the patter for children to be aware of changing props
    //and take a copy to local state so that we don't modify the parent. Gets called
    //if the parent changes a property for example
    componentDidUpdate(prevProps) {
        if (this.props.dependents !== prevProps.dependents) {
            this.setState({ dependents: this.props.dependents });
        }
        if (this.props.dependent !== prevProps.dependent) {
            this.setState({
                dependent: this.props.dependent,
                formData: this.props.dependent,
                touched: Object.keys(this.state.touched).map((key) => ({
                    [key]: false,
                })),
            });
        }
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

    handleBlur = field => evt => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    };

    canBeSubmitted() {
        const validation = validate(this.state.formData);
        const isDisabled = Object.keys(validation.errors).some(x => validation.errors[x]);
        return !isDisabled;
    }

    render() {
        const { errors, messages } = validate(this.state.formData);
        const isDisabled = Object.keys(errors).some(x => errors[x]);  //errors is a Bool[]
        const shouldMarkError = field => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
            return hasError ? shouldShow : false;
        };


        let inputJsx = (label, name, id) => (
            <label key={id} htmlFor={name}>
                <span>{label}: </span>
                <input
                    id={name}
                    name={name} placeholder=""
                    value={this.state.formData[name]}
                    className={shouldMarkError(name) ? 'error' : ''}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur(name)} />
                <div
                    className="ui pointing above label"
                    style={!shouldMarkError(name) ? { display: 'none' } : {}}>
                    {messages[name].map((e, i) => (
                        <p key={i}>{e}</p>
                    ))}
                </div>
            </label>);

        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit} className="dependent-editor">
                    <div className="formWrapper" >
                        <section>
                            {/*Clean up this key/1,2,3 etc */}
                            {inputJsx("Name", "name", 1)}
                        </section>
                    </div>
                </form>
                <button disabled={isDisabled} onClick={this.handleSubmit} className="ui button primary mini" >Add</button>
                <button onClick={this.props.onClose} className="ui button primary" style={{ width: '100%' }}>close</button>
            </React.Fragment>
        );
    }
}

function validate(formData) {
    let validation = {
        errors: {
            name: false,
        },
        messages: {
            name: [],
        }
    };

    //TODO: Clean this up with RegEx, too verbose
    if (formData.name.length === 0) {
        validation.errors.name = true;
        validation.messages.name = validation.messages.name
            .concat('Name is required.')
    }
    if (formData.annualPayPeriods > 52) { //I invented this rule just for demo
        validation.errors.annualPayPeriods = true;
        validation.messages.annualPayPeriods = validation.messages.annualPayPeriods
            .concat('Annual pay periods not to exceed 52.');
    }

    return validation;
}

export default DependentEditor;
