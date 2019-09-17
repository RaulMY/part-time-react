import React, { Component } from 'react';
import { routes } from '../utils';
import Task from './Task';
import MyInput from './MyInput';

class TaskDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            error: false,
            newTitle: '',
            newDescription: '',
            canSubmit: false
        }

        this.status = {
            newTitle: false,
            newDescription: false
        }

        this.getTasks = this.getTasks.bind(this);
        this.createTask = this.createTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.onChangeEvent = this.onChangeEvent.bind(this);
    }

    onChangeEvent(name, value, valid) {
        this.setState({[name]: value}, () => {
            Object.assign(this.status, {[name]: valid});
            let validValues = Object.values(this.status);
            const btnDisable = validValues.every(element => element);
            this.setState({canSubmit: btnDisable});
        });
    }

    getTasks() {
        fetch(routes.getTasks.endpoint, {
            credentials: 'include',
            method: routes.getTasks.requestType,
        })
        .then(response => {
            return response.ok && response.json();
        })
        .then(tasks => {
            tasks = tasks.filter(task => task.owner === this.props.userId)
            this.setState({tasks});
        })
        .catch(error => {
            console.log(error);
            this.setState({error: true});
        })
    }

    createTask() {
        fetch(routes.newTask.endpoint, {
            credentials: 'include',
            method: routes.newTask.requestType,
            body: JSON.stringify({title: this.state.newTitle, description: this.state.newDescription}),
            headers: {"Content-Type": "application/json"}
        })
        .then(response => {
            return response.ok && response.json();
        })
        .then(responseJson => {
            this.getTasks();
        })
        .catch(error => {
            console.log(error);
            this.setState({error: true});
        })
    }

    deleteTask(id) {
        fetch(routes.deleteTask.endpoint + id, {
            credentials: 'include',
            method: routes.newTask.requestType,
        })
        .then(response => {
            return response.ok && response.json();
        })
        .then(responseJson => {
            this.getTasks();
        })
        .catch(error => {
            console.log(error);
            this.setState({error: true});
        })
    }

    updateTask(task, id) {
        fetch(routes.updateTask.endpoint + id, {
            credentials: 'include',
            method: routes.newTask.requestType,
            body: JSON.stringify({title: task.title, description: task.description}),
            headers: {"Content-Type": "application/json"}
        })
        .then(response => {
            return response.ok && response.json();
        })
        .then(responseJson => {
            this.getTasks();
        })
        .catch(error => {
            console.log(error);
            this.setState({error: true});
        })
    }

    componentDidMount() {
        this.getTasks();
    }

    render () {
        return (
            <div>
                {this.state.error && (<p className="error-text">Oops, looks like we there's a problem, try refreshing the page</p>)}
                <p><strong>What do you need to do?</strong></p>
                <div className="flex-center flex-column">
                    <div className="my-1">
                        <MyInput 
                            value={this.state.newTitle}
                            valid="^.{2,}$"
                            errorMessage="You need at least 2 characters"
                            type="text"
                            name="newTitle"
                            updateValue={this.onChangeEvent}
                        />
                    </div>
                    <div className="mt-1 mb-3">
                        <MyInput 
                            value={this.state.newDescription}
                            valid="^.{2,}$"
                            errorMessage="You need at least 2 characters"
                            type="textarea"
                            name="newDescription"
                            updateValue={this.onChangeEvent}
                        />
                    </div>
                    <button className="submit-button" disabled={!this.state.canSubmit} type="button" onClick={this.createTask}>Create task</button>
                </div>
            <p>Tasks: {this.state.tasks.length}</p>
            <div className="flex-center">
            {
                this.state.tasks.map((task, i) => {
                    return (
                        <Task number={i + 1} key={task._id} title={task.title} description={task.description} id={task._id} delete={this.deleteTask} update={this.updateTask}/>
                    )
                })
            }
            </div>
            </div>
        )
    };
}
export default TaskDashboard;
