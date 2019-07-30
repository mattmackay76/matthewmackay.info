import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';  
import { Segment, Sidebar } from 'semantic-ui-react'
import { Image, List } from 'semantic-ui-react'

import "./style.css";
import { getTests, postTest } from './services/test/actions';
import EmployeeEditor from './components/EmployeeEditor';
import DependentEditor from './components/DependentEditor';
import EmployeeStatistics from './components/EmployeeStatistics';

class Demos extends Component {

    constructor(props) {
    
        super(props);
        //NOTE: If you do not initialize these form elements you'll get a warning
        //because the component doesn't have an initial value, react will think it's uncontrollered
        this.state = {
            editEmployeeBarVisible: false,
            editEmployeeDependentsBarVisible: false,
            currentEmployee: {},
            employeeList: {}
        };
        
        this.handleDependentsSave = this.handleDependentsSave.bind(this);
    }

    handleEmployeeSave = (employee) => {
        this.props.postTest(employee, employee.id);
        this.toggleEmployeeBar();
    };

    handleDependentsSave = (dependents) => {
        this.setState(prevState => {
            let currentEmployee = { ...prevState.currentEmployee };
            currentEmployee.dependents = dependents;
            return { currentEmployee };
        });
    };

    handleAddEmployee = () => {
        this.setState({ //TODO: build a new employee function that sets everything to empty
            currentEmployee:
            {
                someData: '',
                someOtherData: '',
                dependents: []
            }
        }); 
        this.toggleEmployeeBar();
    };

    handleEditEmployee = (id) => {
        this.setState({ currentEmployee: this.props.employeeList[id] }); //blank employee
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

    componentDidMount() {
        //only call if we're logged in since on logout, this control sometimes gets one last render
        if (this.props.isLoggedIn) 
            this.props.getTests();
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
                            onHide={this.handleSidebarHide}
                            direction='top'
                            visible={this.state.editEmployeeBarVisible}
                            style={{ backgroundColor: 'white' }}
                            className="demoDropdown">

                            <EmployeeEditor
                                employee={this.state.currentEmployee}
                                onSubmit={this.handleEmployeeSave}
                                onClose={this.toggleEmployeeBar}
                                onDependents={this.toggleDependentBar} />

                        </Sidebar>

                        <Sidebar
                            animation='push'
                            icon='labeled'
                            onHide={this.handleSidebarHide}
                            direction='top'
                            visible={this.state.editEmployeeDependentsBarVisible}
                            style={{ backgroundColor: 'white' }}
                            className="demoDropdown">

                                <DependentEditor
                                    employee={this.state.currentEmployee}
                                    onSubmit={this.handleDependentsSave}
                                    onClose={this.toggleDependentBar} />

                        </Sidebar>
                    <div>
                            <h4 style={{ display: 'inline-block' }}>Select or add a new employee</h4>
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
                                    <List.Header>{this.props.employeeList[id].id}</List.Header>
                                    <List.Description>
                                        <List.Header>{this.props.employeeList[id].someData}</List.Header>
                                        <List.Header>{this.props.employeeList[id].someOtherData}</List.Header>
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
        isLoaded: state.testReducer !== null,
        auth: state.auth,
        test: state.testReducer,
        employeeList: state.testReducer ? convertToObject(state.testReducer.tests) || {} : {} 
    };
};

const convertToObject = (tests) => {
    //comma operator (x,y) evaluates x and then returns y 
    let result = tests.reduce( (acc, cur) => (acc[cur.id] = cur, acc), {});
    return result;
};

//withRouter so that we have access to this.pops.history
export default withRouter(connect(mapStateToProps, { getTests, postTest })(Demos)); 