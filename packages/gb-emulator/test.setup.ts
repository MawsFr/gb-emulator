import { beforeEach } from 'vitest'
import { Graphics, Memory, Registers } from '$/src'
import { Cpu } from '@/cpu.ts'

export interface GbEmulatorTestContext {
    graphics: Graphics
    memory: Memory
    registers: Registers
    cpu: Cpu
}

beforeEach<GbEmulatorTestContext>((context) => {
    const memory = new Memory()
    const graphics = new Graphics(memory)
    const registers = new Registers(memory)
    const cpu = new Cpu({
        registers,
        memory,
    })

    context.graphics = graphics
    context.memory = memory
    context.registers = registers
    context.cpu = cpu
})
