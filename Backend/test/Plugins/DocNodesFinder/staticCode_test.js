import * as staticCode from '../../../src/plugins/docNodesFinder/staticCode'

describe('simple', () => {
  it('should be sane', () => {
    const sc = staticCode.getAllNodes()
    expect(sc.length).toBe(3)
  })
})
