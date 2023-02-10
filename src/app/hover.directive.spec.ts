import { HoverDirective } from './hover.directive';
import { Calculator } from './unitTestSample.service';

describe('HoverDirective', () => {
  it('should add 2 numbers', () => {
    const service = new Calculator();
    expect(service.add(2, 2)).toBe(4);
  });
  it('should sub 2 numbers', () => {
    const service = new Calculator();
    expect(service.substract(2, 2)).toBe(0);
  })
});
