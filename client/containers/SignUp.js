import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import headerStyle from '../styles/headers';
import registerUser from '../actions/register-user';
import setFormErrors from '../actions/set-form-errors';
import resetFormErrors from '../actions/reset-form-errors';

const errorMargin = {
  marginTop: '2rem'
}

class SignUp extends Component {
  registerUser() {
    this.props.resetFormErrors()

    const { name, email, password, passwordConfirmation } = this.refs;

    if (password.getValue() === passwordConfirmation.getValue()) {
      return this.props.registerUser({
        name: name.getValue(),
        email: email.getValue(),
        password: password.getValue(),
      })
    }

    this.props.setFormErrors({
      passwordConfirmation: 'The passwords do not match!',
    })
  }

  render() {
    const {formErrors} = this.props

    return(
      <div>
        <h2 style={headerStyle}>Sign Up</h2>
        <div>
          <TextField ref="name" hintText="Your name"/>
        </div>
        <div>
          <TextField
            type="email"
            ref="email"
            hintText="Your email"
            errorText={ formErrors.email }/>
        </div>
        <div>
          <TextField type="password" ref="password" hintText="Your password"/>
        </div>
        <div>
          <TextField
            type="password"
            ref="passwordConfirmation"
            hintText="Repeat your password"
            errorText={ formErrors.passwordConfirmation }/>
        </div>
        <div style={ errorMargin }>
          <RaisedButton onClick={this.registerUser.bind(this)} label="Sign up" primary={true} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    formErrors: state.formErrors,
  }
}

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  setFormErrors: PropTypes.func.isRequired,
  resetFormErrors: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  formErrors: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { registerUser, setFormErrors, resetFormErrors })(SignUp)
