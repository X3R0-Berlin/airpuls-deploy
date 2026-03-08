import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Mock @payload-config to prevent Payload initialization during tests
      '@payload-config': path.resolve(__dirname, './src/tests/__mocks__/payload-config.ts'),
    },
  },
  test: {
    include: ['src/tests/**/*.test.ts'],
    environment: 'node',
  },
})
