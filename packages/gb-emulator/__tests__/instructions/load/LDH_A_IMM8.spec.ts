import { beforeEach, describe, expect, it } from 'vitest'
import { Registers } from '@/registers.ts'
import { Memory } from '@/memory.ts'
import { Cpu } from '@/cpu.ts'
import { LDH_A_IMM8 } from '@/instructions/ld/LDH_A_IMM8.ts'

describe(LDH_A_IMM8, () => {
    let registers: Registers
    let memory: Memory
    let cpu: Cpu

    beforeEach(() => {
        memory = new Memory()
        registers = new Registers(memory)
        cpu = new Cpu({ registers, memory })
    })

    it('should write the value at address FF00 + immediate 8 bit value into register A', () => {
        registers.PC.value = 0x0
        registers.A.value = 0x12
        memory.addresses[0x1] = 0x03
        memory.addresses[0xFF03] = 0x50

        new LDH_A_IMM8(cpu).execute()

        expect(registers.A.value).to.equal(0x50)
        expect(registers.PC.value).to.equal(0x01)
    })
})
