// Mock Electron components for testing
import { vi } from 'vitest';

// Mock electron module
vi.mock('electron', () => ({
  ipcRenderer: {
    invoke: vi.fn(),
    send: vi.fn(),
    on: vi.fn(),
  },
  app: {
    whenReady: vi.fn(),
    quit: vi.fn(),
  },
  BrowserWindow: vi.fn(),
}));

// Mock sqlite packages if needed
global.console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn(),
};