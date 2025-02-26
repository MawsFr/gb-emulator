import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
    './packages/gb-emulator/vitest.config.ts',
    './packages/binary-operations/vitest.config.ts',
    './app/vitest.config.ts',
])
