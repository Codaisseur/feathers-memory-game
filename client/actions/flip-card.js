export const FLIP_CARD = 'FLIP_CARD'

export default function flipCard(index) {
  return { type: FLIP_CARD, payload: index }
}
