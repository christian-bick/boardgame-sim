import {expect} from 'chai'
import Vault from "./vault";

describe('grummel-helpers', () => {

  describe('tokenArray', () => {

    it('should return empty array for an empty sack', () => {
      const vault = new Vault({
        '0': 0,
        '1': 0,
        '2': 0
      })

      const array = vault._tokenArray()
      expect(array).to.eql([])
    })

    it('should return an ordered array for a filled sack', () => {
      const vault = new Vault({
        '0': 1,
        '1': 2,
        '2': 3
      })

      const array = vault._tokenArray()
      expect(array).to.eql(['0', '1', '1', '2', '2', '2'])
    })
  })

  describe('calcDrawnTokens', () => {

    it('should calc open tokens for initial state', () => {
      const vault = new Vault({
        '0': 1,
        '1': 2
      })
      const openTokens = vault.calcDrawnTokens()
      expect(openTokens).to.eql({
        '0': 0,
        '1': 0
      })
    })

    it('should calc open tokens after one draw', () => {
      const vault = new Vault({
        '0': 1,
        '1': 2
      }, {
        '0': 1,
        '1': 1
      })
      const openTokens = vault.calcDrawnTokens()
      expect(openTokens).to.eql({
        '0': 0,
        '1': 1
      })
    })

    it('should calc open tokens after some draws', () => {
      const vault = new Vault({
        '0': 1,
        '1': 2
      }, {
        '0': 0,
        '1': 1
      })
      const openTokens = vault.calcDrawnTokens()
      expect(openTokens).to.eql({
        '0': 1,
        '1': 1
      })
    })

    it('should calc open tokens after all possible draws', () => {
      const vault = new Vault({
        '0': 1,
        '1': 2
      }, {
        '0': 0,
        '1': 0
      })
      const openTokens = vault.calcDrawnTokens()
      expect(openTokens).to.eql({
        '0': 1,
        '1': 2
      })
    })

  })

  describe('draw', () => {

    it('should only draw l tokens for n > l and l the array length', () => {
      const vault = new Vault({
        '0': 1
      })
      const drawnTokens = vault.draw(2);
      expect(drawnTokens).to.eql(['0'])
    })

    it('should draw no tokens for n=0', () => {
      const vault = new Vault({
        '0': 1,
        '1': 2,
      })
      const drawnTokens = vault.draw(0);
      expect(drawnTokens).to.eql([])
    })

    it('should draw all tokens from an array with n tokens', () => {
      const vault = new Vault({
        '0': 1,
        '1': 1,
      })
      const drawnTokens = vault.draw('2')
      expect(drawnTokens).to.eql(['0', '1'])
    })

    it('should draw n tokens for an array length > n', () => {
      const vault = new Vault({
        '1': 1,
        '3': 1,
        '4': 1,
      })
      const drawnTokens = vault.draw(2);
      const array = ['1', '3', '4']
      expect(drawnTokens).to.satisfy((tokens) => {
        return tokens.length === 2
          && tokens[0] !== tokens[1]
          && array.indexOf(tokens[0] !== -1)
          && array.indexOf(tokens[1] !== -1)
      })
    })

    it('should be consistent with calcDrawnTokens', () => {
      const initialTokenMap = {
        '0': 2,
        '1': 3,
        '2': 1,
      }
      const vault = new Vault(initialTokenMap)
      const drawnTokens = vault.draw(6);
      const calculatedDrawnTokens = vault.calcDrawnTokens()
      expect(calculatedDrawnTokens['0']).to.equal(2)
      expect(calculatedDrawnTokens['1']).to.equal(3)
      expect(calculatedDrawnTokens['2']).to.equal(1)
    })

  })

})