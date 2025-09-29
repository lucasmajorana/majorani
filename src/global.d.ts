declare global {
  interface Window {
    __MAJORANI_TESTS?: Array<{ name: string; pass: boolean }>;
  }
}
export {};
