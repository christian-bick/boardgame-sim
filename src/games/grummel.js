import random from "random-js";
import Vault from "../random/vault";
import {piesInOpenTokens} from "./grummel-helpers";

const PIES_TO_WIN = 3
const MAX_PIES_POSSIBLE = 3
const MAX_DRAWS = 3
const BUMMER_TOKEN_KEY = '3'

const InitialVault = {
  '0': 3,
  '1': 3,
  '2': 3,
  '3': 2
}

const pickNDraws = (max) => {
  return random.integer(1, max)(random.engines.nativeMath)
}

const play = () => {

  let vault = new Vault(InitialVault);
  let totalBummers = 0
  let totalPies = 0

  while (totalPies < PIES_TO_WIN) {
    // Determine the amount of tokens to draw
    console.log('Another round begins')
    console.log('Bummers so far:', totalBummers)
    console.log('Finished pies so far:', totalPies)
    const nDraws = pickNDraws(MAX_DRAWS)
    // Draw n tokens
    console.log('Draw N tokens:', nDraws)
    const drawnTokens = vault.draw(nDraws)
    console.log('Tokens drawn:', drawnTokens)
    const openTokens = vault.calcDrawnTokens()
    // Determine the amount of drawn bummers
    const bummerCount = openTokens[BUMMER_TOKEN_KEY]
    console.log('Bummers drawn:', bummerCount)
    if (bummerCount > 0) {
      // We drew a bummer
      totalBummers += bummerCount
      vault.reset()
    } else {
      // We didn't draw any bummers
      const finishedPies = piesInOpenTokens(openTokens, [BUMMER_TOKEN_KEY])
      if (finishedPies > 0) {
        // We finished a pie
        totalPies += finishedPies
        vault.reset()
      }
    }
  }

  console.log("Game result: ", totalBummers)
  return totalBummers
}

export default play