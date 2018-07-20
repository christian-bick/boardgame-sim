import {expect} from 'chai'
import add from './example'

describe('Example', () => {
  it ('should add two positive numbers', () => {
    const sum = add(1, 2)
    expect(sum).to.equal(3)
  })

  it ('should add two negative numbers', () => {
    const sum = add(-2, -1)
    expect(sum).to.equal(-3)
  })

  it ('should add a positive and negative numbers', () => {
    const sum = add(-2, 1)
    expect(sum).to.equal(-1)
  })

  it ('should add 0', () => {
    const sum = add(0, 0)
    expect(sum).to.equal(0)
  })
})