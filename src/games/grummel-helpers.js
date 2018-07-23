const piesInOpenTokens = (openTokens, excludedKeys) => {
  let minTokenCount = Number.MAX_SAFE_INTEGER
  for (const tokenKey of Object.keys(openTokens)) {
    if (! excludedKeys.includes(tokenKey)) {
      minTokenCount = Math.min(openTokens[tokenKey], minTokenCount)
    }
  }
  return minTokenCount
}

export {
  piesInOpenTokens
}