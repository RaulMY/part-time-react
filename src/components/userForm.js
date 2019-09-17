import React, { Component } from 'react';
import MyInput from './MyInput';

class UserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            canSubmit: false,
            error: this.props.error
        }

        this.status = {
            username: false,
            password: false
        }

        this.onChangeEvent = this.onChangeEvent.bind(this);

        this.submit = this.submit.bind(this);

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
        this.setState({error: false}, () => {
            fetch(this.props.route.endpoint, {
                method: this.props.route.requestType,
                credentials: 'include',
                body: JSON.stringify({username: this.state.username, password: this.state.password}),
                headers: {"Content-Type": "application/json"}
            })
            .then(response => {
                return response.ok && response.json();
            })
            .then(responseJson => {
                if (responseJson.message) {
                    this.setState({error: responseJson.message})
                } else {
                    this.props.updateUser(responseJson.username, responseJson._id)
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({error: 'Oops, looks like something went wrong. Try again later'})
            })
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.route !== this.props.route) {
            this.setState({error: false});
          }
    }

    render () {
        return <form className={this.props.column ? "flex-center mx-1 flex-column" : "flex-center mx-1" }>
                {this.state.error && (
                    <p className="error-text">{this.state.error}</p>
                )}
                <div className={this.props.column && "my-1"}>
                    <MyInput 
                        value={this.state.username}
                        valid="^.{2,}$"
                        errorMessage="You need at least 2 characters"
                        type="text"
                        name="username"
                        updateValue={this.onChangeEvent}
                    />
                </div>
                <div className={this.props.column && "mt-1 mb-3"}>
                    <MyInput
                        value={this.state.password}
                        valid="^.{7,}$"
                        errorMessage="You need at least 7 characters"
                        type="password"
                        name="password"
                        updateValue={this.onChangeEvent}
                    />
                </div>
                <button className="submit-button" disabled={!this.state.canSubmit} type="button" onClick={this.submit}>
                    Submit
                </button>
            </form>
    };
}
export default UserForm;
