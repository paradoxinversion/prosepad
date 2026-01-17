import startAutoSave from './autoSave';

describe('startAutoSave', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global.console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    jest.useRealTimers();
    // @ts-ignore
    global.console.error.mockRestore && global.console.error.mockRestore();
  });

  it('saves when content changes on interval', async () => {
    let content = 'a';
    const getContent = () => content;
    const saveFn = jest.fn().mockResolvedValue(undefined);

    const handle = startAutoSave(getContent, saveFn, 1000);

    // no save yet
    expect(saveFn).not.toBeCalled();

    // advance without change -> no save
    jest.advanceTimersByTime(1000);
    await Promise.resolve();
    await Promise.resolve();
    expect(saveFn).not.toBeCalled();

    // change content and trigger interval
    content = 'b';
    jest.advanceTimersByTime(1000);
    await Promise.resolve();
    await Promise.resolve();
    expect(saveFn).toHaveBeenCalledWith('b');

    handle.stop();
  });

  it('immediateSave forces save if changed', async () => {
    let content = 'x';
    const getContent = () => content;
    const saveFn = jest.fn().mockResolvedValue(undefined);

    const handle = startAutoSave(getContent, saveFn, 1000);
    content = 'y';
    await handle.immediateSave();
    expect(saveFn).toHaveBeenCalledWith('y');
    handle.stop();
  });
});
