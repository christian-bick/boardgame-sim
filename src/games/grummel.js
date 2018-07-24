import random from "random-js";
import Vault from "../random/vault";
import {piesInOpenTokens} from "./grummel-helpers";

const PIES_TO_WIN = 3
const MAX_PIES_POSSIBLE = 3
const FIELDS = 4
const RESET_FIELD = 4
const BUMMER_TOKEN_KEY = '3'
const MAX_BUMMERS_BEFORE_LOOSING = 5

const InitialVault = {
  '0': 3,
  '1': 3,
  '2': 3,
  '3': 2
}

const pickField = (max) => {
  return random.integer(1, max)(random.engines.nativeMath)
}

const play = () => {

  let vault = new Vault(InitialVault);
  let totalBummers = 0
  let totalPies = 0

  while (totalPies < PIES_TO_WIN) {
    // Determine the amount of tokens to draw
    console.log('Next round begins')
    console.log('Bummers so far:', totalBummers)
    console.log('Finished pies so far:', totalPies)
    const field = pickField(FIELDS)
    if (field === RESET_FIELD && totalBummers > 0) {
      totalBummers--
      console.log('Decrement bummers:', totalBummers)
      continue;
    }
    // Draw n tokens
    console.log('We draw N tokens:', field)
    const drawnTokens = vault.draw(field)
    console.log('Tokens drawn:', drawnTokens)
    const openTokens = vault.calcDrawnTokens()
    // Determine the amount of drawn bummers
    const bummerCount = openTokens[BUMMER_TOKEN_KEY]
    if (bummerCount > 0) {
      // We drew a bummer
      console.log('Bummers drawn:', bummerCount)
      totalBummers += bummerCount
      console.log('We reset the vault')
      vault.reset()
    } else {
      // We didn't draw any bummers
      const finishedPies = piesInOpenTokens(openTokens, [BUMMER_TOKEN_KEY])
      if (finishedPies > 0) {
        console.log('We finished', finishedPies, 'pies')
        totalPies += finishedPies
        console.log('We reset the vault')
        vault.reset()
      }
    }
  }

  const win = totalBummers <= MAX_BUMMERS_BEFORE_LOOSING
  console.log('We', win ? 'won' : 'lost')

  return {
    win
  }
}

export default play