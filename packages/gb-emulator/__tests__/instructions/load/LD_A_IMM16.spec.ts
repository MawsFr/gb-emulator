import { beforeEach, describe, expect, it } from 'vitest'
import { Registers } from '@/registers.ts'
import { Memory } from '@/memory.ts'
import { Cpu } from '@/cpu.ts'
import { LD_A_IMM16 } from '@/instructions/ld/LD_A_IMM16.ts'

describe(LD_A_IMM16, () => {
    let registers: Registers
    let memory: Memory
    let cpu: Cpu

    beforeEach(() => {
        memory = new Memory()
        registers = new Registers(memory)
        cpu = new Cpu({
            registers,
            memory,
        })
    })

    it('should put register A value into the address pointed by the immediate 16 bits', () => {
        // Given
        memory.addresses[0x0] = 0x01
        memory.addresses[0x1] = 0x51
        memory.addresses[0x2] = 0x50
        memory.addresses[0x5051] = 0x12

        registers.PC.value = 0x0
        registers.A.value = 0x01

        // When
        new LD_A_IMM16(cpu).execute()

        // Then
        expect(registers.A.value).to.equal(0x12)
        expect(registers.PC.value).to.equal(0x3)
    })
})
