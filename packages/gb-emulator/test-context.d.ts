import { Memory, Registers } from './src'
import { Cpu } from './src/cpu'

// Issue: https://github.com/vitest-dev/vitest/issues/2892
declare module 'vitest' {
    export interface TestContext {
        registers: Registers
        memory: Memory
        cpu: Cpu
    }
}
