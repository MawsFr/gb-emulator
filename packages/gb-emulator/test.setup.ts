import { beforeEach } from 'vitest'
import { Memory, Registers } from './src'
import { Cpu } from '@/cpu.ts'

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
