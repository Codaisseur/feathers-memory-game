export default function updateGames(state = [], { type, payload }) {
  switch (type) {
    case 'GAMES_FETCHED' :
      return payload

    case 'GAME_CREATED' :
      return state.concat([payload])

    case 'GAME_UPDATED' :
      const current = payload
      return state.map((game) => {
        return (game._id === current._id) ? current : game
      })

    case 'GAME_REMOVED' :
      const removed = payload
      return state.filter((game) => (game._id !== current._id))

    default :
      return state
  }
}
