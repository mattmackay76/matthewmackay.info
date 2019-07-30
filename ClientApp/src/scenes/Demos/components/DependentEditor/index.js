import React, { Component } from 'react';

import "./style.css";

class DependentEditor extends Component {
    
    constructor(props) {

        super(props);
        this.state = {
            dependents: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        //TODO: add some fake dependents
        let dependents = this.state.dependents.concat(
            [
                { name: 'charly' },
                { name: 'frank' },

            ]);


        if (this.props.onSubmit)
            this.props.onSubmit(dependents);

    };

    componentDidUpdate(prevProps) {
        if (this.props.employee !== prevProps.employee) {
            //reset touched back to falses
            this.setState({ dependents: this.props.employee.dependents });
        }
    }

    render() {
        const isDisabled = false;
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit} className="dependent-editor">
                    this form should add some dependents for testing
                    <input disabled={isDisabled} type="submit" value="Save" className="ui primary button" />
                </form>
                <button onClick={this.props.onClose} className="ui button primary" style={{ width: '100%' }}>close</button>
            </React.Fragment>

        );
    }
}

export default DependentEditor;
