import random from "random-js";

class Vault {

  constructor (initialTokenMap = {}, tokenMap = null, engine = random.engines.nativeMath) {
    this.initialTokenMap = Object.assign({}, initialTokenMap)
    this.tokenMap = Object.assign({}, tokenMap || initialTokenMap)
    this.engine = engine
  }

  _tokenArray () {
    return Object.keys(this.tokenMap).sort().reduce((result, key) => {
      const tokenCount = this.tokenMap[key]
      for (let i=0; i < tokenCount; ++i) {
        result.push(key)
      }
      return result
    }, [])
  }

  _removeToken (tokenKey) {
    const tokenCount = this.tokenMap[tokenKey]
    if (tokenCount) {
      this.tokenMap[tokenKey] = tokenCount - 1
    } else {
      throw Error('Inconsistent state detected: Trying to remove a token that is not present')
    }
  }

  reset() {
    this.tokenMap = Object.assign({}, this.initialTokenMap)
  }

  draw(nDraws = 1) {
    const drawnTokens = []
    for (let i = 0; i < nDraws; i++) {
      const vaultTokenArray = this._tokenArray()
      if (vaultTokenArray.length === 0) {
        break;
      }
      const drawnToken = random.pick(this.engine, vaultTokenArray)
      drawnTokens.push(drawnToken)
      this._removeToken(drawnToken)
    }
    return drawnTokens.sort()
  }

  calcDrawnTokens() {
    return Object.keys(this.tokenMap).reduce((result, key) => {
      result[key] = this.initialTokenMap[key] - this.tokenMap[key]
      return result
    }, {})
  }
}

export default Vault