import play from './src/games/grummel'

const GAMES_TO_SIMULATE = 10000
const results = []

for (let i=0; i<GAMES_TO_SIMULATE; i++) {
  const result = play()
  results.push(result)
}

const wins = results.filter((result) => result.win === true).length
const winRate = (wins / GAMES_TO_SIMULATE) * 100

console.log('Win Rate:', winRate + '%')