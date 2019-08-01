import React, { Component } from 'react';
import { Image, List } from 'semantic-ui-react'

import "./style.css";

function validate(formData) {
    let validation = {
        errors: {
            name: false,
            annualPayPeriods: false,
            salaryPerPeriod: false,
            annualBenefitExpense: false,
            annualDependentBenefitExpense: false,
        },
        messages: {
            name: [],
            annualPayPeriods: [],
            salaryPerPeriod: [],
            annualBenefitExpense: [],
            annualDependentBenefitExpense: [],
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
    if (formData.annualPayPeriods < 0) { 
        validation.errors.annualPayPeriods = true;
        validation.messages.annualPayPeriods = validation.messages.annualPayPeriods
            .concat('Annual pay periods cannot be negative.');
    }
    if (formData.salaryPerPeriod < 0) { 
        validation.errors.salaryPerPeriod = true;
        validation.messages.salaryPerPeriod = validation.messages.salaryPerPeriod
            .concat('Salary per period cannot be negative.');
    }
    if (formData.annualBenefitExpense < 0) {
        validation.errors.annualBenefitExpense= true;
        validation.messages.annualBenefitExpense = validation.messages.annualBenefitExpense
            .concat('Annual benefit expense cannot be negative.');
    }
    if (formData.annualDependentBenefitExpense < 0) {
        validation.errors.annualDependentBenefitExpense = true;
        validation.messages.annualDependentBenefitExpense = validation.messages.annualDependentBenefitExpense
            .concat('Annual dependent benefit expense cannot be negative.');
    }

    return validation;
}

class EmployeeEditor extends Component {

    constructor(props) {

        super(props);
        //NOTE: If you do not initialize these form elements you'll get a warning
        //because the component doesn't have an initial value, react will think it's uncontrollered
        this.state = {
            formData: this.newForm(), 
            touched: this.unTouched(),
            dependents: {}
        };
    }

    unTouched = () => {
        return {
            name: false,
            annualPayPeriods: false,
            salaryPerPeriod: false,
            annualBenefitExpense: false,
            annualDependentBenefitExpense: false,
        }
    };
    //TODO: Put these defaults into configuration
    newForm = () => ({
        name: '',
        annualPayPeriods: 26,
        salaryPerPeriod: 2000,
        annualBenefitExpense: 1000,
        annualDependentBenefitExpense: 500,
    });

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
        const validation = validate(this.state.formData);
        const isDisabled = Object.keys(validation.errors).some(x => validation.errors[x]);
        return !isDisabled;
    }

    componentDidUpdate(prevProps) {
        if (this.props.employee !== prevProps.employee) {
            this.setState(
                {
                    formData: this.props.employee,
                    touched: this.unTouched(), //reset touched back to falses
                }); 
        }
        if (this.props.dependents !== prevProps.dependents) {
            this.setState({
                dependents: this.props.dependents
            });
        }
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
                <form onSubmit={(e) => e.preventDefault()} className="employee-editor">
                    <div className="formWrapper" >
                        <section>
                            {/*Clean up this key/1,2,3 etc */}
                            {inputJsx("Name", "name", 1)}
                            {inputJsx("Salary per period", "salaryPerPeriod", 3)}
                        </section>

                        <section>
                            {inputJsx("Annual pay periods", "annualPayPeriods", 2)}
                            {inputJsx("Annual benefit expense", "annualBenefitExpense", 4)}
                            {inputJsx("Annual dependent expense", "annualDependentBenefitExpense", 5)}
                        </section>

                        <section>
                            <div>
                                <button onClick={this.props.onAddDependents} className="ui button primary mini" style={
                                   {
                                        float: 'right',
                                        position: 'relative',
                                        display: 'table',
                                        padding: '10px',
                                   }}>
                                    <i className="ui icon plus square outline" style={{ display: 'table-cell' }} />
                                </button>
                                <span style={
                                    {
                                        float: 'right',
                                        position: 'relative',
                                        display: 'table',
                                        padding: '10px',
                                        textAlign: 'left',
                                    }}>Dependents</span>
                            </div>
                            <List selection divided verticalAlign='middle' style={{ overflow: 'auto', maxHeight: '200px', marginTop: '20px' }} >
                                {Object.keys(this.state.dependents).map((id, idx) => (
                                    <List.Item key={id}>
                                        <Image avatar />
                                        <List.Content>
                                        <List.Header>{this.state.dependents[id].name}</List.Header>
                                            <List.Description>
                                                <List.Header>Annual Pay Periods: </List.Header>
                                                <List.Header>Expense: </List.Header>
                                            </List.Description>
                                        </List.Content>
                                        <List.Content floated='right'>
                                            <i onClick={() => this.props.onEditDependent(this.state.dependents[id])} className="icon pencil alternate" />
                                        </List.Content>
                                    </List.Item>
                                ))}
                            </List>
                        </section>
                    </div>
                </form>
                
                <button disabled={isDisabled} onClick={this.handleSubmit} className="ui button primary mini" >Save</button>
                <button onClick={this.props.onClose} className="ui button primary mini" >Cancel</button>
                <button className="ui negative button mini" style={{ float: 'right' }}>Delete</button>
                
                
                
            </React.Fragment>
            
        );
    }
}

export default EmployeeEditor;
