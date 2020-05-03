import validate from '../../src/config/validate'
import {publishSchema} from '../../src/config/schema'

describe('validate' , ()  => {
  it('should', () => {
    const isValid = validate({}, publishSchema);
    expect(isValid).toBeFalsy();
  })
})