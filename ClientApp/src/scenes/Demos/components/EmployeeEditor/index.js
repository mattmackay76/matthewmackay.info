import React, { Component } from 'react';

import "./style.css";

function validate(someData, someOtherData) {
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

class EmployeeEditor extends Component {

    constructor(props) {

        super(props);
        //NOTE: If you do not initialize these form elements you'll get a warning
        //because the component doesn't have an initial value, react will think it's uncontrollered
        this.state = {
            formData: {
                someData: '',
                someOtherData: '',
            },
            touched: this.unTouched(),
        };
    }

    unTouched = () => {
        return {
            someData: false,
            someOtherData: false
        }
    };

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

        if (this.props.onSubmit)
            this.props.onSubmit({ ...this.state.formData });

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

    componentDidUpdate(prevProps) {
        if (this.props.employee !== prevProps.employee) {
            this.setState({ formData: this.props.employee, touched: this.unTouched() }); //reset touched back to falses
        }
    }

    render() {
        const { errors, messages } = validate(this.state.formData.someData, this.state.formData.someOtherData);
        const isDisabled = Object.keys(errors).some(x => errors[x]);  //errors is a Bool[]
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
                    {messages[name].map((e, i) => (
                        <p key={i}>{e}</p>
                    ))}
                </div>
            </label>);
     
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit} className="employee-editor">
                    {inputJsx("someDataLabel", "someData", 1)}
                    <div className="ui divider" />
                    {inputJsx("someOtherDataLabel", "someOtherData", 2)}
                    <div className="ui divider" />
                    <input disabled={isDisabled} type="submit" value="Save" className="ui primary button" />
                    
                </form>
                <button onClick={this.props.onDependents} className="ui button primary" style={{ width: '100%' }}>Dependents</button>
                <button onClick={this.props.onClose} className="ui button primary" style={{ width: '100%' }}>Close</button>
            </React.Fragment>
            
        );
    }
}

export default EmployeeEditor;
