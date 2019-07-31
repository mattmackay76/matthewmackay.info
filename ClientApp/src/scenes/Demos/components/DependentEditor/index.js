import React, { Component } from 'react';

import "./style.css";

class DependentEditor extends Component {
    
    constructor(props) {

        super(props);
        this.state = {
            dependents: []
        };

        //handleSubmit is called by a control and despite being an => "this" is wrong
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

    //This is allegedly the patter for children to be aware of changing props
    //and take a copy to local state so that we don't modify the parent. Gets called
    //if the parent changes a property for example
    componentDidUpdate(prevProps) {
        if (this.props.dependents !== prevProps.dependents) {
            this.setState({ dependents: this.props.dependents });
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
