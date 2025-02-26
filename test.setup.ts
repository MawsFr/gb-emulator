import { afterAll, beforeEach, vi } from 'vitest'
import { Memory, Registers } from './packages/gb-emulator/src'
import { Cpu } from './packages/gb-emulator/src/cpu'

export interface GbEmulatorTestContext {
    memory: Memory
    registers: Registers
    cpu: Cpu
}

beforeEach<GbEmulatorTestContext>((context) => {
    const memory = new Memory()
    const registers = new Registers(memory)
    const cpu = new Cpu({
        registers,
        memory,
    })

    context.memory = memory
    context.registers = registers
    context.cpu = cpu
})

beforeEach(() => {
    vi.restoreAllMocks()
    vi.clearAllTimers()
    vi.resetAllMocks()
    vi.clearAllMocks()
    vi.useFakeTimers()
})

afterAll(() => {
    vi.useRealTimers()
})
