import { Cpu, Graphics, Memory, Registers } from '$/src'

// Issue: https://github.com/vitest-dev/vitest/issues/2892
declare module 'vitest' {
    export interface TestContext {
        registers: Registers
        memory: Memory
        cpu: Cpu
        graphics: Graphics
    }
}
