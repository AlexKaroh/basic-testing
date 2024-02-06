import {
  resolveValue,
  throwError,
  throwCustomError,
  rejectCustomError,
  MyAwesomeError,
} from './index';

describe('resolveValue', () => {
  test('resolve provided value', async () => {
    expect(await resolveValue(666)).toBe(666);
  });
});

describe('throwError', () => {
  test('throw error when message provided', () => {
    expect(() => throwError('This is my new error!')).toThrow(
      'This is my new error!',
    );
  });

  test('throw error when message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
