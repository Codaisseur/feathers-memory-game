import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import headerStyle from '../styles/headers';

class SignUp extends Component {
  registerUser() {
    const { name, email, password } = this.refs;
    console.log('Registering user with: ',
      name.getValue(),
      email.getValue(),
      password.getValue());
  }

  render() {
    return(
      <div>
        <h2 style={headerStyle}>Sign Up</h2>
        <div>
          <TextField ref="name" hintText="Your name"/>
        </div>
        <div>
          <TextField type="email" ref="email" hintText="Your email"/>
        </div>
        <div>
          <TextField type="password" ref="password" hintText="Your password"/>
        </div>
        <div>
          <TextField type="password" ref="passwordConfirmation" hintText="Repeat your password"/>
        </div>
        <div>
          <RaisedButton onClick={this.registerUser.bind(this)} label="Sign up" primary={true} />
        </div>
      </div>
    );
  }
}

export default SignUp;
