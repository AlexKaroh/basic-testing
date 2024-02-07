import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 666;
    expect(getBankAccount(initialBalance).getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(100).withdraw(101)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw TransferFailedError error when transferring more than balance', () => {
    const account_1 = getBankAccount(666);
    const account_2 = getBankAccount(0);
    expect(() => account_1.transfer(667, account_2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw TransferFailedError when transferring to the same account', () => {
    const account = getBankAccount(666);
    expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(616);
    account.deposit(50);
    expect(account.getBalance()).toBe(666);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(716);
    account.withdraw(50);
    expect(account.getBalance()).toBe(666);
  });

  test('should transfer money', () => {
    const account_1 = getBankAccount(1332);
    const account_2 = getBankAccount(0);
    account_1.transfer(666, account_2);
    expect(account_1.getBalance()).toBe(666);
    expect(account_2.getBalance()).toBe(666);
  });

  test('fetchBalance should return number in case if request did not fail', async () => {
    const balance = await getBankAccount(666).fetchBalance();
    balance !== null && expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(666);

    const spyOn = jest.spyOn(account, 'fetchBalance');
    spyOn.mockReturnValue(new Promise((resolve) => resolve(999)));
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(999);
    spyOn.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
