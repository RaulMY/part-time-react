import React, { Component } from 'react';
import '../styles/myInput.css';

class MyInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            valid: (new RegExp(this.props.valid)).test(this.props.value)
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const regex = new RegExp(this.props.valid);
        const valid = regex.test(value);
        this.setState({value, valid}, () => {
            this.props.updateValue(name, value, valid);
        });
    }

    componentDidMount() {
        const regex = new RegExp(this.props.valid);
        const valid = regex.test(this.props.value);
        this.props.updateValue(this.props.name, this.props.value, valid);
    }

    render () {
        const inputClasses = this.state.valid ? 'valid-status my-input' : (this.state.value ? 'error-status my-input' : 'my-input');
        const labelClasses = this.state.valid ? 'label-valid my-label' : (this.state.value ? 'label-error my-label' : 'my-label');
        return (
            <div className="input-box mx-1">
                {this.props.type === 'textarea' ? 
                (<textarea className={inputClasses} value={this.state.value} type={this.props.type} name={this.props.name} onChange={this.onChange} />) 
                :
                (<input className={inputClasses} value={this.state.value} type={this.props.type} name={this.props.name} onChange={this.onChange} />)
                }
                <label className={labelClasses}>{this.props.name[0].toUpperCase() + this.props.name.slice(1)}</label>
                {this.state.value && !this.state.valid && (<p className="error-message">{this.props.errorMessage}</p>)}
            </div>
        )
    };
}
export default MyInput;
