import React, { Component } from 'react';
import MyInput from './MyInput';

class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            description: this.props.description,
            editMode: false,
            error: null,
            canSubmit: false
        }

        this.status = {
            title: false,
            description: false
        }

        this.toggleEdit = this.toggleEdit.bind(this);
        this.onChangeEvent = this.onChangeEvent.bind(this);
        this.delete = this.delete.bind(this);
        this.submit = this.submit.bind(this);
    }

    toggleEdit() {
        this.setState({editMode: !this.state.editMode})
    }

    onChangeEvent(name, value, valid) {
        this.setState({[name]: value}, () => {
            Object.assign(this.status, {[name]: valid});
            let validValues = Object.values(this.status);
            const btnDisable = validValues.every(element => element);
            this.setState({canSubmit: btnDisable});
        });
    }

    submit() {
        this.props.update(this.state, this.props.id);
    }


    delete() {
        this.props.delete(this.props.id);
    }

    render () {
        return (
            <div className="flex-center flex-column my-1">
                <p>Task #{this.props.number}</p>
                <div className="my-1">
                    <MyInput 
                        value={this.state.title}
                        valid="^.{2,}$"
                        errorMessage="You need at least 2 characters"
                        type="text"
                        name="title"
                        updateValue={this.onChangeEvent}
                    />
                </div>
                <div className="mt-1 mb-3">
                    <MyInput 
                        value={this.state.description}
                        valid="^.{2,}$"
                        errorMessage="You need at least 2 characters"
                        type="textarea"
                        name="description"
                        updateValue={this.onChangeEvent}
                    />
                </div>
                <div>
                    <button className="submit-button mx-1"  disabled={!this.state.canSubmit} type="button" onClick={this.submit}>
                        Save
                    </button>
                    <button className="delete-button mx-1"  disabled={!this.state.canSubmit} type="button" onClick={this.delete}>
                        Delete
                    </button>
                </div>
            </div>
        )
    };
}
export default Task;
