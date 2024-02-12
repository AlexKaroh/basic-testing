import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

jest.useFakeTimers();

describe('doStuffByTimeout', () => {
  test('should set timeout with provided cbFn and timeout', () => {
    const spy = jest.spyOn(global, 'setTimeout');
    const cbFn = jest.fn();

    doStuffByTimeout(cbFn, 1000);
    jest.advanceTimersByTime(1000);
    expect(spy).toHaveBeenCalledWith(cbFn, 1000);
  });

  test('should call cbFn only after timeout', () => {
    const cbFn = jest.fn();
    doStuffByTimeout(cbFn, 1000);

    expect(cbFn).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(cbFn).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  test('should set interval with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setInterval');
    const cbFn = jest.fn();

    doStuffByInterval(cbFn, 1000);

    expect(spy).toHaveBeenCalledWith(cbFn, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cbFn = jest.fn();
    doStuffByInterval(cbFn, 1000);

    jest.advanceTimersByTime(3000);

    expect(cbFn).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  beforeAll(() => {
    jest.spyOn(path, 'join').mockReturnValue('/mocked/path/to/file.txt');
  });

  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join');
    const filePath = '/home/file';

    await readFileAsynchronously(filePath);

    expect(spy).toHaveBeenCalledWith(__dirname, filePath);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously('nonexistent.txt');

    expect(result).toBeNull();
    expect(fs.existsSync).toHaveBeenCalled();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(path, 'join').mockImplementation(() => '/testDir/text.txt');
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    jest.spyOn(fsp, 'readFile').mockImplementation(async () => 'Hello World');
    const res = await readFileAsynchronously('/testDir/file');
    expect(res).toBe('Hello World');
  });
});
