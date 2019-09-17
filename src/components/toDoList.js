import React, { Component, Fragment } from 'react';
import UserForm from './UserForm';
import TasksDashboard from './TaskDashboard';
import { routes } from '../utils';

class ToDoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            logged: false, 
            new: true
        }

        this.updateUser = this.updateUser.bind(this);
        this.changeForm = this.changeForm.bind(this);
        this.logout = this.logout.bind(this);
    }

    updateUser(user, userId) {
        this.setState({user, logged: true, hamburger: false, userId});
    }

    checkIfLogged() {
        fetch(routes.isLoggedIn.endpoint, {
            method: routes.requestType,
            credentials: 'include',
        })
        .then(response => {
            return response.ok && response.json();
        })
        .then(responseJson => {
            if (responseJson.username) {
                this.updateUser(responseJson.username, responseJson._id)
            }
        })
    }

    logout() {
        fetch(routes.logout.endpoint, {
            credentials: 'include',
            method: routes.logout.requestType
        })
        .then(response => {
            this.setState({user: null, logged: false});
        })
    }

    changeForm() {
        this.setState({new: !this.state.new})
    }


    componentDidMount() {
        if (!this.state.logged) {
            this.checkIfLogged();
        }
    }

    render () {
        return (
            <Fragment>
                <nav className="flex-center mobile-between mb-3">
                <h1 className="title">Tudu</h1>
                    {
                        this.state.logged ?
                        (
                            <div className="flex-center">
                                <p className="mx-1">Welcome back, {this.state.user}!</p>
                                <p className="pointer" onClick={this.logout}>Logout</p>
                            </div>
                        )
                        :
                        (   
                            <Fragment>
                                <div className="flex-center desktop-only">
                                    <p><strong>{this.state.new ? 'Sign Up' : 'Log In'}</strong></p>
                                    <UserForm route={this.state.new ? routes.signUp : routes.logIn} updateUser={this.updateUser} />
                                    <p className="pointer" onClick={this.changeForm}>{this.state.new ? 'Not new? Log in!' : 'You new? Sign Up!'}</p>
                                </div>
                                <img onClick={() => this.setState({hamburger:true})} className="hamburger pointer mobile-only" src="/hamburger.png" alt="hamburger" />
                                <div className={this.state.hamburger ? "flex-center flex-column side-menu side-menu-active" : "flex-center flex-column side-menu"}>
                                    <p>{this.state.new ? 'Sign Up' : 'Log In'}</p>
                                    <UserForm column={true} route={this.state.new ? routes.signUp : routes.logIn} updateUser={this.updateUser} />
                                    <p className="pointer" onClick={this.changeForm}>{this.state.new ? 'Not new? Log in!' : 'You new? Sign Up!'}</p>
                                </div>
                            </Fragment>
                        )
                    }
                </nav>
                <div>
                    {
                        this.state.logged ?
                        (<TasksDashboard userId={this.state.userId}/>)
                        :
                        (<div className="flex-center">
                            <h2 className="hero-title">Never forget a single thing, use Tudu to keep track of the things you need to do</h2>
                            <img className="todo-image"src="/todo-list.png" alt="todo-list" />
                        </div>)
                    }
                </div>
            </Fragment>
        )
    };
}
export default ToDoList;
