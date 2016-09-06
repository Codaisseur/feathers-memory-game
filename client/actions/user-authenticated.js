export const USER_AUTHENTICATED = 'USER_AUTHENTICATED'

export default function authenticateUser() {
  return {
    type: USER_AUTHENTICATED,
  }
}
