import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';  
import { Segment, Sidebar } from 'semantic-ui-react'
import { Image, List, Header, Table, Rating } from 'semantic-ui-react'


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
            companyList: {
                '1': { name: 'company one', someText: 'some text one' },
                '2': { name: 'company two', someText: 'some text two' },
                '3': { name: 'company three', someText: 'some text three' },
                '4': { name: 'company four', someText: 'some text four' },
                '5': { name: 'company five', someText: 'some text five' },
                '6': { name: 'company six', someText: 'some text six' },
                '8': { name: 'company seven', someText: 'some text seven' },
                '9': { name: 'company eight', someText: 'some text eight' },
                '10': { name: 'company nine', someText: 'some text nine' },
                '11': { name: 'company ten', someText: 'some text ten' },
                '12': { name: 'company eleven', someText: 'some text eleven' },
                '13': { name: 'company twelve', someText: 'some text twelve' },

    },
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

        const TableExamplePadded = () => (
            <Table celled padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell singleLine>Evidence Rating</Table.HeaderCell>
                        <Table.HeaderCell>Effect</Table.HeaderCell>
                        <Table.HeaderCell>Efficacy</Table.HeaderCell>
                        <Table.HeaderCell>Consensus</Table.HeaderCell>
                        <Table.HeaderCell>Comments</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <Header as='h2' textAlign='center'>
                                A
                             </Header>
                        </Table.Cell>
                        <Table.Cell singleLine>Power Output</Table.Cell>
                        <Table.Cell>
                            <Rating icon='star' defaultRating={3} maxRating={3} />
                        </Table.Cell>
                        <Table.Cell textAlign='right'>
                            80% <br />
                            <a>18 studies</a>
                        </Table.Cell>
                        <Table.Cell>
                            Creatine supplementation is the reference compound for increasing muscular creatine
                            levels; there is variability in this increase, however, with some nonresponders.
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        );

        return (
            <article id="demos" className="content">

                <Sidebar.Pushable as={Segment}>
                <div id='someTest'>
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

                    <h4>Select or add a new employee</h4>

                    <List selection divided verticalAlign='middle' style={{overflow: 'auto', maxHeight: '400px'}} >
                        {Object.keys(this.state.companyList).map((id, idx) => (
                            <List.Item key={id}>
                                <Image avatar src={`https://robohash.org/${id}.png?size=50x50`} />
                                <List.Content>
                                    <List.Header>{this.state.companyList[id].name}</List.Header>
                                    <List.Description>
                                        <List.Header>{this.state.companyList[id].someText}</List.Header>
                                    </List.Description>
                                </List.Content>
                                <List.Content floated='right'>
                                    <i onClick={this.toggleSidebar} className="icon pencil alternate" />
                                </List.Content>
                                
                                
                            </List.Item>
                        ))}
                    </List>
                    
                    {TableExamplePadded()}
                    <button onClick={this.toggleSidebar}>Sidebar</button>
                    <button onClick={this.toggleSidebarTwo}>Sidebar2</button>
                </div>
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