export const REGISTER_USER = 'REGISTER_USER'

export default function registerUser(user) {
  return {
    type: REGISTER_USER,
    payload: user
  }
}
