import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import SignUp from './containers/SignUp'
import Loader from './components/Loader'

class App extends Component {
  render() {
    const { loading, authenticated } = this.props

    return(
      <div>
        { loading ? <Loader/> : null }
        { authenticated ? <h1>Authenticated</h1> : <SignUp/> }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    authenticated: state.authenticated,
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, {})(App);
