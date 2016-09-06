import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import SignInOrUp from './containers/SignInOrUp'
import Loader from './components/Loader'

class App extends Component {
  render() {
    const { loading, authenticated, currentUser } = this.props

    return(
      <div>
        { loading ? <Loader/> : null }
        { authenticated ?
          <h1>Hi, { currentUser.name }!</h1> :
            <SignInOrUp/> }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    authenticated: state.authenticated,
    currentUser: state.currentUser,
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, {})(App);
