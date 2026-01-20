jest.mock('electron', () => ({
    contextBridge: {
        exposeInMainWorld: jest.fn(),
    },
}));
