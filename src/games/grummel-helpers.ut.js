import {expect} from 'chai'
import {piesInOpenTokens} from "./grummel-helpers";

describe('grummel-helpers', () => {

  describe.only('piesInOpenTokens', () => {

    it('should return 0 all tokens occur 0 times', () => {
      const result = piesInOpenTokens({
        '1': 0,
        '2': 0,
        '3': 0,
      }, [])
      expect(result).to.equal(0)
    })

    it('should return 1 when all tokens occur 1 time', () => {
      const result = piesInOpenTokens({
        '1': 1,
        '2': 1,
        '3': 1,
      }, [])
      expect(result).to.equal(1)
    })

    it('should return 0 when one token occurs 0 times', () => {
      const result = piesInOpenTokens({
        '1': 1,
        '2': 1,
        '3': 0,
      }, [])
      expect(result).to.equal(0)
    })

    it('should return 2 when all tokens occur at least 2 times', () => {
      const result = piesInOpenTokens({
        '1': 2,
        '2': 2,
        '3': 3,
      }, [])
      expect(result).to.equal(2)
    })

    it('should respect excluded tokens', () => {
      const result = piesInOpenTokens({
        '1': 2,
        '2': 2,
        '3': 0,
      }, ['3'])
      expect(result).to.equal(2)
    })

  })

})