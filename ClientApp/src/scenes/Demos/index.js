import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';  
import { Segment, Sidebar } from 'semantic-ui-react'
import { Image, List } from 'semantic-ui-react'
import { toast } from 'react-toastify';

import { PAYROLL_API_ERROR } from './services/flags/constants';
import { getEmployees, postEmployee } from './services/employee/actions';
import { setFlag } from '../../services/flags/actions';
import EmployeeEditor from './components/EmployeeEditor';
import DependentEditor from './components/DependentEditor';
import EmployeeStatistics from './components/EmployeeStatistics';


import "./style.css";

class Demos extends Component {

    constructor(props) {
    
        super(props);
        //NOTE: If you do not initialize these form elements you'll get a warning
        //because the component doesn't have an initial value, react will think it's uncontrollered
        this.state = {
            editEmployeeBarVisible: false,
            editEmployeeDependentsBarVisible: false,
            currentEmployee: {},
            currentDependents: {},
            currentDependent: {},
        };

        //since these are called by children and we need the correct *this*
        this.handleDependentsSave = this.handleDependentsSave.bind(this);
        this.handleEditDependents = this.handleEditDependents.bind(this);
        this.handleEmployeeSave = this.handleEmployeeSave.bind(this);
        this.toggleEmployeeBar = this.toggleEmployeeBar.bind(this);
        this.toggleDependentBar = this.toggleDependentBar.bind(this);
        this.handleEmployeeClose = this.handleEmployeeClose.bind(this);
    }

    emptyDependent = (id) => ({
        id: id,
        name: '',
        dependentType: 'spouse',
    });

    emptyEmployee = () => ({
        name: '',
        annualPayPeriods: 26,
        salaryPerPeriod: 2000,
        annualBenefitExpense: 1000,
        annualDependentBenefitExpense: 500,
        dependents: []
    });

    handleEmployeeSave = (employee) => {
        //recombine the employee with edited dependents
        employee.dependents = Object.keys(this.state.currentDependents)
            .map((id) => {
                let dep = this.state.currentDependents[id];
                if (id.substring(0, 2) === "0.")
                    dep.id = undefined;
                return dep;
            });
        this.props.postEmployee(employee, employee.id);
        this.handleEmployeeClose();
    };

    handleEmployeeClose = () => {
        this.setState({
            editEmployeeBarVisible: false,
            editEmployeeDependentsBarVisible: false,
        });
    }

    handleDependentsSave = (dependents) => {
        this.setState(
            {
                currentDependents: dependents,
            });
        this.toggleDependentBar();
    };

    handleAddDependents = () => {
        
        this.setState({
            currentDependent: this.emptyDependent(Math.random().toString()),
        });
        this.toggleDependentBar();
    };

    handleEditDependents = (dependent) => {
        let currentDependents = { ...this.state.currentDependents, [dependent.id]: dependent };

        this.setState({
            currentDependent: dependent,
            currentDependents
        });
        this.toggleDependentBar();
    }

    handleAddEmployee = () => {
        this.setState({
            currentEmployee: this.emptyEmployee(),
            currentDependents: {},
            currentDependent: this.emptyDependent(),
        }); 
        this.toggleEmployeeBar();
    };

    handleEditEmployee = (id) => {
        this.setState(
            {
                currentEmployee: this.props.employeeList[id],
                currentDependents: convertToObjectMap(this.props.employeeList[id].dependents),
            }); 
        this.toggleEmployeeBar();
    };

    toggleEmployeeBar = (e) => {
        this.setState({
            editEmployeeBarVisible: !this.state.editEmployeeBarVisible
        });
    }

    toggleDependentBar = () =>
        this.setState({
            editEmployeeDependentsBarVisible: !this.state.editEmployeeDependentsBarVisible
        });

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.flags && nextProps.flags[PAYROLL_API_ERROR]) {
            toast.error(nextProps.flags[PAYROLL_API_ERROR]);
            this.props.setFlag({ [PAYROLL_API_ERROR]: undefined });
            return false; //no need to update/re-render this component in this case
        }
        return true;
    }

    componentDidMount() {
        //only call if we're logged in since on logout, this control sometimes gets one last render
        if (this.props.isLoggedIn) 
            this.props.getEmployees();
    }

    render() {
        //Required logged in
        if (!this.props.isLoggedIn) {
            this.props.history.push('/'); //redirects us back to the root since user is not logged in
            return null; //do not render anything
        }

        return (
            <article id="demos" className="content">
                <Sidebar.Pushable as={Segment}>
                    <div className='demoWrapper'>
                        <Sidebar
                            animation='push'
                            icon='labeled'
                            direction='top'
                            visible={this.state.editEmployeeBarVisible}
                            className="demoDropdown">

                            <EmployeeEditor
                                employee={this.state.currentEmployee}
                                dependents={this.state.currentDependents}
                                onSubmit={this.handleEmployeeSave}
                                onClose={this.handleEmployeeClose}
                                onAddDependents={this.handleAddDependents} 
                                onEditDependent={this.handleEditDependents} />

                        </Sidebar>

                        <Sidebar
                            animation='push'
                            icon='labeled'
                            direction='top'
                            visible={this.state.editEmployeeDependentsBarVisible}
                            className="demoDropdown">

                                <DependentEditor
                                    dependents={this.state.currentDependents}
                                    dependent={this.state.currentDependent}
                                    onSubmit={this.handleDependentsSave}
                                    onClose={this.toggleDependentBar} />

                        </Sidebar>
                    <div>
                            <h4 style={{display: 'inline'}}>Select or add a new employee</h4>
                            <button onClick={this.handleAddEmployee} className="ui button primary" style={
                                {
                                    float: 'right',
                                    position: 'relative',
                                    display: 'table',
                                    padding: '10px',
                                }}>
                                <i className="ui icon plus square outline" style={{display: 'table-cell'}} />
                            </button>
                    </div>
                    
                    <List selection divided verticalAlign='middle' style={{overflow: 'auto', maxHeight: '350px', marginTop: '20px'}} >
                        {Object.keys(this.props.employeeList).map((id, idx) => (
                            <List.Item key={id}>
                                <Image avatar src={`https://robohash.org/${id}.png?size=50x50`} />
                                <List.Content>
                                    <List.Header>{this.props.employeeList[id].name}</List.Header>
                                    <List.Description>
                                        <List.Header>Annual Pay Periods: {this.props.employeeList[id].annualPayPeriods}</List.Header>
                                        <List.Header>Expense: {this.props.employeeList[id].annualBenefitExpense}</List.Header>
                                    </List.Description>
                                </List.Content>
                                <List.Content floated='right'>
                                    <i onClick={() => this.handleEditEmployee(id)} className="icon pencil alternate" />
                                </List.Content>
                            </List.Item>
                        ))}
                    </List>
                    
                    <EmployeeStatistics />
                </div>
                </Sidebar.Pushable>
            </article>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        auth: state.auth,
        test: state.testReducer,
        employee: state.employeeReducer.employee,
        employeeList: state.employeeReducer.employeeList ? convertToObjectMap(state.employeeReducer.employeeList) || {} : {},
        flags: state.flags,
    };
};

//comma operator (x,y) evaluates x and then returns y, reduce converts from array to hash/object by id 
const convertToObjectMap = (objectWithId) =>
    objectWithId.reduce((acc, cur) => (acc[cur.id] = cur, acc), {});

//withRouter so that we have access to this.pops.history
export default withRouter(connect(mapStateToProps, { getEmployees, postEmployee, setFlag })(Demos)); 