import { Mixin } from '../src/MinaMixins'
import mixin from '../src/MinaMixins'

/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('Mixin is instantiable', () => {
    expect(new Mixin()).toBeInstanceOf(Mixin)
  })
  it('mixin is example', () => {
    expect(mixin).toBeInstanceOf(Mixin)
  })
})
