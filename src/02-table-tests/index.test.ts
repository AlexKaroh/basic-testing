import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 10, b: 5, action: Action.Divide, expected: 2 },
  { a: 10, b: 5, action: Action.Multiply, expected: 50 },
  { a: 3, b: 5, action: Action.Exponentiate, expected: 243 },
  { a: '3', b: 2, action: Action.Add, expected: null },
  { a: 3, b: '2', action: Action.Add, expected: null },
  { a: 3, b: 2, action: 'Add', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'calculate correctly and handle invalid args',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
