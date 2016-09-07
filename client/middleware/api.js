import io from 'socket.io-client';
import feathers from 'feathers-client';

class API {
  constructor() {
    // Establish a Socket.io connection
    const socket = io();
    // Initialize our Feathers client application through Socket.io
    // with hooks and authentication.
    this.app = feathers()
      .configure(feathers.socketio(socket))
      .configure(feathers.hooks())
      // Use localStorage to store our login token
      .configure(feathers.authentication({
        type: 'local',
        storage: window.localStorage,
      }));
  }

  service(serviceName) {
    return this.app.service(serviceName)
  }

  authThenFind(serviceName, callback) {
    this.app.authenticate().then(() => {
      this.app.service(serviceName).find({})
        .then(callback)
        .catch((error) => { console.log(error) })
    })
  }

  authThenCreate(serviceName, data, callback) {
    this.app.authenticate().then(() => {
      this.app.service(serviceName).create(data)
        .then(callback)
        .catch((error) => { console.log(error) })
    })
  }

  authenticate(user) {
    const { email, password } = user
    return this.app.authenticate(
      Object.assign({}, { type: 'local' }, {
      email,
      password,
    }))
  }

  signOut() {
    return this.app.logout()
  }
}

const Api = new API()

export default Api
